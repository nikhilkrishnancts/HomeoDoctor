import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import Keyboard from "simple-keyboard";
import { DatabaseService } from '../data-access/database.service';
import { Symptom } from '../data-access/entities/symptoms';
import { Sym2drugs } from '../data-access/entities/symptom2drug';
import { Drugs } from '../data-access/entities/drugs';
import { Equal } from 'typeorm';

@Component({
  selector: 'app-repertory',
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.scss'],
})
export class RepertoryComponent implements OnInit {
  bookList: any;
  value = "";
  keyboard: Keyboard;
  selectedBook: any;
  selectedChapter: any;
  chapterList: any;
  updatedChapter: any;
  symptomList: any;
  updatedSymptomList: any =[];
  drugLevelLists: any = [];
  toggle: boolean = false;
  childList: any = [];
  arrayToTree: (items: any) => any[];
  loadedFlag: boolean = true;
  symptom2drugs: any = [];
  drugsList: Drugs[];
  selectedSymptom: any;
  symptomListID: any = [];
  updatedSymptomList2: any = [];
  selectedItem: any;
  medicineList: any= [];
  showTableFlag: boolean = false;
  selectedChapterName: any;
  selectedBookName: any;
  drugupdatedList: any;
  symptomId: any;
  updateddrugList: any= [];
  newDrugsList: any = [];

  constructor(private databaseService: DatabaseService, private appService: AppService) {
    this.databaseService.connection.then(async connection => {
      
      connection.manager.find(Drugs).then(
        drugs => {
          this.appService.setDrugs(drugs);
          this.drugsList = drugs;
          this.loadedFlag = false;
        }
      )
    })
  }

  ngOnInit() {
    this.symptom2drugs = this.appService.getSymptom2drugs();
    this.bookList = this.appService.getBooks();
    this.updatedChapter = this.chapterList = this.appService.getChapter();
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onSelected(event) {
    this.selectedBookName = event.target.options[this.selectedBook].innerText;
    let selectedId = this.selectedBook;
    this.updatedChapter = this.chapterList.filter(function (number) {
      return (number.bookId === selectedId);
    });

  }
  onSelectedChapter(event) {
    this.selectedChapterName= event.target.options[this.selectedChapter].innerText;
    console.log(this.selectedChapter)
  }

  addtoList(){
    this.medicineList.push(this.selectedItem);
    this.drugLevelLists.push(this.getArray(this.symptomListID));
    this.newDrugsList.push(this.updateddrugList);
  }

  showTable(){
    //     this.drugupdatedList = this.drugsList.filter(function (number) {
    //   return (number.id == this.selectedItem.drugId );
    // });
this.showTableFlag = true;
  }
  onSelect(item) {
    // this.loadedFlag = true;
    this.selectedItem= item;
    let symptomid =this.symptomId=  item._id;
    
    let selectedId = this.selectedBook;
    let selectChapter = this.selectedChapter;
    this.symptomListID = this.symptom2drugs.filter(function (number) {
      return (number.bookId == selectedId && number.chapterId == selectChapter && number.symptomId == symptomid);
    }); 
      
      if (this.symptomListID.length){
        
        this.updateddrugList = this.drugsList.filter((elem) => this.symptomListID.
        find(({ drugId }) => elem.id === drugId));
        
        if(this.updateddrugList.length){
          this.loadedFlag = false;
        }
      }
      
      
    console.log(item);
  }

  searchSymptom() {
    let selectedId = this.selectedBook;
    let selectChapter = this.selectedChapter;
    this.childList = [];
    this.loadedFlag = true;

    
    this.databaseService.connection.then(async connection => {

    const qb = connection.createQueryBuilder().select("sym") 
.from(Symptom, "sym").where("sym.bookId = :bookId", { bookId: selectedId })
.andWhere("sym.chapterId = :chapterId", {chapterId: selectChapter}).getMany();

    qb.then( async response => {
      this.updatedSymptomList = response;
      if (this.updatedSymptomList.length)
      this.childList = this.getTree();
      this.loadedFlag = false;
    });
    
    });
    
    this.toggle = true;
  }

  getTree() {
    let arrayToTree = (items, symptomlist, druglist) => {

      /**
       * The nested tree.
       * @type {*[]}
       */
      const rootItems = [];

      /**
       * Stores all already processed items with their ids as
       * key so we can easily look them up
       * @type {{}}
       */
      const lookup = {};

      /* ==================================================================
       * Idea of this loop:
       * ==================================================================
       * Whenever an item has a parent, but the parent is not yet in the
       * lookup object, we store a preliminary parent in the lookup object
       * and fill it with the data of the parent later if an item has no
       * parentId, add it as a root element to rootItems
       */

      for (const item of items) {

        const itemId = item['id']
        const parent = item['parent']

        
        if (!lookup[itemId]) lookup[itemId] = { ['children']: [], ['drugs']: [] }

        /*
         * Fill in the details of our previously-created placeholder
         * in the lookup table.
         */
        lookup[itemId] = { ...item, ['children']: lookup[itemId]['children'], ['drugs']: [] }

        /*
         * Create a symbol for our item.
         */
        const TreeItem = lookup[itemId]

        /* ==================================================================
         * Determine where the item goes in the tree.
         * ================================================================== */

        /*
         * If the item has no parentId, it is the root node.
         */

        if (parent === null || parent === undefined || parent == 0) {

          rootItems.push(TreeItem)
        }

        /*
         * If the item has a parentId, add it to the tree.
         */

        else {

          /*
           * Check whether the parent already exists in the lookup table.
           * If not, add a placeholder. We'll add the details later.
           */

          if (!lookup[parent]) lookup[parent] = { ['children']: [] }

          /*
           * Add the current item to the parent
           */
          lookup[parent]['children'].push(TreeItem)
        }
      }

      return rootItems
    }
    return arrayToTree(this.updatedSymptomList, this.symptom2drugs, this.drugsList);

  }

  getArray(obj: any) {
    if (Array.isArray(obj)) {
      return obj;
    } else
      return [obj]
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
