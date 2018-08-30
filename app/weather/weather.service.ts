import { Injectable } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { Weather, Cloud } from './weather.interface';

@Injectable()
export class WeatherService {

private wx: Weather = {} as any;

  public qnhNumber: number = 1013;

  constructor(private fonticon: TNSFontIconService) {
 	this.createNewWeather();
  }

  public createNewWeather(): Weather {
  	this.generateWx();
	return this.wx;
  }

  setWx(wx: string) {
  	this.wx.wx.push(wx);
  }

  setVis(visMax: number, visMin: number, comment: string) {
  	this.wx.vis = {} as any;
  	this.wx.vis.max = visMax;
  	this.wx.vis.min = visMin;
  	this.wx.vis.comment = comment;
  }

  setWind(direction: number, variation: number, strength: number, gustStrength: number) {
	  this.wx.windStrength = strength;
	  this.wx.windGustStrength = gustStrength;
	  this.wx.windDirection = direction;
	  this.wx.windDirectionVariation = variation;
  }

  setCloud(base: number, tops: number, coverage: number) {
  	let cloud:Cloud = {} as any;
	cloud.base = base;
	cloud.tops = tops;
	cloud.coverage = coverage;
	this.wx.cloud.push(cloud);
  }

  setTemp(temp: number, dewpoint: number) {
  	this.wx.temp = temp;
	this.wx.dewpoint = dewpoint;
  }

  getGroundCondition() {
  	return this.wx.groundCondition;
  }

  setGround(cond: string) {
  	this.wx.groundCondition = cond;
  }

  generateWind() {
	let windStrength = Math.floor(Math.random() * 17);
	let windGustStrength = Math.floor(Math.random() * 10);
	let windDirection = Math.floor(Math.random() * 36) * 10;
	let windDirectionVariation = Math.floor(Math.random() * 4) * 10;
	this.setWind(windDirection, windDirectionVariation, windStrength, windGustStrength);
  }

  generateTemp() {
	let temp = Math.floor(5 + Math.random() * 35);
	let rh = 50 + 50 * Math.random();
	let dewpoint = Math.floor(temp - (100 - rh)/5)
	this.setTemp(temp, dewpoint);
  }

  public generateWx() {
  	this.qnhNumber = Math.floor(1023 - (Math.random() * 20));
  	this.wx.qnh = this.toNumbers(this.qnhNumber);
	this.wx.cloud = [];
  	this.generateWind();
  	this.generateTemp();
  	this.setVis(9999, 9999, '');
  	this.setGround('');
  	this.wx.wx = [];

  	let maxOpts = 10;
	let dice = Math.round(Math.random() * maxOpts);
	let subDice = Math.round(Math.random() * maxOpts);
	switch (dice) {
		case 0:
			this.setWx('THUNDERSTORMS IN AREA');
			this.setCloud(2500, 14500, 3);
			this.setTemp(24, 18);
			let dir: number = Math.round(Math.random()*36) * 10;
			let v: number = dir + 40;
			this.setWind(dir, v, 15, 20);
			this.setGround('WATER PATCHES');
			break;
		case 1:
			this.setWx('SHOWERS OF RAIN IN AREA');
			this.setCloud(2000, 4500, 6);
			this.setVis(9999, 4000, 'IN RAIN');
			this.setGround('WET');
			break;
		case 2:
			this.setWx('FOG IN AREA');
			this.setCloud(500, 1200, 7);
			this.setVis(2000, 400, 'IN FOG');
			this.setWind(0, 0, 0, 0);
			this.setTemp(11, 11);
			break;
		case 3:
			this.setWx('FOG');
			this.setVis(500, 500, 'IN FOG');
			this.wx.cloud = [];
			this.setWind(0, 0, 0, 0);
			this.setTemp(10, 10);
			this.setGround('DAMP');
			break;
		case 4:
		case 5:
		case 6:
  			this.generateCloud();
			break;
		case 7:
		case 8:
		default:
			this.setWx('CAVOK');
			this.setVis(9999, 9999, '');
			break;
	}
	this.processCloud();
	console.log(this.awis());
  }

  public generateCloud() {
  	let layers = Math.round(Math.random() * 3);
	let alts = [ 800, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 7000 ];
	this.wx.cloud = [];
	let coverage = Math.round(Math.random() * 8);
	for (let i = 0; i < layers; i++) {
		let layerI =  Math.round(Math.random() * alts.length);
		let base = alts[layerI];
		let extent = Math.round(Math.random() * 3000);
		let tops = base + extent;
		this.setCloud(base, tops, coverage);
		if (++coverage > 8) {
			return;
		}
	}
  }

