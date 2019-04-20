import { Component, OnInit } from '@angular/core';
import { Answer } from './../../models/answer';

import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SurveyService } from 'src/app/services/survey.service';
import { AuthService } from 'src/app/services/auth.service';
import { Survey } from 'src/app/models/survey';
import { Question } from 'src/app/models/question';
import { User } from 'src/app/models/user';
import { FilledSurvey } from 'src/app/models/filled-survey';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.css']
})
export class SurveyResultComponent implements OnInit {

  title: string;
  survey: Survey;
  questions: Question[];
  user: User;
  filledSurvey: FilledSurvey[];
  answers: Answer[];

  option1Count: number[];
  option2Count: number[];
  option3Count: number[];
  option4Count: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.option1Count = new Array<number>();
    this.option2Count = new Array<number>();
    this.option3Count = new Array<number>();
    this.option4Count = new Array<number>();

    this.filledSurvey = new Array<FilledSurvey>();
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
    this.surveyService.getSurveyAnswers(survey).subscribe(data => {
      this.survey = data.survey;
      this.filledSurvey = data.answers;
      this.questions = this.survey.questions;

      this.filledSurvey.forEach(element => {
        for (let index = 0; index < element.answers.length; index++) {
          switch (element.answers[index].answer) {

            case '1':
              if (this.option1Count[index] == null) {
                this.option1Count.push(0);
              }
              this.option1Count[index] = this.option1Count[index] + 1;
              break;

            case '2':
              if (this.option2Count[index] == null) {
                this.option2Count.push(0);
              }
              this.option2Count[index] = this.option2Count[index] + 1;
              break;

            case '3':
              if (this.option3Count[index] == null) {
                this.option3Count.push(0);
              }
              this.option3Count[index] = this.option3Count[index] + 1;
              break;

            case '4':
              if (this.option4Count[index] == null) {
                this.option4Count.push(0);
              }
              this.option4Count[index] = this.option4Count[index] + 1;
              break;

            default:
              break;
          }
        }
      });

    });
  }

}
