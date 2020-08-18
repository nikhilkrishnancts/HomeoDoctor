import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { e } from '@angular/core/src/render3';
import { DatabaseService } from './data-access/database.service';
import { Books } from './data-access/entities/book';
import { Clinexams } from "./data-access/entities/ce";
import { AppService } from './app.service';
import { Clinsymptoms } from './data-access/entities/cp';
import { Diseases } from './data-access/entities/diseases';
import { Chapter } from './data-access/entities/chapters';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navList : any;
  selectedTab = 'Case Details';
  registrationNumber: any;
  loadedFlag : boolean = true;
    currentTime: Date;

  constructor(private databaseService: DatabaseService, private appService: AppService) {
    this.databaseService.connection.then(async connection =>{
            connection.manager.find(Books).then(
                persons => {
                    this.appService.setBooks(persons);
                    // console.log('mkm'+ persons[0]);
                }

            )
            connection.manager.find(Clinexams).then(
                ceData => {
                    this.appService.setClineExams(ceData)
                    console.log('mk7m'+ ceData);
                    // this.loadedFlag = true;
                }
            )
            connection.manager.find(Clinsymptoms).then(
                cpData => {
                    this.appService.setClineSymptoms(cpData)
                    // console.log('mkm'+ cpData);
                    // this.loadedFlag = true;
                }
            )
            connection.manager.find(Diseases).then(
                disease => {
                    this.appService.setDiseaseList(disease)
                    // console.log('mkm'+ disease);
                    // this.loadedFlag = true;
                }
            )
            connection.manager.find(Chapter).then(
                chapter => {
                    this.appService.setChapter(chapter)
                    // console.log('mkm'+ chapter);
                    this.loadedFlag = false;
                }
            )
          
        }
            
    );
}

    ngOnInit() {
      this.navList = [ "Case Details", "Search", "Disease Readable", "Repet"]
      this.currentTime = new Date();
      
  this.registrationNumber = this.randomFixedInteger(4);
    }

    
  randomFixedInteger(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}
    navSelection(tab){
      this.selectedTab = tab;
      event.preventDefault();
    }
}
