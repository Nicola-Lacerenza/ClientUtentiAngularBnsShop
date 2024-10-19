import { inject } from '@angular/core';
import { AuthappService } from './authapp.service';
import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {

  return true;
  //const auth: AuthappService = inject(AuthappService);
  //if(!auth.isLogged()){
  //    return false;
  //}
  //const result = await auth.checkRuolo().toPromise();
};

