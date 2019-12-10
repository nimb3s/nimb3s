import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'spas-territory-form',
  templateUrl: './territory-form.component.html',
  styleUrls: ['./territory-form.component.css']
})
export class TerritoryFormComponent implements OnInit {
  territoryForm: FormGroup;


  constructor() { }

  ngOnInit() {
    this.territoryForm = new FormGroup({
      'territoryNumber': new FormControl(null),
      'streetName': new FormControl(null),
      'houseNumber': new FormControl(null),
      'city': new FormControl(null),
      'state': new FormControl(null),
      'zipCode': new FormControl(null),
      'outcome': new FormControl(null),
      'date': new FormControl(null),
      'language': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.territoryForm)
  }

}
