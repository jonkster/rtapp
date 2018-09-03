import { Injectable } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Weather, Cloud } from '../weather/weather.interface';
import { CommonQuestionService } from "../common/question.service";
import { CommonSpeakService } from "../common/speak.service";
import { AerodromesService } from "../aerodromes/aerodromes.service";

import { AtisInterface } from "./atis.interface";
import { QuestionInterface } from "./question.interface";

@Injectable()
export class CommonAtisService {

  private ident: string = '';
  private approach: string = '';
  private currentAtis: AtisInterface = {} as any;


  constructor(private weatherService: WeatherService,
	  private speakService: CommonSpeakService,
	  private questionService: CommonQuestionService,
	  private aerodromesService: AerodromesService) { }

  public getCurrentIdent() {
	  return this.ident;
  }  

  private shorthand(st: string): string {
  	st = st.replace(/instrument/ig, 'inst');
  	st = st.replace(/approach/ig, 'app');
  	return st;
  }

  public getCurrentApproach() {
	  return this.shorthand(this.approach);
  }  

  public getCurrentTemp() {
	  return this.weatherService.getCurrentTemp();
  }  

  public getCurrentRunways() {
  	let rwys = this.aerodromesService.getRunwayShorthand();
	return rwys;
  }  

  public getCurrentWind() {
  	return this.weatherService.windAsShorthand();
  }

  public getCurrentVis() {
  	return this.weatherService.visAsShorthand();
  }

  public getCurrentWeather() {
  	return this.weatherService.wxAsShorthand();
  }

  public getCurrentCloud() {
  	return this.weatherService.cloudAsShorthand();
  }

  public getCurrentQNH() {
  	return this.weatherService.qnhAsShorthand();
  }

  public getCurrentOther() {
  	return this.aerodromesService.getCurrentOther();
  }

  public getShorthandAtis() {
  	return this.shorthandAtis(this.currentAtis);
  }

  public shorthandAtis(atis: AtisInterface): string {
  	let shorthand: string[] = [];
  	let bit = atis.approach;
	if (bit !== '') {
		bit = bit.replace(/instrument/ig, 'inst');
		bit = bit.replace(/approach/ig, 'app');
		bit = bit.replace(/visual/ig, 'vis');
		bit = bit.replace(/independent/ig, 'ind');
		shorthand.push('exp ' + bit);
	}

	bit = atis.runways;
	bit = bit.replace(/ and /ig, '+');
	bit = bit.replace(/ for /ig, '');
	bit = bit.replace(/arrivals/ig, 'ar');
	bit = bit.replace(/departures/ig, 'dp');
	bit = bit.replace(/circuits/ig, 'ccts');
	bit = bit.replace(/circuit training/ig, 'ccts');
	shorthand.push(bit);

	bit = atis.runwaysSurface;
	bit = bit.replace(/water patches/ig, 'water');
	shorthand.push(bit);

	bit = atis.holding;
	shorthand.push(bit);

	bit = atis.runwayOps;
	bit = bit.replace(/restricted/ig, 'res');
	bit = bit.replace(/operations/ig, 'ops');
	bit = bit.replace(/special/ig, 'spec');
	bit = bit.replace(/procedures/ig, 'procs');
	bit = bit.replace(/apply/ig, '');
	bit = bit.replace(/control zone closed for vfr ops/ig, 'v̶f̶r̶');
	shorthand.push(bit);

	bit = atis.wind;
	bit = bit.replace(/variable/ig, 'vbl');
	bit = bit.replace(/varying between/ig, '');
	bit = bit.replace(/ and /ig, '-');
	bit = bit.replace(/degrees/ig, '');
	bit = bit.replace(/knots/ig, 'kts');
	bit = bit.replace(/minimum/ig, '');
	bit = bit.replace(/maximum/ig, '-');
	bit = bit.replace(/\s*,\s*/ig, '/');
	bit = bit.replace(/\s+/ig, ' ');
	shorthand.push(bit);

	bit = atis.xwind;
	bit = bit.replace(/crosswind/ig, "xw");
	shorthand.push(bit);

	bit = atis.twind;
	bit = bit.replace(/tailwind/ig, "tw");
	shorthand.push(bit);

	if (! atis.weather.match(/CAVOK/)) {
		bit = atis.visibility;
		bit = bit.replace(/greater than 10 kilometres/ig, ">10km");
		bit = bit.replace(/reducing to/ig, "↓");
		bit = bit.replace(/kilometres/ig, "km");
		bit = bit.replace(/metres/ig, "m");
		shorthand.push(bit);
	}

	bit = atis.weather;
	shorthand.push(bit);

	if (! atis.weather.match(/CAVOK/)) {
		bit = atis.cloud;
		bit = bit.replace(/broken/ig, "bkn");
		bit = bit.replace(/overcast/ig, "ovc");
		bit = bit.replace(/scattered/ig, "sct");
		bit = bit.replace(/isolated/ig, "iso");
		shorthand.push('CLD ' + bit);
	}

	bit = atis.temp;
	shorthand.push('T'+bit);

	bit = atis.qnh;
	shorthand.push('Q'+bit);

	let s = shorthand.join("\n");
	s = s.replace(/maximum/ig, 'max');
	s = s.replace(/minimum/ig, 'max');
	s = s.replace(/knots/ig, 'kts');
	s = s.replace(/runway/ig, 'rwy');
	s = s.replace(/showers/ig, 'shwrs ');
	s = s.replace(/thunderstorms/ig, 'TS ');
	s = s.replace(/rain/ig, 'ra ');
	s = s.replace(/ of /ig, '');
	s = s.replace(/ in area/ig, ' area');
	s = s.replace(/-x-/g, '');
	s = s.replace(/\n\n+/g, "\n");
	bit = bit.replace(/\s+/ig, ' ');
	return s;
  }

