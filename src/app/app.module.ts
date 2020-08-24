import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DatabaseService } from './data-access/database.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { SidebarDirective } from './sidebar.directive';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { DiseaseSearchComponent } from './disease-search/disease-search.component';
import { ReadableComponent } from './readable/readable.component';
import { RepertoryComponent } from './repertory/repertory.component';
import { FilterPipe } from './app.pipe';
import { LoadingComponent } from './loading';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SearchbysymptomsComponent } from './searchbysymptoms/searchbysymptoms.component';
import { AlphabetPadComponent } from './alphabet-pad/alphabet-pad.component';


@NgModule({
  declarations: [FilterPipe,
    AppComponent, SidebarDirective, CaseDetailsComponent, DiseaseSearchComponent, ReadableComponent, RepertoryComponent,
     LoadingComponent, SearchbysymptomsComponent, AlphabetPadComponent 
  ],
  imports: [
    BrowserModule,    
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
