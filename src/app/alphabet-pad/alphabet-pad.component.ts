import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet-pad',
  templateUrl: './alphabet-pad.component.html',
  styleUrls: ['./alphabet-pad.component.scss']
})
export class AlphabetPadComponent implements OnInit {

  alphabetArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  //searchText = '';
  str='';
  
  @Output() valueChange = new EventEmitter();
  @Input() searchText ; 
  constructor() { }

  ngOnInit() {
  }

  onInput(event){
    this.valueChange.emit(event.target.value)

  }
  handleAlphabetClick(alphabet: string){
    this.searchText = this.searchText + alphabet;
    this.valueChange.emit(this.searchText)
  }

  handleSearch(searchText: string){
    console.log(searchText);
  }

  handleClear(){
    this.searchText = '';
    this.valueChange.emit(this.searchText)
  }
  
  handleSpaceClick(){
    this.searchText = this.searchText + ' ';
  }
  handleDeleteClick(){
    const characterCount = this.searchText.length - 1;
    this.searchText= this.searchText.substr(0, characterCount);
  }

}
