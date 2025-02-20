import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from '../model/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private HttpClient: HttpClient) { }

  getUser(): Observable<Home.user[]> {
    return this.HttpClient.get<Home.user[]>('http://localhost:3000/user');
  }
  getSubject(): Observable<Home.subject[]> {
    return this.HttpClient.get<Home.subject[]>('http://localhost:3000/subject');
  }
}
