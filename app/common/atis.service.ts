import { Injectable } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Weather, Cloud } from '../weather/weather.interface';
import { CommonQuestionService } from "../common/question.service";
import { CommonSpeakService } from "../common/speak.service";
import { AerodromesService } from "../aerodromes/aerodromes.service";

@Injectable()
export class CommonAtisService {

  private ident: string = '';
  private approach: string = '';


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

  public getCurrentRunways() {
  	let rwys = this.aerodromesService.getArrivalRunway();
	if (this.aerodromesService.getArrivalRunway() !== this.aerodromesService.getDepartureRunway()) {
		rwys += ' arr ' + this.aerodromesService.getDepartureRunway() + ' dep ';
	} else {
		rwys += ' a+d ';
	}
	if (this.aerodromesService.getCircuitRunway() !== '') {
		rwys += this.aerodromesService.getCircuitRunway() + ' cct';
	}
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

  public generateAtis(level: string) : string {
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
	if (maxXwind >= 7) {
		atis.push('cross wind maximum ' + this.toNumbers(maxXwind));
		this.questionService.addQuestion('What is the maximum cross wind reported?', maxXwind.toString(), ['0', '5', '7', '10', '12', '15'], '');
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