  public generateAtisNew(level: string) {
  	let wx:Weather = this.weatherService.createNewWeather();
  	let adName = this.aerodromesService.getName();
  	this.aerodromesService.setWind(wx.windDirection, wx.windStrength);
	let atis: AtisInterface = {
		'ad': adName,
		'ident': this.getIdent(),
		'time': '0000',
		'approach': this.aerodromesService.getApproach(),
		'runways': this.aerodromesService.getActiveRunwaysAsText(),
  		'runwaysSurface': this.aerodromesService.getRunwaySurface(),
  		'holding': this.aerodromesService.getHolding(),
  		'runwayOps': this.aerodromesService.getRunwayOperations(),
  		'wind': this.weatherService.windAsText(),
  		'xwind': this.aerodromesService.getMaxXwindAsText(),
  		'twind': this.aerodromesService.getMaxTwindAsText(),
  		'visibility': this.weatherService.visAsText(),
  		'weather': this.weatherService.weatherAsString(),
  		'cloud': this.weatherService.cloudAsText(),
  		'temp': wx.temp,
  		'qnh': this.weatherService.qnhAsText(),
  		'contact': this.aerodromesService.servicesAsString(),
  		'shorthand': '',
  		'questions': []
	} as any;
	atis.shorthand = this.shorthandAtis(atis);
	this.makeAtisQuestions(atis);
	console.log(atis);
	this.currentAtis = atis;
  }

  public makeAtisQuestions(atis: AtisInterface) {
  	this.questionService.addQuestion('what information have you received?', atis.ident,
				['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel'],
				'');
	if (atis.approach !== '') {
		this.questionService.addQuestion('If arriving, what sort of approach would you expect?', atis.approach,
				['visual', 'ils', 'special vfr', 'standard', 'cannot be determined'],
				'');
	}
	this.questionService.addQuestion('What runway would you expect for arrival?', atis.runways, ['06', '34', '11L', '30', '28', '29C or 29R'], '');
	this.questionService.addQuestion('What is the wind?', atis.wind, ['270/10', '220/10', '120-140/5-10', 'variable 5', 'calm'], '');
	if (atis.xwind !== '') {
		this.questionService.addQuestion('What is the maximum cross wind reported?', atis.xwind,
       				['0', '5', '7', '10', '12', '15'], '');
	}
	if (atis.twind !== '') {
		this.questionService.addQuestion('What is the maximum tail wind reported?', atis.twind,
				['0', '1', '2', '3', '4', '5'], '');
	}
	if (atis.weather === 'CAVOK') {
		this.questionService.addQuestion('Is there cloud above 5000 feet?', 'possibly yes',
				['definitely yes', 'definitely no'], "CAVOK means no cloud below 5000' but there can be cloud above this");
		this.questionService.addQuestion('What is the visibility?', '10km or greater',
			       	['2000m', '5000m', '8km'], "CAVOK means visibility must be 10km or greater");
		this.questionService.addQuestion('Could there be Towering Cumulus above the aerodrome?', 'definitely no',
			       	['definitely yes', 'possibly yes'], "there must be no towering Cumulus if CAVOK");
		this.questionService.addQuestion('Could there be Stratocumulus above the aerodrome?', 'possibly yes',
			       	['definitely no', 'definitely yes'], "providing the cloud is above 5000' it can still be CAVOK");
	} else {
		this.questionService.addQuestion('What is the visibility?', atis.visibility,
			['800 metres', '2000 metres', '5000 metres', '8 kilometres', 'greater than 10 kilometres'], "");
		this.questionService.addQuestion('What is the reported cloud?', atis.cloud,
			['broken 500', 'scattered 1500', 'few 2500', 'overcast 3000'], "");
		this.questionService.addQuestion('Could there be unreported cloud at 6000?', 'yes',
			['no'], "ATIS will only report cloud below 5000' (unless CB or TCU)");
	}
	this.questionService.addQuestion('What is the temperature?', atis.temp.toString(),
			       	['10', '13', '14', '15', '20', '22', '23', '25', '28', '30', '32'], "");
	this.questionService.addQuestion('What is the QNH?', atis.qnh,
			       	['1001', '1003', '1004', '1005', '1010', '1012', '1013', '1014', '1015', '1017', '1020'], "");
  }

