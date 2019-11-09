import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'nb-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss']
})
export class SignInButtonComponent implements OnInit {

  @Output() userSignIn: EventEmitter;

  constructor() { }

  ngOnInit() {

  }

  signIn() {
    this.userSignIn.emit(null);
    console.log('user signed in');
  }

}
