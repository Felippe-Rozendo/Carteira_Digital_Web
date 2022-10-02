import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { userLogin } from 'src/app/model/userLogin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  private baseUrl = environment.url + '/Auth/'
  public user: Observable<userLogin>;
  jwtHelper = new JwtHelperService();

  async loginAsync(model: userLogin): Promise<userLogin> {    
    try{
      var token = await this.http.post<any>(`${this.baseUrl}Login`, model).toPromise()
      localStorage.setItem('token', token.token);
      let name = this.jwtHelper.decodeToken(token.token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      console.log(name)
      return name
    }catch{
      console.log('User Not Found')
    }
    }

  register(model: any) {
    return this.http.post(`${this.baseUrl}/Register`, model);
  }

  loggedIn(sair: boolean) {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || sair) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login')
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

}