  public windAsWords(st: string) : string {
  	st = st.replace(/L\b/g, ' left');
  	st = st.replace(/R\b/g, ' right');
  	st = st.replace(/C\b/g, ' centre');
  	st = st.replace(/0/g, 'zero ');
	st = st.replace(/1/g, 'one ');
  	st = st.replace(/2/g, 'two ');
  	st = st.replace(/3/g, 'three ');
  	st = st.replace(/4/g, 'four ');
  	st = st.replace(/5/g, 'five ');
  	st = st.replace(/6/g, 'six ');
  	st = st.replace(/7/g, 'seven ');
  	st = st.replace(/8/g, 'eight ');
	st = st.replace(/9/g, 'nine ');
	return st;
  }

  public surfaceAsWords(st: string) : string {
  	st = st.replace(/WET/ig, 'runway wet');
  	st = st.replace(/DAMP/ig, 'runway wet');
  	st = st.replace(/FLOODED/ig, 'runway flooded');
  	st = st.replace(/WATER PATCHES/ig, 'water patches on runway');
	return st;
  }

  public visAsWords(st: string) : string {
  	st = st.replace(/ 10 /g, ' ten ');
  	st = st.replace(/000 /g, 'thousand ');
  	st = st.replace(/00 /g, 'hundred ');
	st = this.windAsWords(st);
	return st;
  }

  public approachAsWords(st: string) : string {
	st = st.replace(/ILS/g, 'I L S');
	return st;
  }

  public runwaysAsWords(st: string) : string {
  	st = st.replace(/L/g, ' left');
  	st = st.replace(/R/g, ' right');
  	st = st.replace(/C/g, ' centre');
  	st = st.replace(/0/g, ' zero');
  	st = st.replace(/1/g, ' one');
  	st = st.replace(/2/g, ' two');
  	st = st.replace(/3/g, ' three');
  	st = st.replace(/4/g, ' four');
  	st = st.replace(/5/g, ' five');
  	st = st.replace(/6/g, ' six');
  	st = st.replace(/7/g, ' seven');
  	st = st.replace(/8/g, ' eight');
	st = st.replace(/9/g, ' nine');
	st = st.replace(/\./g, ' decimal');
	return st;
  }

  public atisAsWords(): string {
  	let aLines: string[] = [];
	let atis = this.currentAtis;
	aLines.push(atis.ad + ' terminal information ' + atis.ident);	
	if (atis.approach !== '') {
		aLines.push('expect ' + this.approachAsWords(atis.approach));
	}
	aLines.push('runway ' + this.runwaysAsWords(atis.runways));

	if (atis.runwaysSurface !== '') {
		aLines.push(this.surfaceAsWords(atis.runwaysSurface));
	}
	if (atis.holding !== '') {
		aLines.push(atis.holding);
	}
	if (atis.runwayOps !== '') {
		aLines.push(atis.runwayOps);
	}
	aLines.push('wind ' + this.windAsWords(atis.wind));

	if (atis.xwind !== '') {
		aLines.push(this.windAsWords(atis.xwind));
	}
	if (atis.twind !== '') {
		aLines.push(this.windAsWords(atis.twind));
	}
	if (atis.weather !== 'CAVOK') {
		aLines.push('visibility ' + this.visAsWords(atis.visibility));
	}
	if (atis.weather !== '') {
		aLines.push('weather ' + this.visAsWords(atis.weather));
	}
	if (atis.weather !== 'CAVOK') {
		aLines.push('cloud ' + atis.cloud);
	}
	aLines.push('temperature ' + this.windAsWords(atis.temp.toString()));
	aLines.push('Q N H ' + this.windAsWords(atis.qnh));
	aLines.push('on first contact with ' + atis.ad + ' ' + atis.contact + ' notify receipt of information ' + atis.ident);
	let text = aLines.join(',');
	text = text.replace(/-x-/g, '');
	text = text.replace(/,,+/g, ',');
	return text;
  }

  public generateAtis(level: string) : string {
	this.generateAtisNew(level);
	let words = this.atisAsWords();
	console.log(words);
	return words;
}

getIdent() {
let chIndex = Math.round(Math.random() * 7);
let ch = String.fromCharCode(chIndex + 65);
this.ident = ch;
return this.speakService.alphabet(ch);
}

public toNumbers(n: number) : string {
let map = {
	'0': 'zero',
	'1': 'wun',
	'2': 'two',
	'3': 'three',
	'4': 'fore',
	'5': 'fife',
	'6': 'six',
	'7': 'seffen',
	'8': 'eight',
	'9': 'niner',
	};
let nst = n.toString();
let d = nst.split('');
let response: string[] = [];
for (let i = 0; i < d.length; i++) {
	let dst = d[i];
	let dPhon = map[dst];
	if (dPhon !== undefined) {
		response.push(dPhon);
	} else {
	response.push(dst);
	}
}
return response.join(' ');
}

}
