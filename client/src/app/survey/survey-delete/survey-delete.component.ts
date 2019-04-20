import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from './../../services/survey.service';
import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-survey-delete',
  templateUrl: './survey-delete.component.html',
  styleUrls: ['./survey-delete.component.css']
})

export class SurveyDeleteComponent implements OnInit {
  title: string;
  survey: Survey;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private surveyListService: SurveyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.survey = new Survey();

    this.activatedRoute.params.subscribe(params => {
      this.survey._id = params.id;
    });

    this.deleteSurvey(this.survey);
  }

  private deleteSurvey(survey: Survey): void {
    this.surveyListService.deleteSurvey(survey).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/survey/list']);
      } else {
        this.flashMessage.show('Delete Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/survey/list']);
      }
    });
  }

}

