import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../models/user';
import { Question } from './../../models/question';
import { Survey } from './../../models/survey';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  title: string;
  survey: Survey;
  questions: Question[];
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();

    this.questions = new Array<Question>();

    this.questions.push(new Question());

    this.title = this.activatedRoute.snapshot.data.title;
    this.survey = new Survey();

    this.activatedRoute.params.subscribe(params => {
      this.survey._id = params.id;
    });

    if (this.title === 'Edit Survey') {
      this.getSurvey(this.survey);
    }
    this.isLoggedIn();
  }

  private getSurvey(survey: Survey): void {
    this.surveyService.getSurvey(survey).subscribe(data => {
      this.survey = data.survey;


    });
  }


  onAddNew(): void {
    let question = new Question()
    this.questions.push(question);
  }

  onDelete(i: number): void {
    if(!confirm('Are You Sure?')) {
      this.router.navigate(['/survey/add']);
    }
    else {
     // for( var i = 0; i < this.questions.length; i++){
      //  if ( this.questions[i] === 5) {
      //    this.questions.splice(i, 1);
      //  }
     //}

   this.questions.splice(i, 1);
    }

  }

   onDetailsPageSubmit(): void {

    console.log(this.survey.surveyTill);

    this.survey.questions = this.questions;
    this.survey.surveyAuthor = this.user.username;

    switch (this.title) {
      case 'Add Survey':
      console.log(this.survey);
      this.surveyService.addSurvey(this.survey).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/survey/list']);
        } else {
          this.flashMessage.show('Add Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/survey/list']);
        }
      });
      break;

      case 'Edit Survey':
      this.surveyService.editSurvey(this.survey).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/survey/my-survey']);
        } else {
          this.flashMessage.show('Edit Survey Failed', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/survey/my-survey']);
        }
      });
      break;
    }
  }


  isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if(result) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }

}
