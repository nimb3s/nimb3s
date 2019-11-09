import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nbf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signIn() {
    console.log('in feature component');
  }
}
