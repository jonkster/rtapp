import { Injectable } from '@angular/core';

@Injectable()
export class CommonQuestionService {

  private questions: any = [];

  constructor() { }

  getNextQuestion() {
  	if (this.questions.length > 0) {
		let q = this.questions.pop();
		let answers: any = {};
		for (let i = 0; i < q.b.length; i++) {
			
			answers[q.b[i].toUpperCase()] = 'false';
		}
		answers[q.c.toUpperCase()] = true;
		q.list = answers;
		return q;
	}
	return undefined;
  }

  addQuestion(question: string, correct: string, bogus: string[], reason: string) {
  	this.questions.push({
		q: question,
		c: correct,
		b: bogus,
		r: reason,
		list: []
	});
  }

  clearQuestions() {
  	this.questions = [];
  }

}
