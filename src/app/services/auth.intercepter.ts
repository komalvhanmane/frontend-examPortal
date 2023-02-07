import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core'
import { LoginService } from "./login.service";
// const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private login:LoginService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;

        const token=this.login.getToken();
        if(token!=null){
            authReq=authReq.clone({setHeaders:{Authorization : `Bearer ${token}`},
        })
        }
        return next.handle(authReq);
        //add the jwt token (localStorage) request
        // throw new Error("Method not implemented.");
    }
    
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];