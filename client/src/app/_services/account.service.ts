import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    baseUrl = 'https://localhost:5001/api/'
    constructor(private http: HttpClient) {}
    private currentUserSource = new ReplaySubject<User>(1);
    currentUser$ = this.currentUserSource.asObservable();

    login(model: any)
    {
      return this.http.post(this.baseUrl + 'accounts/login', model).pipe(
        map((response: User) =>{
          const user = response;
          if(user){
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);
          }

        } )
      )
    }

    register(model:any)
    {

      return this.http.post(this.baseUrl + 'accounts/register', model).pipe(
        map((user: User) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })

      )
    }

    setCurrentUser(user: User){
      this.currentUserSource.next(user);
    }
    logout(){
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
    }
    
 
  }