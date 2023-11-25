import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { AuthappService } from '../../services/authapp.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth:AuthappService = new AuthappService();
  return auth.isLogged();
};

export const authGuard1: CanActivateChildFn = (route, state) => {
  const auth:AuthappService = new AuthappService();
  return auth.isLogged();
};
