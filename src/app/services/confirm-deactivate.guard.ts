import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface confirmComponentDeactivate{
  canDeactivate: () => boolean | Observable<boolean>
}

@Injectable({
  providedIn: 'root'
})

export class ConfirmDeactivateGuard implements CanDeactivate<confirmComponentDeactivate> {
  canDeactivate(component: confirmComponentDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
