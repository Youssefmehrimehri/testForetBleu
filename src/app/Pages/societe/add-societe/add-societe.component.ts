import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.css']
})
export class AddSocieteComponent implements OnInit {

  constructor( private router :Router) { }

  ngOnInit(): void {
  }

}
