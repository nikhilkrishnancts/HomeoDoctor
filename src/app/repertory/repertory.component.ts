import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import Keyboard from "simple-keyboard";
// import { FilterPipe } from '../app.pipe';
import { DatabaseService } from '../data-access/database.service';
import { Symptom } from '../data-access/entities/symptoms';
import { Sym2drugs } from '../data-access/entities/symptom2drug';
import { Drugs } from '../data-access/entities/drugs';

@Component({
  selector: 'app-repertory',
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.scss'],
  // providers: [FilterPipe]
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
      // connection.manager.find(Symptom).then(
      //   symptom => {
      //     this.appService.setSymptomList(symptom)

      //     this.updatedSymptomList = this.symptomList = this.appService.getSymptomList();
      //     // console.log('mkm'+ chapter);

      //   }
      // )

      connection.manager.find(Drugs).then(
        drugs => {
          this.appService.setDrugs(drugs);
          this.drugsList = drugs;
          // console.log('mkm' + drugs);
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
    // console.log(this.selectedBook);
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
 
    
    // this.databaseService.connection.then(async connection => {
    // const qb = connection.createQueryBuilder().select("sym") 
    // .from(Sym2drugs, "sym").where("sym.bookId = :bookId", { bookId: selectedId })
    // .andWhere("sym.chapterId = :chapterId", {chapterId: selectChapter}).andWhere("sym.symptomId = :symptomId", {symptomId: symptomid}).getMany();
    
    //     qb.then( async response => {
    //       console.log("in check:" +response)
    //       this.symptomListID = response;
    //       if (this.symptomListID.length)
    //      //  this.childList = this.getTree();
    //       this.loadedFlag = false;
    //     });
    //   });  
      
      if (this.symptomListID.length){
        // this.loadedFlag = false;
        // let drugone ;
        // let druglst = this.drugsList;
        // let updateddruglist = this.updateddrugList;
        // this.updateddrugList = updateddruglist;
        this.updateddrugList = this.drugsList.filter((elem) => this.symptomListID.find(({ drugId }) => elem.id === drugId));
        // this.symptomListID.filter(function (number) {
        //  drugone = druglst.filter(function(drug){
        //      (drug.id == number.drugId);
        //  }
        //   )
        //   if(drugone.length)
        //   updateddruglist.push(drugone);
          
        // });
        if(this.updateddrugList.length){
         //  this.updateddrugList = updateddruglist;
          this.loadedFlag = false;
        }
      }
      
      
    console.log(item);
  }

  searchSymptom() {
    //  this.symptomList = this.appService.getSymptomList();
    let selectedId = this.selectedBook;
    let selectChapter = this.selectedChapter;
    this.childList = [];
    console.log("in 23")
    // this.updatedSymptomList = this.symptomList.filter(function (number) {
    //   return (number.bookId === selectedId && number.chapterId === selectChapter);
    // });
    
    this.loadedFlag = true;

    
    this.databaseService.connection.then(async connection => {
    //   const symptomLst = new Symptom();
    /*const user = connection.createQueryBuilder() 
    .select("sym") 
    .from(Symptom, "sym") 
    .where("sym.id = :id", { id: 1 }) .getOne();
    qb.andWhere("account.password = :password", {password: password});*/

    const qb = connection.createQueryBuilder().select("sym") 
.from(Symptom, "sym").where("sym.bookId = :bookId", { bookId: selectedId })
.andWhere("sym.chapterId = :chapterId", {chapterId: selectChapter}).getMany();

    qb.then( async response => {
      console.log("in check:" +response)
      this.updatedSymptomList = response;
      if (this.updatedSymptomList.length)
      this.childList = this.getTree();
      this.loadedFlag = false;
    });
    
    // const sym2drugs = new Sym2drugs();
    // sym2drugs.bookId = selectedId;
    // sym2drugs.chapterId = selectChapter;
    // await connection.manager.save(sym2drugs);
    let symptomRepository = connection.getRepository(Symptom);
    let photoRepository = connection.getRepository(Sym2drugs);
    //let photos = await photoRepository.find({ bookId: selectedId, chapterId: selectChapter });
    // let symptom2drug = await photoRepository.find({ bookId: selectedId, chapterId: selectChapter })
    //symptomRepository.find({ bookId:  Equal(selectedId), chapterId: Equal(selectChapter) })
    //.then(async response1 => {
      //this.updatedSymptomList = response1;
      //this.loadedFlag = false;
    // });
    // photoRepository.find({ bookId: selectedId, chapterId: selectChapter })
    // .then(async response => {
    //       // const symptom2drug = await Sym2drugs.find();
    //       this.updatedSymptomList2 = this.symptom2drugs = response;
    //       this.loadedFlag = false;
    //         }
    //       )
    });
    
    

    console.log("in 4" + this.childList)
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

        /*
         * Check whether item already exists in the lookup table. If not,
         * add a placeholder. We'll add the details later.
         */
        // let symptomListID = symptomlist.filter(function(number) {
        //   return (number.bookId === item['bookId'] && number.chapterId === item['chapterId'] && number.symptomId == item['symptomId']);
        // });
        // let drugsSymp = [];
        // let drugLists = [];
        // drugLists = symptomListID.filter(function(number) {
        //   drugsSymp = druglist.filter(function(drug) {
        //     return (drug.id === number.drugId);
        //   })
        //   number['drugs'].push(drugsSymp);
        //   // return (number.drugId === item['bookId'] && number.chapterId === item['chapterId'] && number.symptomId == item['symptomId']);
        // });

        // let drugs = druglist.filter(function(number) {
        //   return (number.id === item['bookId'] && number.chapterId === item['chapterId'] && number.symptomId == item['symptomId']);
        // });
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
