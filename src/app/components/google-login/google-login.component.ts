import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    const googleClientId : string = environment.googleClientId;
    const redirectUri : string = environment.googleRedirectUri;
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&access_type=offline&scope=https://www.googleapis.com/auth/gmail.send`;
  }

}
