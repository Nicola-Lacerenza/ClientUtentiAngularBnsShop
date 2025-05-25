import { Component, OnInit } from '@angular/core';
import { GoogleService } from './../../services/google.service';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { ServerResponse } from '../../models/ServerResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ricevi-codice-google',
  templateUrl: './ricevi-codice-google.component.html',
  styleUrl: './ricevi-codice-google.component.css'
})
export class RiceviCodiceGoogleComponent implements OnInit{
  constructor(private googleService : GoogleService,
              private route : ActivatedRoute
  ) { } 

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params : Params) => {
        const code : string = params['code'];
        if(code){
          this.googleService.creaGoogleToken(code).subscribe({
            next: (response: ServerResponse) => {
              console.log(response);
            },
            error: (error: HttpErrorResponse) => {
              console.error(error);
            }
          });
        }
      }
    });
  } 

}
