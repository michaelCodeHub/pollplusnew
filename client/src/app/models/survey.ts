import { Question } from './question';
export class Survey {
// tslint:disable-next-line: variable-name
  _id: string;
  surveyTitle: string;
  surveyAuthor: string;
  surveyFrom: Date;
  surveyTill: Date;
  createDateAndTime: Date;
  questions: Question[];
}
