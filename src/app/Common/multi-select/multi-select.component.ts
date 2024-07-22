import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  @Input() list:any[];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();


  checkedList : any[];
  currentSelected : {};
  showDropDown: boolean;

  constructor() {
    this.checkedList = [];
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getSelectedValue(status:Boolean,value:String,id:number){
    if(status){
      this.checkedList.push(id);
    }else{
      var index = this.checkedList.indexOf(id);
      this.checkedList.splice(index,1);
    }

    this.currentSelected = {checked : status,libelle:value,id:id};

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();
  }

  shareCheckedlist(){
    this.shareCheckedList.emit(this.checkedList);
    //console.log("checkedList",this.checkedList);
  }

  shareIndividualStatus(){
    this.shareIndividualCheckedList.emit(this.currentSelected);
    //console.log("currentSelected",this.currentSelected);
  }

}
