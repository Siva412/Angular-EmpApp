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
    token: string = '';
    constructor(private http: HttpClient){}
    getLoggedInSub(){
        return this.loggedInSubject.asObservable();
    }
    getLoggedInFlag(){
        return this.isLoggedIn;
    }
    getToken(){
        return this.token;
    }
    loggedIn(token){
        this.isLoggedIn = true;
        this.token = token;
        localStorage.setItem('isLogin', 'y');
        localStorage.setItem('token', token);
        this.loggedInSubject.next(this.isLoggedIn);
    }

    loggedOut(){
        this.isLoggedIn = false;
        this.token = '';
        localStorage.removeItem('isLogin');
        localStorage.removeItem('token');
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