import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CommonSerivce } from './common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private commonService: CommonSerivce){}
    intercept(request: HttpRequest<any>, next: HttpHandler){
        request = request.clone({
            setHeaders: {
                'authorization': this.commonService.getToken() || ''
            }
        });
        return next.handle(request);
    }
}