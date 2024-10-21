import { inject } from '@angular/core';
import { AuthappService } from './authapp.service';
import { CanActivateFn, Route, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {

  const auth: AuthappService = inject(AuthappService);
  const router : Router = inject(Router);
  if(!auth.isLogged()){
      return false;
  }
  return auth.checkRuolo().pipe(
    map(role => {
      console.log('Ruolo ricevuto:', role);  // Log del ruolo ricevuto
      return true;
    }),
    catchError((error) => {
      console.error('Errore durante la verifica del ruolo', error);
      router.navigate(['/welcome']);
      return of(false);
    })
  );
};

