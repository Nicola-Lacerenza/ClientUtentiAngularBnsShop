import { HttpInterceptorFn } from '@angular/common/http';
import { AuthappService } from './../services/authapp.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authappService:AuthappService=inject(AuthappService);
  if(authappService.isLogged()===true){
    const req1=req.clone({
      setHeaders:{
        "Authorization":"Bearer " + <string>localStorage.getItem("token")
      }
    });
    return next(req1);
  }
  return next(req);
};
