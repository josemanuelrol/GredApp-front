import { routes } from './../../application/tasks/tasks.routes';
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = async () => {

  const authService = inject(AuthService);
  const router = inject(Router)

  if (authService.validateToken()){
    return true;
  }else{
    router.navigate(['/auth'])
    return false;
  }
};
