import { Component, OnInit } from '@angular/core';
import { AuthService } from '@nimb3s/services/auth-service';

@Component({
  selector: 'nbf-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.googleSignin();
  }
}
