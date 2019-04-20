import { Answer } from './answer';
export class FilledSurvey {
// tslint:disable-next-line: variable-name
  _id: string;
  surveyId: string;
  userName: string;
  answers: Answer[] = new Array();
  surveyCompletionDate: Date;
}
