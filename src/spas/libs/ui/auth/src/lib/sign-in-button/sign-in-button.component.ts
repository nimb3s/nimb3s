import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nbui-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss']
})
export class SignInButtonComponent implements OnInit {

  @Output() userSignIn = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  signIn() {
    this.userSignIn.emit(null);
    console.log('user signed in');
  }

}
