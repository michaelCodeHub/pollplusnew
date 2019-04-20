import { Answer } from './../../models/answer';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SurveyService } from 'src/app/services/survey.service';
import { AuthService } from 'src/app/services/auth.service';
import { Survey } from 'src/app/models/survey';
import { Question } from 'src/app/models/question';
import { User } from 'src/app/models/user';
import { FilledSurvey } from 'src/app/models/filled-survey';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  title: string;
  survey: Survey;
  questions: Question[];
  user: User;
  filledSurvey: FilledSurvey;
  answers: Answer[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.filledSurvey = new FilledSurvey();
    this.user = new User();
    this.questions = new Array<Question>();
    this.answers = new Array<Answer>();
    this.title = this.activatedRoute.snapshot.data.title;
    this.survey = new Survey();

    this.activatedRoute.params.subscribe(params => {
      this.survey._id = params.id;
    });

    this.getSurvey(this.survey);

  }

  private getSurvey(survey: Survey): void {
    this.surveyService.getSurvey(survey).subscribe(data => {
      this.survey = data.survey;
      this.questions = this.survey.questions;

      for (let index = 0; index < this.questions.length; index++) {

        const answer = new Answer();

        answer.question = this.questions[index].question;

        this.answers[index] = answer;

      }

    });
  }

  onSurveySubmit(): void {

    this.filledSurvey.userName = this.user.username;
    this.filledSurvey.answers = this.answers;
    this.filledSurvey.surveyId = this.survey._id;
    this.filledSurvey.surveyCompletionDate = new Date();


    this.surveyService.addFilledSurvey(this.filledSurvey).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
        this.router.navigate(['/survey/list']);
      } else {
        this.flashMessage.show('Add Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/survey/list']);
      }
    });


  }

}
