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
	private approach: string = '';
	private rwys: string = '';
	private vis: string = '';
	private wind: string = '';
	private weather: string = '';
	private temp: string = '';
	private qnh: string = '';
	private other: string = '';

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
	private cheat: boolean = false;
	private shorthand: string = '';

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
				"The aim is to be able to quickly and accurately extract the information you need.\n" +
				"Instructions:\n" +
				"1. Grab a pencil and some scrap paper.\n" +
				"2. Press 'Get New ATIS', listen to the ATIS and practice copying it down, (repeat if necessary until you are confident you have understood it).\n" +
				"3. Once copied try answering the questions.\n" +
				"4. repeat!\n" +
				"An example shortand for the ATIS can be displayed by pressing the 'Cheat' button - you do not have to use this format for jotting down the ATIS - it is just a suggestion.\n";
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
		this.cheat = false;
		this.answeredQuestions = [];
		let airspace = this.userService.getCurrentAirspace();
		let level = this.userService.getCurrentDifficulty();
		if (getNew || (this.currentAtis === '')) {
			this.currentAtis = this.atisService.generateAtis(level);
		}
		this.shorthand = this.atisService.getShorthandAtis();
		this.ident = this.atisService.getCurrentIdent();
		this.approach = this.atisService.getCurrentApproach();
		this.rwys = this.atisService.getCurrentRunways().replace(/rwy/g, '');
		this.wind = this.atisService.getCurrentWind();
		this.wind += ' ' + this.aerodromesService.getMaxXwindAsShorthand();
		this.vis = this.atisService.getCurrentVis();
		this.weather = this.atisService.getCurrentWeather();
		this.weather += ' ' + this.atisService.getCurrentCloud();
		this.temp = 'T' + this.atisService.getCurrentTemp();
		this.qnh = this.atisService.getCurrentQNH();
		this.other = this.atisService.getCurrentOther();
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
			this.cheat = true;
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
				let answer = question.q + "\nyou said: " + result +"\n";
				if (question.c.toLowerCase() === result.toLowerCase()) {
					answer += "\nCORRECT!\n";
				} else {
					answer += "\nincorrect, should be: " + question.c;
				}
				if (question.r !== '') {
					answer += "\n(" + question.r + ')';
				}
				this.answeredQuestions.push(answer);
				this.showAnswer(answer);
			} else {
				this.stopQuestions = true;
			}
	       	});
	}
}
