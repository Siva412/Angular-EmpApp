import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonSerivce{
    isLoggedIn: boolean = false;
    loggedInSubject = new Subject<boolean>();

    getLoggedInSub(){
        return this.loggedInSubject.asObservable();
    }

    loggedIn(){
        this.isLoggedIn = true;
        this.loggedInSubject.next(this.isLoggedIn);
    }

    loggedOut(){
        this.isLoggedIn = false;
        this.loggedInSubject.next(this.isLoggedIn);
    }
}