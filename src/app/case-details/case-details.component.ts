import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {
  currentTime: Date;
  @Input() registrationNumber: any
  cliexams: any;
  selectedItem: any;
  toggle: boolean = false;
  clinSymptoms: any;
  disease2Symptoms: any;
  disease2ClineExams: any;
  diseases: any;
  updatedItems: any;
  ceItemList: any;

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.cliexams = this.appService.getClineExams();
    this.clinSymptoms = this.appService.getClineSymptoms();
    this.disease2ClineExams = this.appService.getDisease2ClinExams();
    this.disease2Symptoms = this.appService.getDiseaseSymptoms();
    this.diseases = this.appService.getDiseaseList();
  
    
  }

  onSelect(item, flag){
    let diseaseList = this.diseases;
if(flag == 'ce'){
  this.updatedItems= this.disease2ClineExams.filter((elem) => elem.ceid === item.id);
  let list1 = this.updatedItems;
  this.ceItemList = diseaseList.filter((elem) => list1.
  find((elem1) => elem.id === elem1.did));
}else{
  this.updatedItems= this.disease2Symptoms.filter((elem) => elem.syid === item.id);
  let list1 = this.updatedItems;
  this.ceItemList = diseaseList.filter((elem) => list1.
  find((elem1) => elem.id === elem1.did));
}
    this.selectedItem = item.name;
  }

  onCPSelect(value){
    // if(value== 'ce')
    this.selectedItem = '';
    this.toggle = !this.toggle;
  }


}
