import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { action, alert } from "ui/dialogs";

import { AerodromesService } from '../aerodromes/aerodromes.service';
import { CommonAtisService } from "../common/atis.service";
import { CommonQuestionService } from "../common/question.service";
import { CommonSpeakService } from "../common/speak.service";
import { CommonUserService } from '../common/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-classd',
  templateUrl: './classd.component.html',
  styleUrls: ['./classd.component.scss']
})
export class ClassDComponent implements OnInit {
	private cheat: boolean = false;
	private currentAtis: string = '';
	private ident: string = '';
	private speech: boolean = true;
	private shorthand: string = '';

	constructor(private atisService: CommonAtisService,
			 private aerodromesService: AerodromesService,
			 private questionService: CommonQuestionService,
			 private userService: CommonUserService,
			 private speakService: CommonSpeakService,
			 private _page: Page) {
	}

  ngOnInit() { 
  //  	this.doArrival();
  	this.aerodromesService.setAd('YSCN');
  }

  public atis(getNew: boolean) {
		this.cheat = false;
		let level = this.userService.getCurrentDifficulty();
		if (getNew || (this.currentAtis === '')) {
			this.currentAtis = this.atisService.generateAtis(level);
		}
		this.ident = this.atisService.getCurrentIdent();
		this.shorthand = this.atisService.getShorthandAtis();
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

	getSpeech(): boolean {
		return this.speech;
	}

	toggleSpeech(ev) {
		this.speech = ev.object.checked;
		this.speakService.setSpeech(this.speech);
	}

  doArrival() {
  		let instructions = "You are planning to arrive at Camden via The Oaks inbound reporting point.\n" +
			"You will need to obtain ATIS and contact Camden Tower\n";

		let options = {
		    title: 'Scenario',
		    message: instructions,
		    okButtonText: "OK"
		};
		alert(options).then((result) => { });
  }

}
