import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
debugger;
  const localDate = localStorage.getItem("angular18Login");
  if (localDate != null) {
    return true;
  }
  else {
    router.navigateByUrl("login");
    alert('You Should Login First');
    return false;
  }

};
