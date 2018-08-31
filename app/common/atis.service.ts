import { Injectable } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Weather, Cloud } from '../weather/weather.interface';
import { CommonQuestionService } from "../common/question.service";
import { CommonSpeakService } from "../common/speak.service";
import { AerodromesService } from "../aerodromes/aerodromes.service";

import { AtisInterface } from "./atis.interface";

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
	bit = bit.replace(/ arrivals /ig, 'arr');
	bit = bit.replace(/ departures /ig, 'dep');
	bit = bit.replace(/ circuits /ig, 'ccts');
	shorthand.push(bit);

	bit = atis.runwaysSurface;
	bit = bit.replace(/water patches/ig, 'water');
	shorthand.push(bit);

	bit = atis.holding;
	shorthand.push(bit);

	bit = atis.runwayOps;
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
	console.log(atis);
	this.currentAtis = atis;
  }

  public windAsWords(st: string) : string {
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

  public runwaysAsWords(st: string) : string {
  	st = st.replace(/L/ig, ' left');
  	st = st.replace(/R/ig, ' right');
  	st = st.replace(/C/ig, ' centre');
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
	return st;
  }

  public atisAsWords(): string {
  	let aLines: string[] = [];
	let atis = this.currentAtis;
	aLines.push(atis.ad + ' terminal information ' + atis.ident);	
	if (atis.approach !== '') {
		aLines.push('expect ' + atis.approach);
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
	/*

  	let wx:Weather = this.weatherService.createNewWeather();
  	let adName = this.aerodromesService.getName();
  	this.aerodromesService.setWind(wx.windDirection, wx.windStrength);
  	let ident = this.getIdent();
  	let atis: string[] = [];
	this.approach = '';

	this.questionService.clearQuestions();
	this.questionService.addQuestion('what information have you received?', ident, ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'], '');

	atis.push(adName);	
	atis.push('terminal information');	
	atis.push(ident);	
	this.aerodromesService.setNoCircuits(false);
	if (this.weatherService.isIMC()) {
		this.approach = 'instrument approach';
		atis.push('expect instrument approach');
		this.questionService.addQuestion('If arriving, what sort of approach would you expect?', "instrument", ['visual', 'special vfr', 'standard', 'cannot be determined'], 'atis says expect instrument approach');
		if (this.aerodromesService.getAllowSpecialVFR()) {
			if (this.weatherService.isRVFR()) {
				this.questionService.addQuestion('For fixed wing VFR aircraft, what is the minimum visibilty you should maintain?', "1600m", ['800m', '2000m', '5000m', '8km', 'none - you cannot operate VFR'], 'special VFR procedures - you must maintain 1600m visibility');
				atis.push('special V F R procedures apply')
				this.approach += ' spec vfr';
				this.aerodromesService.setNoCircuits(true);
			}
		}
	} else {
		this.questionService.addQuestion('If arriving, what sort of approach would you most likely expect?', "visual", [ 'instrument', 'ils', 'special vfr', 'standard', 'cannot be determined'], 'no mention is made of specific approaches so probably visual');
	}
	if (this.aerodromesService.getAllowSpecialVFR()) {
		if (! this.weatherService.isVFR()) {
			this.aerodromesService.setNoCircuits(true);
			atis.push('control zone closed for V F R operations');
			this.approach += ' no vfr';
			this.questionService.addQuestion('For fixed wing VFR aircraft, what is the minimum visibilty you should maintain?', "none - you cannot operate VFR", ['800m', '2000m', '5000m', '8km', 'none - you cannot operate VFR'], 'the zone is closed for VFR operations');
		}
	}
	atis.push(',');	
	atis.push(this.aerodromesService.getActiveRunways());
	let rwyOptsA = this.aerodromesService.getRunways();
	let rwyOptsD = this.aerodromesService.getRunways();
	let rwyOptsCircuits = this.aerodromesService.getRunways();
	this.questionService.addQuestion('Which runway would you expect for an arrival', this.aerodromesService.getArrivalRunway(), rwyOptsA, '');
	this.questionService.addQuestion('Which runway would you expect for a departure', this.aerodromesService.getDepartureRunway(), rwyOptsD, '');
	rwyOptsCircuits.push('circuits not available');
	if (this.aerodromesService.getCircuitsLikely()) {
		this.questionService.addQuestion('Which runway would you expect for circuits', this.aerodromesService.getCircuitRunway(), rwyOptsCircuits, '');
	} else {
		this.questionService.addQuestion('Which runway would you expect for circuits', 'you would be unlikely to be allowed circuits', rwyOptsCircuits, '');
	}
if (this.weatherService.getGroundCondition() !== '') {
		atis.push(',');	
		if (this.aerodromesService.multipleRunways()) {
			atis.push('runways')
		} else {
			atis.push('runway')
		}
		atis.push(this.weatherService.getGroundCondition());
	}
	atis.push(',');	
	atis.push('wind ');
	atis.push(this.weatherService.windAsString());
	let maxXwind = this.aerodromesService.getMaxXwind();
	if (maxXwind[0] > 0) {
	atis.push('cross wind maximum ' + this.toNumbers(maxXwind[0]) + ' knots runway ' + maxXwind[1]);
	this.questionService.addQuestion('What is the maximum cross wind reported?', maxXwind[0].toString(), ['0', '5', '7', '10', '12', '15'], '');
}
let maxTwind = this.aerodromesService.getMaxTwind();
if (maxTwind[0] > 0) {
	atis.push('tail wind maximum ' + this.toNumbers(maxTwind[0]) + ' knots runway ' + maxTwind[1]);
	this.questionService.addQuestion('What is the maximum tail wind reported?', maxTwind[0].toString(), ['0', '1', '2', '3', '4', '5'], '');
}
	
atis.push(',');	
if (! this.weatherService.isCAVOK()) {
	atis.push('visibility');	
	atis.push(this.weatherService.visAsString());
	atis.push(',');	
} else {
	this.questionService.addQuestion('Is there cloud above 5000 feet?', 'possibly yes', ['definitely yes', 'definitely no'], "CAVOK means no cloud below 5000, there could be cloud above this'");
	this.questionService.addQuestion('What is the visibility?', '10km or greater', ['2000m', '5000m', '8km'], "CAVOK means visibility must be 10km or greater");
	this.questionService.addQuestion('Could there be Towering Cumulus above the aerodrome?', 'no', ['yes'], "there must be no towering Cumulus if CAVOK");
	this.questionService.addQuestion('Could there be Stratocumulus above the aerodrome?', 'yes', ['no'], "providing the cloud is above 5000' it can still be CAVOK");
}
atis.push('weather');	
atis.push(this.weatherService.weatherAsString());
atis.push(',');	
if (! this.weatherService.isFOG()) {
	if (! this.weatherService.isCAVOK()) {
		atis.push('cloud');	
		atis.push(this.weatherService.cloudAsString());
		atis.push(',');	
	}
}
atis.push('temperature');	
atis.push(this.toNumbers(wx.temp));
if ((wx.temp - wx.dewpoint) < 4) {
	atis.push('dewpoint');
	atis.push(this.toNumbers(wx.dewpoint));
	let diff = wx.temp - wx.dewpoint;
	if (diff > 0) {
	this.questionService.addQuestion('Would a drop in temperature by ' + diff + 'degrees matter for visibility?', 'yes', [ 'no' ], 'the dewpoint is within ' + diff + ' degrees of the air temperature - dropping temperature could result in cloud forming');
	}
}
atis.push(',');	
atis.push('Q N H');	
atis.push(wx.qnh);
this.questionService.addQuestion('What is the QNH?', this.weatherService.qnhNumber.toString(), [ '1009', '1013', '1015', '1005', '1017' ], '');
atis.push(',');	

let spec: string[] = this.aerodromesService.getSpecialities();
if (spec.length > 0) {
	atis.push(spec.join(', '));
	atis.push(',');	
}
atis.push('on first contact with');	
atis.push(adName);	
atis.push(this.aerodromesService.servicesAsString());	
atis.push('notify receipt of information');	
atis.push(ident);	
atis.push('.');	

let a = atis.join(' ');
console.log('>', a);
return a;
*/
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
