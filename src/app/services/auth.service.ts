import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {
    protected authApi = 'http://localhost:80/api/auth';
    private headers = { 'Content-Type': 'Application/json' };
    authenticated = false;
    isAuth = new Subject<any>();

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    createUser(credentials: { email: string, password: string }) {
        return this.httpClient.post<any>(`${this.authApi}/signup`, credentials, { headers: this.headers })
        .subscribe(
            (response) => { 
                this.setAuth(response);
            },
            (error) => { 
                console.log(error); 
            });
    }

    authenticate(credentials: { email: string, password: string }) {
        
        this.httpClient.post<any>(`${ this.authApi }/login`, credentials, { headers: this.headers })
        .subscribe(
            (response) => {  
                this.setAuth(response);
            },
            (error) => { 
                return { message: 'Login or Password invalid !?' }; 
            });
    }

    logout() {
        this.httpClient
        this.authenticated = false;
        this.isAuth.next(this.authenticated);
        localStorage.removeItem('user-token');
        localStorage.removeItem('_id');
        localStorage.clear();
        this.router.navigate(['/']);
    }

    setAuth(response: any) {
        this.authenticated = true;
        this.isAuth.next(this.authenticated);
        const token = JSON.parse(JSON.stringify(response));
        const userToken = token.token;
        const userId = token.userId; 
        localStorage.setItem('user-token', userToken);
        localStorage.setItem('_id', userId);
        const currentUrl = localStorage.getItem('current-url');
        this.router.navigate([`/${currentUrl ? currentUrl : 'shop'}`]);
    }
}