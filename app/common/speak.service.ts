import { Injectable } from "@angular/core";
import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';
import { alert } from "ui/dialogs";

@Injectable()
export class CommonSpeakService {

  private TTS: TNSTextToSpeech;
  private lang: string = 'en-AU';
  private rate: number = 1;
  private volume: number = 1;
  private isSpeaking: boolean = false;
  private phraseCache: string[] = [];
  private speechOn: boolean = false;

  constructor() {
    	this.TTS = new TNSTextToSpeech();
	this.volume = 2;
	this.speak('Throttle set');
	//this.speak('Contact!');
	let t = this;
	setInterval( () => {
		t.volume = 1;
		t.speakNext();
	}, 500);
  }

  public showLangs() {
        let l = this.TTS.getAvailableLanguages();
	l.then((a) => { console.log(a); });
  }

  public setRate(r: number) {
  	this.rate = r;
  }

  setSpeech(on: boolean) {
  	this.speechOn = on;
  }

  public setLang(lang: string) {
  	this.lang = lang;
		//language: 'en-GBR'
		//language: 'ita-ITA'
		//language: 'rus-RUS'
		//language: 'por-BRA'
		//language: 'en-USA'
  }

  public speak(text: string) {
  	let phrases = text.split(/,,*/);
	for (let i = 0; i < phrases.length; i++) {
  		this.phraseCache.push(phrases[i]);
	}
  }

  public finishedSpeaking() {
  	this.isSpeaking = false;
  }


  private speakNext() {
  	if (this.isSpeaking) {
		return;
	}
	if (this.phraseCache.length > 0) {
		if (this.speechOn) {
			this.isSpeaking = true;
			let text = this.phraseCache.shift();
			text = text.replace(/CAVOK/, 'CAV O K');
			let siht = this;
			let spkOptions: SpeakOptions = {
				text: text,
				speakRate: this.rate,
				volume: this.volume,
				language: this.lang,
				finishedCallback: (()=>{this.finishedSpeaking()})
			};
			console.log(text);
			if (this.speechOn) {
				this.TTS.speak(spkOptions).then(
						() => { },
					(err) => {
						console.log('error speaking', err);
				});
			}
		} else {
			let text = this.phraseCache.join("\n");
			this.phraseCache = [];
			let options = {
				title: "Silent...",
				message: text,
				okButtonText: "OK"
			};
			alert(options).then(() => { });
		}
	}
  }

  alphabet(ch: string) : string {
  	ch = ch.toLowerCase();
  	let phon: any = {
		'a': 'ALPHA',
		'b': 'BRAVO',
		'c': 'CHARLIE',
		'd': 'DELTA',
		'e': 'ECHO',
		'f': 'FOXTROT',
		'g': 'GOLF',
		'h': 'HOTEL',
		'i': 'INDIA',
		'j': 'JULIET',
		'k': 'KILO',
		'l': 'LIMA',
		'm': 'MIKE',
		'n': 'NOVEMBER',
		'o': 'OSCAR',
		'p': 'PUP PAR',
		'q': 'QUEBEC',
		'r': 'ROMEO',
		's': 'SIERRA',
		't': 'TANGO',
		'u': 'UNIFORM',
		'v': 'VICTA',
		'w': 'WHISKEY',
		'x': 'X RAY',
		'y': 'YANKEE',
		'z': 'ZULU',
		'0': 'ZERO',
		'1': 'WUN',
		'2': 'TWO',
		'3': 'THREE',
		'4': 'FORE',
		'5': 'FIFE',
		'6': 'SIX',
		'7': 'SEFFEN',
		'8': 'EIGHT',
		'9': 'NINER'
	}
	if (phon[ch] !== undefined) {
		return phon[ch];
	}
	return ch;
  }

  getPhonetic(c: string) : string {
  	let st: string[] = [];
  	let bits = c.split('');
	for (let i = 0; i < bits.length; i++) {
		st.push(this.alphabet(bits[i]));
	}
	return st.join(' ');
  }

}
