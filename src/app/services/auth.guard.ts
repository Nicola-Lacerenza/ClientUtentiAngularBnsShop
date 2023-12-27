import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { AuthappService } from './authapp.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth:AuthappService = inject(AuthappService);
  return auth.isLogged();
};

export const authGuard1: CanActivateChildFn = (route, state) => {
  const auth:AuthappService = inject(AuthappService);
  return auth.isLogged();
};
