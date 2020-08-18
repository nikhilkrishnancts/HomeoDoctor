import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import Keyboard from "simple-keyboard";
import { FilterPipe } from '../app.pipe';
import { DatabaseService } from '../data-access/database.service';
import { Symptom } from '../data-access/entities/symptoms';
import { Sym2drugs } from '../data-access/entities/symptom2drug';
import { Drugs } from '../data-access/entities/drugs';

@Component({
  selector: 'app-repertory',
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.scss'],
  providers: [FilterPipe]
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
  updatedSymptomList: any;
  toggle: boolean = false;
  childList: any = [];
  arrayToTree: (items: any) => any[];
  loadedFlag: boolean = true;
  symptom2drugs: any = [];
  drugsList: Drugs[];
  selectedSymptom: any;
  symptomListID: any = [];
  updatedSymptomList2: any = [];

  constructor(private databaseService: DatabaseService, private appService: AppService) {
    this.databaseService.connection.then(async connection => {
      connection.manager.find(Symptom).then(
        symptom => {
          this.appService.setSymptomList(symptom)

          this.updatedSymptomList = this.symptomList = this.appService.getSymptomList();
          // console.log('mkm'+ chapter);

        }
      )
      connection.manager.find(Sym2drugs).then(
        symptom2drug => {
          this.appService.setSymptom2drugs(symptom2drug)
          this.symptom2drugs = symptom2drug;
          // console.log('mkm'+ chapter);
          // this.loadedFlag = true;
          this.loadedFlag = false;
        }
      )
      connection.manager.find(Drugs).then(
        drugs => {
          this.appService.setDrugs(drugs);
          this.drugsList = drugs;
          console.log('mkm' + drugs);
          // this.loadedFlag = false;
        }
      )
    })
  }

  ngOnInit() {
    this.bookList = this.appService.getBooks();
    this.updatedChapter = this.chapterList = this.appService.getChapter();
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onSelected() {
    // console.log(this.selectedBook);
    let selectedId = this.selectedBook;
    this.updatedChapter = this.chapterList.filter(function (number) {
      return (number.bookId === selectedId);
    });

  }
  onSelectedChapter() {
    console.log(this.selectedChapter)
  }
  onSelect(item) {
    let symptomid = item._id;
    let selectedId = this.selectedBook;
    let selectChapter = this.selectedChapter;
    this.symptomListID = this.symptom2drugs.filter(function (number) {
      return (number.bookId === selectedId && number.chapterId === selectChapter && number.symptomId == symptomid);
    });

    console.log(item);
  }

  searchSymptom() {
    //  this.symptomList = this.appService.getSymptomList();
    let selectedId = this.selectedBook;
    let selectChapter = this.selectedChapter;
    this.childList = [];
    console.log("in 23")
    this.updatedSymptomList = this.symptomList.filter(function (number) {
      return (number.bookId === selectedId && number.chapterId === selectChapter);
    });
    this.updatedSymptomList2 = this.symptom2drugs.filter(function (number) {
      return (number.bookId === selectedId && number.chapterId === selectChapter);
    });
    console.log("in 2")
    // this.updatedSymptomList.filter(function(item){
    //   if(item.parent > 0 ){
    //     childSelected.push(item)
    //   }
    // })
    // this.childList.push(childSelected);
    // this.childList = this.treeify(this.updatedSymptomList, 'id', 'parent', '');
    if (this.updatedSymptomList.length)
      this.childList = this.getTree();

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
  // treeify(list, idAttr, parentAttr, childrenAttr) {
  //   if (!idAttr) idAttr = 'id';
  //   if (!parentAttr) parentAttr = 'parent';
  //   if (!childrenAttr) childrenAttr = 'children';
  //   var treeList = [];
  //   var lookup = {};
  //   console.log("8");
  //   list.forEach(function (obj) {
  //     lookup[obj[idAttr]] = obj;
  //     obj[childrenAttr] = [];
  //   });
  //   console.log("176");
  //   // let listUpdated = [];
  //   // listUpdated = list;
  //   //let child = [];
  //   for (let i = 0; i <= list.length; i++) {
  //     // console.log(i);
  //     if (list[i] && list[i].id) {
  //       let id = list[i].id;
  //       for (let j = 0; j <= list.length; j++) {
  //         if (list[j] && list[j].parent && list[j].parent == id) {
  //           lookup[i].children.push(list[j]);
  //         }
  //       }
  //     }


  //   }
  //   // list.forEach(function(obj) {
  //   //  // console.log("kolp"+ obj);

  //   //     if (lookup[obj[parentAttr]+ 1] != null) {
  //   //       child = listUpdated.filter(function(number) {
  //   //         return (number.id === obj[parentAttr]+1);
  //   //       });
  //   //       lookup[obj[parentAttr]+ 1].children.push(child);
  //   //       // console.log("kol" + lookup[obj[parentAttr]][childrenAttr]);
  //   //         // lookup[obj[parentAttr]].childrenAttr.push(obj);
  //   //     } else {
  //   //         treeList.push(obj);
  //   //     }
  //   // });
  //   console.log("mikk" + lookup);
  //   treeList = this.getArray(lookup);
  //   console.log(treeList);
  //   return treeList;
  // };

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
