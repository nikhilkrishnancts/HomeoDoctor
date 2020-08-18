import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-readable',
  templateUrl: './readable.component.html',
  styleUrls: ['./readable.component.scss']
})
export class ReadableComponent implements OnInit {
  diseaseList: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.diseaseList = this.appService.getDiseaseList();
  }

}
