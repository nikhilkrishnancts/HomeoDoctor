import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-readable',
  templateUrl: './readable.component.html',
  styleUrls: ['./readable.component.scss']
})
export class ReadableComponent implements OnInit {
  diseaseList: any;
  pdfSrc: any;

  constructor(private appService: AppService, private sanitizer:DomSanitizer, private http: HttpClient) { }

  ngOnInit() {
    this.diseaseList = this.appService.getDiseaseList();
    this.pdfSrc = "../../assets/Abdominalaorticaneurysm.pdf";
  }

  getIframe(){
    console.log('iframe');
    return this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/Abdominalaorticaneurysm.pdf');
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((result: any) => {
                return result;
            })
        );
}
