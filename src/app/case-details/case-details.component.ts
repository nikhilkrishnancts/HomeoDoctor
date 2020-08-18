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

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.cliexams = this.appService.getClineExams();
    this.clinSymptoms = this.appService.getClineSymptoms();
  
    
  }

  onSelect(item){
    this.selectedItem = item.name;
  }

  onCPSelect(value){
    // if(value== 'ce')
    this.selectedItem = '';
    this.toggle = !this.toggle;
  }


}
