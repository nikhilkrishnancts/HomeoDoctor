import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatabaseService } from '../data-access/database.service';
import { Symptom } from '../data-access/entities/symptoms';
import { Drugs } from '../data-access/entities/drugs';

@Component({
  selector: 'app-searchbysymptoms',
  templateUrl: './searchbysymptoms.component.html',
  styleUrls: ['./searchbysymptoms.component.scss']
})
export class SearchbysymptomsComponent implements OnInit {

  bookList: any;
  selectedBook: any;
  selectedChapter: any;
  chapterList: any;
  updatedChapter: any;
  childList: any = [];
  loadedFlag: boolean = true;
  selectedChapterName: any;
  selectedBookName: any;
  arrayToTree: (items: any) => any[];
  drugsList: Drugs[];
  symptom2drugs: any = [];
  toggle: boolean = false;

  constructor(private databaseService: DatabaseService, private appService: AppService) { 
    this.databaseService.connection.then(async connection => {

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

  searchSymptom() {

    this.childList = [];
    let selectedId = this.selectedBook;
    let selectChapter = this.selectedChapter;
    
    this.loadedFlag = true;

    this.databaseService.connection.then(async connection => {

    const qb = connection.createQueryBuilder().select("sym") 
.from(Symptom, "sym").where("sym.bookId = :bookId", { bookId: selectedId })
.andWhere("sym.chapterId = :chapterId", {chapterId: selectChapter}).getMany();

    qb.then( async response => {
      console.log("in check:" +response)
      this.childList = response;
      this.childList = this.getTree();
      this.loadedFlag = false;
    });
    
    });
    
    

    console.log("in 4" + this.childList);
    this.toggle = true;
  }

  getTree() {
    let arrayToTree = (items, symptomlist, druglist) => {

      const rootItems = [];

      const lookup = {};

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
    return arrayToTree(this.childList, this.symptom2drugs, this.drugsList);

  }

  getArray(obj: any) {
    if (Array.isArray(obj)) {
      return obj;
    } else
      return [obj]
  }

  

  

}
