import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { action, alert } from "ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { CommonSpeakService } from "../common/speak.service";
import { CommonUserService } from '../common/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss']
})
export class ChooseComponent implements OnInit {

  private speech: boolean = true;

  constructor(private userService: CommonUserService,
  	      private speakService: CommonSpeakService) {
  }

  ngOnInit() { }

  getDifficulty(): string {
	  return this.userService.getCurrentDifficulty();
  }

  difficultyChange(elem, difficulty) {
	  if (elem.checked) {
	  	this.userService.setDifficulty(difficulty);
	  }
  }

  toggleSpeech(ev) {
	  this.speech = ev.object.checked;
	  this.speakService.setSpeech(this.speech);
  }

	getSpeech(): boolean {
		return this.speech;
	}

}
