import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { action, alert } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";


import { CommonAtisService } from "../common/atis.service";
import { CommonQuestionService } from "../common/question.service";
import { CommonSpeakService } from "../common/speak.service";
import { CommonUserService } from '../common/user.service';
import { AerodromesService } from '../aerodromes/aerodromes.service';


@Component({
  moduleId: module.id,
  selector: 'app-atis',
  templateUrl: './atis.component.html',
  styleUrls: ['./atis.component.scss']
})
export class AtisComponent implements OnInit, OnDestroy {

/*@ViewChild("CB1") airspaceCheckbox: ElementRef;*/

	private subscriptions: any;
	private ident: string = '';
	private rwys: string = '';
	private vis: string = '';
	private wind: string = '';

	private knownAds: string[] = [];
	private answeredQuestions: string[] = [];

	private difficultyOptions: string[] = [
		'simple', 'intermediate', 'advanced'
	];
	private difficulty: string = 'simple';
	private airspaceOptions: string[] = [
		'A', 'C', 'D', 'E', 'G', 'CTAF'
	];
	private airspace: string = 'G';
	private ad: string = 'YSCN';
	private currentAtis: string = '';
	private stopQuestions: boolean = false;
	private speech: boolean = true;

	constructor(private atisService: CommonAtisService,
			 private aerodromesService: AerodromesService,
			 private questionService: CommonQuestionService,
			 private userService: CommonUserService,
			 private speakService: CommonSpeakService,
			 private _page: Page) {

			 this.subscriptions = this._page.on("loaded", () => {
				this.showHelp();
        		});

	}

	ngOnInit() {
		this.knownAds = this.aerodromesService.getKnownAds();
       	}

	ngOnDestroy() {
    		this._page.off(this.subscriptions);
        }

	showHelp() {
		let instructions = "This exercise is to develop your ability to confidently copy and understand ATIS transmissions.\n" +
				"Instructions:\n" +
				"Get the ATIS, (repeat if necessary until you are confident you have understood it).\n" +
				"Then, answer the questions." +
				"The aim is to be able to quickly and accurately extract the information you need.\n";
		let options = {
		    title: 'Instructions',
		    message: instructions,
		    okButtonText: "OK"
		};
		alert(options).then((result) => { });
	}

	getSpeech(): boolean {
		return this.speech;
	}

	toggleSpeech(ev) {
		this.speech = ev.object.checked;
		this.speakService.setSpeech(this.speech);
	}

	public atis(getNew: boolean) {
		this.answeredQuestions = [];
		let airspace = this.userService.getCurrentAirspace();
		let level = this.userService.getCurrentDifficulty();
		if (getNew || (this.currentAtis === '')) {
			this.currentAtis = this.atisService.generateAtis(level);
		}
		this.ident = this.atisService.getCurrentIdent();
		this.rwys = this.atisService.getCurrentRunways().replace(/ and /g, '+');
		this.wind = this.atisService.getCurrentWind();
		this.vis = this.atisService.getCurrentVis();
		console.log(this.rwys);
		switch(level) {
			case 'advanced': 
				this.speakService.setLang('en-AU');
				this.speakService.setRate(1.6);
				break;
			case 'intermediate': 
				this.speakService.setLang('en-AU');
				this.speakService.setRate(1.3);
				break;
			case 'simple': 
				this.speakService.setLang('en-AU');
				this.speakService.setRate(1);
				break;
			default:
				this.speakService.setLang('en-AU');
				this.speakService.setRate(1);
		}	
		this.speakService.speak(this.currentAtis);
	}

	airspaceChange(elem, airspace) {
		if (elem.checked) {
			this.userService.setAirspace(airspace);
		}
	}

	difficultyChange(elem, difficulty) {
		if (elem.checked) {
			this.userService.setDifficulty(difficulty);
		}
	}

	getAd(): string {
		return this.ad;
	}

	adChange(elem, ad) {
		if (elem.checked) {
			this.ad = ad;
  			this.aerodromesService.setAd(ad);
		}
	}

	getAirspace(): string {
		return this.userService.getCurrentAirspace();
	}

	getDifficulty(): string {
		return this.userService.getCurrentDifficulty();
	}

	showAnswer(ans: string) {
		let options = {
		    title: 'Answer',
		    message: ans,
		    okButtonText: "OK"
		};
		alert(options).then((result) => { this.testCopy(); });
	}

	testCopy() {
		let question = this.questionService.getNextQuestion();
		if (question === undefined) {
			this.stopQuestions = true;
			alert("no more questions");
			return;
		}
		this.stopQuestions = false;
		let options = {
		    title: question.q,
		    message: 'select the most correct answer',
		    cancelButtonText: "Cancel",
		    actions: Object.keys(question.list)
		};
		action(options).then((result) => {
			if (result !== 'Cancel') {
				let answer = question.q + ' you said: ' + result;
				if (question.c.toLowerCase() === result.toLowerCase()) {
					answer += ' CORRECT';
				} else {
					answer += " - incorrect, should be: " + question.c;
				}
				if (question.r !== '') {
					answer += ' (' + question.r + ')';
				}
				this.answeredQuestions.push(answer);
				this.showAnswer(answer);
			} else {
				this.stopQuestions = true;
			}
	       	});
	}
}
