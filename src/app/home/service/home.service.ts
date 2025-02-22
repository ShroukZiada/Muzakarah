import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from '../model/home';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private HttpClient: HttpClient, public _translate: TranslateService) { }

  getUser(): Observable<Home.user[]> {
    return this.HttpClient.get<Home.user[]>('http://localhost:3000/user');
  }
  getSubject(): Observable<Home.subject[]> {
    return this.HttpClient.get<Home.subject[]>('http://localhost:3000/subject');
  }
  // Use ngx-translate to get the translated data
  getTranslatedSubject(subject: any): any {
    return {
      ...subject,
      name: this._translate.instant('math.name'),
      description: this._translate.instant('math.description'),
      stage: this._translate.instant('math.stage'),

    };
  }
}
