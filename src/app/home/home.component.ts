import { Component, OnInit } from '@angular/core';
import { Home } from './model/home';
import { HomeService } from './service/home.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
// declare var $this: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userList: Home.user[] = [];
  subjectList: Home.subject[] = [];
  subjectsInTable: Home.subject[] = [];
  lang: string | any = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ar'
  languages = [
    { name: 'العربية - مصر', value: 'ar' },
    { name: 'UnitedStates', value: 'en' }
  ]
  constructor(private homeService: HomeService,
    public _translate: TranslateService) {
    _translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("myevebt", event);

    })
  }
  ngOnInit(): void {
    this.getUser();
    this.getSubject()
    // this.addSubject()
    this.onChangeLang(this.lang)



  }


  getUser() {
    this.homeService.getUser().subscribe({
      next: (data) => {
        this.userList = data;
        console.log(this.userList);
      }
    })
  }


  getSubject() {
    this.homeService.getSubject().subscribe({
      next: (data) => {
        this.homeService.getSubject().subscribe((data) => {
          this.subjectList = data.map((subject) =>
            this.homeService.getTranslatedSubject(subject)
          );
          console.log(this.subjectList);
        });
      },
    })
  }

  addSubject(subject: Home.subject, event: any) {
    // console.log(subject.id);
    const subjectExists = this.subjectsInTable.some(existingSubject => existingSubject.name === subject.name);
    if (!subjectExists) {
      this.subjectsInTable.push(subject);
      // console.log(this.subjectsInTable);
      console.log(event.currentTarget);
      if ($(event.currentTarget).hasClass('btn-add')) {
        $(event.currentTarget).find('.icon').removeClass('fa-plus').addClass('fa-check');

        $(event.currentTarget).css('background-color', '#28a745');
      }

      alert("Subject added successfully");

    }
    else {
      alert("Subject already exists");
    }
  }


  onChangeLang(val: string) {
    this.lang = val
    this._translate.setDefaultLang(val);
    this._translate.use(val);
    localStorage.setItem('lang', this.lang)
  }
  // Helper function to check if a string is in English
  isEnglish(text: string) {
    // A simple regex to check if the text contains only English letters and spaces
    return /^[A-Za-z\s]*$/.test(text);
  }







}
