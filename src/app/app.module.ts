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



@NgModule({
  declarations: [
    AppComponent, SidebarDirective, CaseDetailsComponent, DiseaseSearchComponent, ReadableComponent, RepertoryComponent, LoadingComponent
  ],
  imports: [
    BrowserModule,    
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatabaseService, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
