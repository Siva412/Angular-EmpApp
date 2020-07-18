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
    getLoggedInFlag(){
        return this.isLoggedIn;
    }
    loggedIn(){
        this.isLoggedIn = true;
        localStorage.setItem('isLogin', 'y');
        this.loggedInSubject.next(this.isLoggedIn);
    }

    loggedOut(){
        this.isLoggedIn = false;
        localStorage.removeItem('isLogin');
        this.loggedInSubject.next(this.isLoggedIn);
    }

    loginApi(loginData){
        return this.http.post(ApiUrl+'/user/login', loginData);
    }

    signUpApi(signupData){
        return this.http.post(ApiUrl+'/user/signup', signupData);
    }
    commonHttp(method, url, reqObj?){
        if(method === 'GET'){
            return this.http.request(method,ApiUrl+url)
        }
        else if(method === 'POST'){
            return this.http.request(method, ApiUrl+url, {body: reqObj});
        }
    }
}