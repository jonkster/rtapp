import { QuestionInterface } from './question.interface';

export interface AtisInterface {
  ad: string;
  ident: string;
  time: string;
  approach: string;
  runways: string;
  runwaysSurface: string;
  holding: string;
  runwayOps: string;
  wind: string;
  xwind: string;
  twind: string;
  visibility: string;
  weather: string;
  cloud: string;
  temp: string;
  qnh: string;
  contact: string;
  shorthand: string,
  questions: QuestionInterface[];
}
