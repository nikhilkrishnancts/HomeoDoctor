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
public openPdf() {
  let url = "assets/Abdominalaorticaneurysm.pdf"; // E.g. http://localhost:3000/api/GetMyPdf
  // url can be local url or remote http request to an api/pdf file. 
  // E.g: let url = "assets/pdf-sample.pdf";
  // E.g: https://github.com/intbot/ng2-pdfjs-viewer/tree/master/sampledoc/pdf-sample.pdf
  // E.g: http://localhost:3000/api/GetMyPdf
  // Please note, for remote urls to work, CORS should be enabled at the server. Read: https://enable-cors.org/server.html

  this.downloadFile(url).subscribe(
  (res) => {
      this.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
      // this.pdfViewerOnDemand.refresh(); // Ask pdf viewer to load/reresh pdf
    }
  );
}
}
