import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const ApiUrl = "http://localhost:3000/api"
@Injectable({
    providedIn: 'root'
})
export class CommonSerivce{
    isLoggedIn: boolean = false;
    loggedInSubject = new Subject<boolean>();
    constructor(private http: HttpClient){}
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

    loginApi(loginData){
        return this.http.post(ApiUrl+'/user/login', loginData);
    }

    signUpApi(signupData){
        return this.http.post(ApiUrl+'/user/signup', signupData);
    }
}