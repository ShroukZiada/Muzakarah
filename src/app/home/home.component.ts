import { Component, OnInit } from '@angular/core';
import { Home } from './model/home';
import { HomeService } from './service/home.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
// declare var $this: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  study = [
    { id: 1, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 3, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 3, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 4, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 5, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 6, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 7, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 8, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 9, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
    { id: 10, unitStaus: "تم", lessons: "10 دروس", time: "20 ساعة", Achievement: "3", result: " 80 / 100", Rating: " جيد", Notes: "4", tests: "4" },
  ]
  userList: Home.user[] = [];
  subjectList: Home.subject[] = [];
  subjectsInTable: Home.subject[] = [];

  lang: string | any = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ar'

  languages = [
    { name: 'العربية - مصر', value: 'ar' },
    { name: 'UnitedStates', value: 'en' },
  ]

  constructor(private homeService: HomeService,
    public _translate: TranslateService, private fb: FormBuilder,) {
    _translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("user", event);

    })
  }
  ngOnInit(): void {
    this.getUser();
    this.getSubject()
    this.onChangeLang(this.lang)
    console.log(window.scroll);

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
      next: () => {
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
    console.log(this.subjectsInTable);
    this.subjectsInTable.push(subject);
    console.log(event.currentTarget);
    if ($(event.currentTarget).hasClass('btn-add')) {
      $(event.currentTarget).find('.icon').removeClass('fa-plus').addClass('fa-check');

      $(event.currentTarget).css('background-color', '#28a745');
    }
    alert("Subject added successfully");
  }

  onChangeLang(val: string) {
    this.lang = val
    this._translate.setDefaultLang(val);
    this._translate.use(val);
    localStorage.setItem('lang', this.lang)
  }


  public collapsedSubjects: Set<number> = new Set();

  toggleCollapse(subjectId: number) {
    if (this.collapsedSubjects.has(subjectId)) {
      this.collapsedSubjects.delete(subjectId);
    } else {
      this.collapsedSubjects.add(subjectId);
    }
  }
  isCollapsed(subjectId: number): boolean {
    return this.collapsedSubjects.has(subjectId);
  }


}


