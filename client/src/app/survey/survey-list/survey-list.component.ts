import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  surveys: Survey[];
  username: string;
  numOfDays: number[] = new Array();
  isMySurvey = false;
  title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private surveyService: SurveyService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.surveys = new Array<Survey>();
    this.title = this.activatedRoute.snapshot.data.title;

    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
    });

    if (this.username != null) {
      this.isMySurvey = true;
      this.displayMySurveyList(this.username);
    } else {
      this.isMySurvey = false;
      this.displaySurveyList();
    }
  }
  displaySurveyList(): void {
    this.surveyService.getList().subscribe(data => {
      if (data.success) {
        this.surveys = data.surveyList;


        for (let index = 0; index < this.surveys.length; index++) {
          const today = new Date();
          const secondDate = new Date(this.surveys[index].surveyTill);
          const timeDiff = Math.abs(today.getTime() - secondDate.getTime());
          this.numOfDays[index] = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }


      } else {
        this.flashMessage.show('User must be logged-in', { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
  }

  displayMySurveyList(username: string): void {
    this.surveyService.getMySurvey(username).subscribe(data => {
      if (data.success) {
        this.surveys = data.surveyList;

        for (let index = 0; index < this.surveys.length; index++) {
          const today = new Date();
          const secondDate = new Date(this.surveys[index].surveyTill);
          const timeDiff = Math.abs(today.getTime() - secondDate.getTime());
          this.numOfDays[index] = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }

      } else {
        this.flashMessage.show('User must be logged-in', { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
  }

  private onDeleteClick(): void {
    if (!confirm('Are You Sure?')) {
      this.router.navigate(['/survey/list']);
    }
  }



}
