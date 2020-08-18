import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  books: any;
  clineExams: any;
  clineSymptoms: any;
  diseaseList: any;
  chapters: any;
  symptomList: any;
  drugs: any;
  symptom2drugs: any;

  constructor() { }

  getBooks(){
    return this.books;
  }
  setBooks(value){
    this.books = value;
  }
  getClineExams(){
    return this.clineExams;
  }
  setClineExams(value){
    this.clineExams = value;
  }

  getChapter(){
    return this.chapters;
  }
  setChapter(value){
    this.chapters = value;
  }

  getDrugs(){
    return this.drugs;
  }
  setDrugs(value){
    this.drugs = value;
  }

  getSymptom2drugs(){
    return this.symptom2drugs;
  }
  setSymptom2drugs(value){
    this.symptom2drugs = value;
  }

  getSymptomList(){
    return this.symptomList;
  }
  setSymptomList(value){
    this.symptomList = value;
  }

  getClineSymptoms(){
    return this.clineSymptoms;
  }
  setClineSymptoms(value){
    this.clineSymptoms = value;
  }
  getDiseaseList(){
    return this.diseaseList;
  }
  setDiseaseList(value){
    this.diseaseList = value;
  }
}