  oktasToString(o: number) {
  	if (o >= 8) {
		return 'overcast';
	} else if (o > 4) {
		return 'broken';
	} else if (o > 3) {
		return 'scattered';
	} else if (o > 1) {
		return 'few';
	} else if (o > 0) {
		return 'isolated';
	}
	return ''
  }

  public visAsString(): string {
  	let v = this.stNumber(this.wx.vis.max) + ' metres';
  	if (this.wx.vis.max === 9999) {
		v = 'greater than ten kilometres';
	} else if (this.wx.vis.max > 5000) {
		v = this.stNumber(this.wx.vis.max / 1000) + ' kilometres';
	}

	if (this.wx.vis.max > this.wx.vis.min) {
		v += ' reducing to ';
  		if (this.wx.vis.min === 9999) {
			v += ' greater than ten kilometres';
			} else if (this.wx.vis.min > 5000) {
			v += this.stNumber(this.wx.vis.min / 1000) + ' kilometres';
		} else {
			v += this.stNumber(this.wx.vis.min) + ' metres';
		}
		v += ' ' + this.wx.vis.comment;
	}
	return v;
   }

   stNumber(n: number) : string {
   	if (n === undefined) {
		return '';
	}
        let digits: string[] = n.toString().split('');
   	if (n >= 1000) {
		let nst = this.toNumbers(Number(digits[0])) + ' thousand';
		if (digits[1] !== '0') {
			nst += ' ' + this.toNumbers(Number(digits[1])) + ' hundred';
		}
		return nst;
		
	} else if (n >= 100) {
		let nst = this.toNumbers(Number(digits[0])) + ' hundred';
		return nst;
	} else {
		let nst = this.toNumbers(n);
	}
  }

  public awis() : string {
	let st = "wind: " + this.windAsString() + "  QNH " + this.wx.qnh + ", Temperature " + this.wx.temp + " dewpoint " + this.wx.dewpoint + ", visibility " + this.visAsString() + " " + this.wx.groundCondition + " cloud " + this.cloudAsString() + " " + this.weatherAsString() + "\n\n";
	return st;
  }

  processCloud() {
  	let c: any = {};
  	for (let i = 0; i < this.wx.cloud.length; i++) {
		let cloud: Cloud = this.wx.cloud[i];
		c[cloud.base] = cloud;
	}
	this.wx.cloud = [];
	let alts = Object.keys(c).sort();
	for (let i = 0; i < alts.length; i++) {
		this.wx.cloud.push(c[alts[i]]);
	}
  }

