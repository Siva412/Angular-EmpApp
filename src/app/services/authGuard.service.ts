import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonSerivce } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private commonService: CommonSerivce, private router: Router){}
    canActivate(){
        if(this.commonService.getLoggedInFlag()){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }
}