  windAsString(): string {
	  if (this.wx.windStrength === 0) {
	  	return 'calm';
	  } else if (this.wx.windStrength <= 4) {
	  	return 'variable';
	  }
	  let st = '';
	  if (this.wx.windDirectionVariation > 0) {
        	let windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation % 360);
	  	st = 'varying between ' + this.toNumbers(this.wx.windDirection) + ' and ' + this.toNumbers(windDirTo);
	  } else {
	  	st = this.toNumbers(this.wx.windDirection);
	  }
	  st += ' degrees, ';
	  if (this.wx.windGustStrength > this.wx.windStrength) {
	  	st += ' minimum ' + this.toNumbers(this.wx.windStrength) + ' maximum ' + this.toNumbers(this.wx.windGustStrength)  + ' knots'
	  } else {
	  	st += ' ' + this.toNumbers(this.wx.windStrength) + ' knots'
	  }
	  return st;
  }

  public visAsShorthand(): string {
  	let v = (this.wx.vis.max).toString() + 'm';
  	if (this.wx.vis.max === 9999) {
	v = '>10k';
	} else if (this.wx.vis.max > 5000) {
		v = (this.wx.vis.max / 1000).toString() + 'k';
	}

	if (this.wx.vis.max > this.wx.vis.min) {
	console.log(this.fonticon.css.mdi['mdi-add']);
		v += "↓";
  		if (this.wx.vis.min === 9999) {
			v += ' >10k';
		} else if (this.wx.vis.min > 5000) {
			v += (this.wx.vis.min / 1000).toString() + 'k';
		} else {
			v += this.wx.vis.min.toString() + 'm';
		}
		v += ' ' + this.wx.vis.comment.toLowerCase();
	}
	return v;
   }

   public shorthand(st: string): string {
   	st = st.replace(/thunderstorms/ig, 'ts');
   	st = st.replace(/showers/ig, 'shwrs');
   	st = st.replace(/ of /ig, ' ');
   	st = st.replace(/rain/ig, 'rn');
   	st = st.replace(/in area/ig, 'area');
   	st = st.replace(/fog/ig, 'fg');
   	st = st.replace(/smoke/ig, 'fu');
   	st = st.replace(/mist/ig, 'br');
   	st = st.replace(/isolated/ig, 'isol');
   	st = st.replace(/broken/ig, 'bkn');
   	st = st.replace(/scattered/ig, 'sct');
   	st = st.replace(/overcast/ig, 'ovc');
	return st;
   }

  public cloudAsShorthand(): string {
  	if (this.wx.cloud.length === 0) {
		return '';
		}
  	else if (this.isCAVOK()) {
		return '';
	} else {
		let st = '';
		for (let i = 0; i < this.wx.cloud.length; i++) {
			let cloud: Cloud = this.wx.cloud[i];
			st += ' ' + this.oktasToString(cloud.coverage) + ' ' + cloud.base;
		}
		st = this.shorthand(st);
		return st;
	}
  }

  public qnhAsShorthand(): string {
  	return 'Q' + this.qnhNumber.toString();
  }

  public wxAsShorthand(): string {
  	let wx = '';
	if (this.wx.wx.length > 0) {
		wx = this.wx.wx.join(', ');
	}
	wx = this.shorthand(wx);
	console.log(wx);
	return wx;
  }

  windAsShorthand(): string {
  	let wind = ''
	  if (this.wx.windStrength === 0) {
	  	return 'wnd clm';
	  } else if (this.wx.windStrength <= 4) {
	  	return 'wnd vbl';
	  }
	  let st = '';
	  if (this.wx.windDirectionVariation > 0) {
        	let windDirTo = (this.wx.windDirection + this.wx.windDirectionVariation % 360);
	  	st = this.wx.windDirection + ' - ' + windDirTo;
	  } else {
	  	st = this.wx.windDirection.toString();
	  }
	  st += '/';
	  if (this.wx.windGustStrength > this.wx.windStrength) {
	  	st += this.wx.windStrength + ' - ' + this.wx.windGustStrength;
	  } else {
	  	st += this.wx.windStrength.toString();
	  }
	  return st;
  }

  isCAVOK() : boolean {
  	return /CAVOK/.test(this.weatherAsString());
  }

  isFOG() : boolean {
	  if (/FOG IN AREA/.test(this.weatherAsString())) {
	  	return false;
	  };
  	  return /FOG/.test(this.weatherAsString());
  }

  isRVFR() : boolean {
  	if ((this.wx.vis.min <= 5000) && (this.wx.vis.min >= 1600)) {
		return true;
	}
	return false;
  }

  isVFR() : boolean {
  	if (this.isRVFR()) {
		return true;
	}
  	if (this.wx.vis.min <= 5000) {
		return false;
	}
	let clouds = this.wx.cloud;
	let coverage = 0;
	for (let i = 0; i < clouds.length; i++) {
		let c = clouds[i];
		if (c.base < 1800) {
			coverage += c.coverage;
		}
	}
	if (coverage >= 2) {
		return false;
	}
	return true;
  }
  
  isIMC() : boolean {
  	if (this.wx.vis.min <= 5000) {
		return true;
	}
	let clouds = this.wx.cloud;
	let coverage = 0;
	for (let i = 0; i < clouds.length; i++) {
		let c = clouds[i];
		if (c.base < 1800) {
			coverage += c.coverage;
		}
	}
	if (coverage >= 7) {
		return true;
	}
	return false;
  }

  cloudAsString() : string {
  	if (this.wx.cloud.length === 0) {
		return 'nil';
	} else {
		let st = '';
		for (let i = 0; i < this.wx.cloud.length; i++) {
			let cloud: Cloud = this.wx.cloud[i];
			st += ' ' + this.oktasToString(cloud.coverage) + ' ' + this.stNumber(cloud.base);
		}
		return st;
	}
  }

  weatherAsString() : string {
  	if (this.wx.wx.length === 0) {
		return '';
	} else {
		return this.wx.wx.join(', ');
	}
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
