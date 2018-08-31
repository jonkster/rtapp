import { Injectable } from '@angular/core';
import { Weather, Cloud } from '../weather/weather.interface';
import { WeatherService } from '../weather/weather.service';


@Injectable()
export class AerodromesService {

  private specs: string = '';

  private knownAds: any = {
  	'YSSY': {
		name: 'Sydney',
		services: ['tower', 'ground', 'approach'],
		imcApproach: 'ILS approach',
		allowSpecialVFR: false,
		circuitsLikely: false,
		runways: ['16L, 16R', '34L, 34R', '07', '25'],
		localSpecialities: [
			{
	       			item: 'Cumulonimbus and lightning observed to the south. waterspout observed to east',
				wxConditions: 'thunderstorms',
				runways: '*',
				prob: 0.05
			},
			{
				item: 'between time zero two zero zero and time zero four one fife expect minor delays due Aerodrome Emergency Personnel exercise in progress',
				wxConditions: '*',
				runways: '*',
				prob: 0.02
			},
			{
				item: 'curfew restrictions apply from one two four five, arrivals runway three for left after one three zero zero, all departures one six direction after one two four five',
				wxConditions: '*',
				runways: '*',
				prob: 0.10
			},
			{
				item: 'DOMESTIC JET DEPartures VIA wollongong expect runway one six left',
				wxConditions: '*',
				runways: 'one six left and right',
				prob: 0.40
			},
		],
		runwayLogic: function(winddir: number, windstrength: number, service: any): [string, string, string] { 
			let rwy = '';
			let std = 'for arrivals and departures';
			let stdParallel = 'parallel simultaneous runway operations in progress independent departures in progress';
			let wind = [0, 0];
			let r = '';
			let rShorthand = '';
			if (service.rwyWindOK(160, winddir, windstrength, 20, -5)) {
				rShorthand = "16L and 16R for arrivals and departures";
				r = "one six left and right";
				rwy = "runways " + r + " " + std + ' ' + stdParallel;
				wind = service.getXTWind(160, winddir, windstrength);
				service.arrivals = '16L, 16R';
				service.departures = '16L, 16R';
				service.circuits = '';
			} else if (service.rwyWindOK(340, winddir, windstrength, 20, -5)) {
				rShorthand = "34L and 34R for arrivals and departures";
				r = "three four left and right";
				rwy = "runways " + r + " " + std + ' ' + stdParallel;
				wind = service.getXTWind(340, winddir, windstrength);
				service.arrivals = '34L, 34R';
				service.departures = '34L, 34R';
				service.circuits = '';
			} else if (service.rwyWindOK(70, winddir, windstrength, 20, -5)) {
				rShorthand = "07 for arrivals and departures";
				r = "zero seven";
				rwy = "runway " + r + " " + std;
				wind = service.getXTWind(70, winddir, windstrength);
				service.arrivals = '07';
				service.departures = '07';
				service.circuits = '';
			} else if (service.rwyWindOK(250, winddir, windstrength, 20, -5)) {
				rShorthand = "25 for arrivals and departures";
				r = "two five";
				rwy = "runway " + r + " " + std;
				wind = service.getXTWind(250, winddir, windstrength);
				service.arrivals = '25';
				service.departures = '25';
				service.circuits = '';
			} else {
				rShorthand = "16L and 16R for arrivals and departures";
				r = "one six left and right";
				rwy = "runways " + r + " " + std + ' ' + stdParallel;
				wind = service.getXTWind(160, winddir, windstrength);
				service.arrivals = '16L, 16R';
				service.departures = '16L, 16R';
				service.circuits = '';
			}
			service.maxXwind = [0, service.arrivals];
			service.maxTwind = [0, service.arrivals];
			if (wind[0] > 12) {
  				service.maxXwind = [wind[0], service.arrivals];
			}
			if (wind[1] < 0) {
  				service.maxTwind = [Math.abs(wind[0]), service.arrivals];
			}
			return [r, rwy, rShorthand];
	       	}
	},
  	'YSCN': {
		name: 'Camden',
		services: ['tower', 'ground'],
		imcApproach: 'instrument approach',
		allowSpecialVFR: true,
		circuitsLikely: true,
		runways: ['06', '24', '10', '28'],
		localSpecialities: [
			{ item: 'Gliding operations in progress',
				wxConditions: 'VFR',
				runways: '*',
			       	prob: 0.50
			}
		],
		runwayLogic: function(winddir: number, windstrength: number, service: any): [string, string, string] { 
			let rwy = '';
			let wind = [0, 0];
			let r = '';
			let rShorthand = '';
			if (service.rwyWindOK(60, winddir, windstrength, 8, -3)) {
				rShorthand = "06";
				r = "zero six";
				rwy = "runway " + r;
				wind = service.getXTWind(60, winddir, windstrength);
				service.arrivals = '06';
				service.departures = '06';
				service.circuits = '06';
			} else if (service.rwyWindOK(240, winddir, windstrength, 8, -3)) {
				rShorthand = "24";
				r = "two four";
				rwy = "runway " + r;
				wind = service.getXTWind(240, winddir, windstrength);
				service.arrivals = '24';
				service.departures = '24';
				service.circuits = '24';
			} else if (service.rwyWindOK(100, winddir, windstrength, 8, -3)) {
				rShorthand = "10";
				r = "one zero";
				rwy = "runway " + r;
				wind = service.getXTWind(100, winddir, windstrength);
				service.arrivals = '10';
				service.departures = '10';
				service.circuits = '10';
			} else if (service.rwyWindOK(280, winddir, windstrength, 8, -3)) {
				rShorthand = "28";
				r = "two eight";
				rwy = "runway " + r;
				wind = service.getXTWind(280, winddir, windstrength);
				service.arrivals = '28';
				service.departures = '28';
				service.circuits = '28';
			} else {
				rShorthand = "06";
				r = "zero six";
				rwy = "runway " + r;
				wind = service.getXTWind(60, winddir, windstrength);
				service.arrivals = '06';
				service.departures = '06';
				service.circuits = '06';
			}
			service.maxXwind = [0, service.arrivals];
			service.maxTwind = [0, service.arrivals];
			if (wind[0] > 8) {
  				service.maxXwind = [wind[0], service.arrivals];
			}
			if (wind[1] < 0) {
  				service.maxTwind = [Math.abs(wind[0]), service.arrivals];
			}
			return [r, rwy, rShorthand];
		}
	},
  	'YSCB': {
		name: 'Canberra',
		services: ['tower', 'ground', 'approach'],
		imcApproach: 'instrument approach',
		allowSpecialVFR: false,
		circuitsLikely: true,
		runways: ['17', '35', '30', '12'],
		localSpecialities: [
			{
	       			item: 'SIGMET CURRENT FOR SEVere TURBulence forecast between ten thousand feet and flight level two four zero',
				wxConditions: '*',
				runways: '*',
				prob: 0.15
			},
			{
				item: 'MEN and HAND TOOLS OPERATING TO THE EDGE OF runway one seffen',
				wxConditions: '*',
				runways: 'one seffen',
				prob: 0.20
			},
			{
				item: 'MEN and HAND TOOLS OPERATING TO THE EDGE OF runway three fife',
				wxConditions: '*',
				runways: 'three fife',
				prob: 0.20
			}
		],
		runwayLogic: function(winddir: number, windstrength: number, service: any): [string, string, string] { 
			let rwy = '';
			let wind = [0, 0];
			let r = '';
			let rShorthand = '';
			if (service.rwyWindOK(350, winddir, windstrength, 8, -3)) {
				rShorthand = "35 for arrivals and departures";
				r = "three five";
				rwy = "runway " + r;
				wind = service.getXTWind(350, winddir, windstrength);
				service.arrivals = '35';
				service.departures = '35';
			} else if (service.rwyWindOK(170, winddir, windstrength, 8, -3)) {
				rShorthand = "17 for arrivals and departures";
				r = "one seven";
				rwy = "runway " + r;
				wind = service.getXTWind(170, winddir, windstrength);
				service.arrivals = '17';
				service.departures = '17';
			} else if (service.rwyWindOK(300, winddir, windstrength, 8, -3)) {
				rShorthand = "30 for arrivals and departures";
				r = "three zero";
				rwy = "runway " + r;
				wind = service.getXTWind(300, winddir, windstrength);
				service.arrivals = '30';
				service.departures = '30';
			} else if (service.rwyWindOK(120, winddir, windstrength, 8, -3)) {
				rShorthand = "12 for arrivals and departures";
				r = "one two";
				rwy = "runway " + r;
				wind = service.getXTWind(120, winddir, windstrength, 8, -3);
				service.arrivals = '12';
				service.departures = '12';
			} else {
				rShorthand = "35 for arrivals and departures";
				r = "three five";
				rwy = "runway " + r;
				wind = service.getXTWind(350, winddir, windstrength);
				service.arrivals = '35';
				service.departures = '35';
			}
			service.circuits = service.arrivals;
			if (service.rwyWindOK(120, winddir, windstrength, 8, -3)) {
				service.circuits = '12';
				rwy += " runway one two in use";
			} else if (service.rwyWindOK(300, winddir, windstrength, 8, -3)) {
				service.circuits = '30';
				rwy += " runway three zero in use";
			}

			service.maxXwind = [0, service.arrivals];
			service.maxTwind = [0, service.arrivals];
			if (wind[0] > 12) {
  				service.maxXwind = [wind[0], service.arrivals];
			}
			if (wind[1] < 0) {
  				service.maxTwind = [Math.abs(wind[0]), service.arrivals];
			}
			return [r, rwy, rShorthand];
		}
	},
  	'YSBK': {
		name: 'Bankstown',
		services: ['tower', 'ground'],
		imcApproach: 'instrument approach',
		allowSpecialVFR: true,
		circuitsLikely: true,
		runways: ['29L', '29R, 29C', '11R', '11L, 11C'],
		localSpecialities: [],
		runwayLogic: function(winddir: number, windstrength: number, service: any): [string, string, string] { 
			let rwy = '';
			let wind = [0, 0];
			let r = '';
			let rShorthand = '';
			if (service.rwyWindOK(290, winddir, windstrength, 8, -3)) {
				rShorthand = "29R and 29C for arrivals and departures 29L for circuit training";
				r = "two niner right and two niner centre for arrivals and departures two niner left for circuit training";
				rwy = "runway " + r;
				wind = service.getXTWind(290, winddir, windstrength);
				service.arrivals = '29R, 29C';
				service.departures = '29R, 29C';
				service.circuits = '29L';
			} else if (service.rwyWindOK(110, winddir, windstrength, 8, -3)) {
				rShorthand = "11L and 11C for arrivals and departures 11R for circuit training";
				r = "one one left and one one centre for arrivals and departures one one right for circuit training";
				rwy = "runway " + r;
				wind = service.getXTWind(110, winddir, windstrength);
				service.arrivals = '11L, 11C';
				service.departures = '11L, 11C';
				service.circuits = '11R';
			} else {
				r = "two niner right and centre for arrivals and departures two niner left for circuit training";
				rShorthand = "29R and 29C for arrivals and departures 29L for circuit training";
				rwy = "runway " + r;
				wind = service.getXTWind(290, winddir, windstrength);
				service.arrivals = '29R, 29C';
				service.departures = '29R, 29C';
				service.circuits = '29L';
			}
			service.maxXwind = [0, service.arrivals];
			service.maxTwind = [0, service.arrivals];
			if (wind[0] > 12) {
  				service.maxXwind = [wind[0], service.arrivals];
			}
			if (wind[1] < 0) {
  				service.maxTwind = [Math.abs(wind[0]), service.arrivals];
			}
			return [r, rwy, rShorthand];
		}
	}
  }

  private ad: string = 'YSCN';
  private windDir: number = 0;
  private windStrength: number = 0;
  private wx: Weather = {} as any;
  private rcount: number = 0;
  private maxXwind: [number, string] = [0, ''];
  private maxTwind: [number, string] = [0, ''];
  private arrivals = '';
  private departures = '';
  private circuits = '';
  private circuitsLikely: boolean = false;
  private noCircuits: boolean = false;
  private currentAd: any;
  private rwyShorthand: string = '';

  constructor(private weatherService: WeatherService) { }

  setAd(ad: string) {
  	this.ad = ad;
	this.currentAd = this.knownAds[this.ad];
  	this.circuitsLikely = this.knownAds[this.ad].circuitsLikely;
	this.arrivals = '';
	this.departures = '';
	this.circuits = '';
  	this.rcount = 0;
  	this.windDir = 0;
	this.windStrength = 0;
  }

  getApproach(): string {
	if (this.weatherService.isIMC()) {
		return this.currentAd['imcApproach'];
	}
  	return '';
  }

  getRunwaySurface(): string {
	return this.weatherService.getGroundCondition();
  }

  getRunwayOperations(): string {
  	return '-x-';
  }

  getHolding(): string {
  	return '-x-';
  }

  setWind(windDir: number, windStrength: number) {
  	this.windDir = windDir;
  	this.windStrength = windStrength;
	if (this.windDir === 0) {
		this.windDir = 360;
	}
  }

  setWx(wx: Weather) {
  	this.wx = wx;
	this.arrivals = '';
	this.departures = '';
	this.circuits = '';
  	this.rcount = 0;
  	this.windDir = 0;
	this.windStrength = 0;
  	this.noCircuits = false;
  }

  getName() {
  	return this.knownAds[this.ad].name;
  }

  getAllowSpecialVFR(): boolean {
  	return this.knownAds[this.ad].allowSpecialVFR;
  }

  getArrivalRunway() : string {
  	return this.arrivals;
  }
  getDepartureRunway() : string {
  	return this.departures;
  }
  getCircuitRunway() : string {
  	return this.circuits;
  }

  getCurrentOther(): string {
  	return this.specs;
  }

  getSpecialities() : string[] {
  	let res: string[] = [];
  	let specs = this.knownAds[this.ad].localSpecialities;
	for (let i = 0; i < specs.length; i++) {
		let spec = specs[i];
		if (Math.random() < spec.prob) {
			if ((spec.wxConditions === '*') || (this.weatherHas(spec.wxConditions))) {
				if ((spec.runways === '*') || (this.runwaysMatch(spec.runways))) {
					res.push(spec.item);
				}
			}
		}
	}
	this.specs = this.shorthand(res.join(', '));
	return res;
  }

  shorthand(st: string) : string {
  	st = st.replace(/domestic/ig, 'dom');
  	st = st.replace(/domestic/ig, 'ccts');
  	st = st.replace(/departures/ig, 'deps');
  	st = st.replace(/arrivals/ig, 'arr');
  	st = st.replace(/wollongong/ig, 'WOL');
  	st = st.replace(/expect/ig, 'xpt');
  	st = st.replace(/runway/ig, 'rwy');
  	st = st.replace(/one/ig, '1');
  	st = st.replace(/two/ig, '2');
  	st = st.replace(/three/ig, '3');
  	st = st.replace(/for/ig, '4');
  	st = st.replace(/four/ig, '4');
  	st = st.replace(/five/ig, '5');
  	st = st.replace(/fife/ig, '5');
  	st = st.replace(/six/ig, '6');
  	st = st.replace(/seven/ig, '7');
  	st = st.replace(/seffen/ig, '7');
  	st = st.replace(/eight/ig, '8');
  	st = st.replace(/niner/ig, '9');
  	st = st.replace(/zero/ig, '0');
  	st = st.replace(/left/ig, 'L');
  	st = st.replace(/right/ig, 'R');
	return st;
  }

  setNoCircuits(v: boolean) {
  	this.noCircuits = v;
  }

  weatherHas(wx: string) : boolean {
  	if (this.wx.wx === undefined) {
		return false;
	}
	let regExp = new RegExp(wx, 'i');
	return regExp.test(this.wx.wx.join(','));
  }

  runwaysMatch(rwy: string) : boolean {
  	let rwys = this.getActiveRunways();
	let regExp = new RegExp(rwy, 'i');
	return regExp.test(rwys);
  }

  getRunways() : string[] {
  	let rwys = this.knownAds[this.ad].runways;
	let rwyArray = [];
	for (let i = 0; i < rwys.length; i++) {
		rwyArray.push(rwys[i].sname);
	}
	return rwyArray;
  }

  multipleRunways() : boolean {
  	this.getActiveRunways();
	return this.rcount > 1;
  }

  getKnownAds() {
  	return Object.keys(this.knownAds);
  }

  getRelAngle(rwyAng: number, windAng: number): number {
	  let relAng = Math.abs(rwyAng - windAng);
	  if (relAng > 180) {
		  relAng = 360 - relAng;
	  }
	  return relAng;
  }

  getRunwayShorthand(): string {
	return this.rwyShorthand;
  }

  getActiveRunwaysAsText() : string {
	let rwys = this.currentAd.runwayLogic(this.windDir, this.windStrength, this);
  	return rwys[2];
  }

  getActiveRunways() : string {
	this.arrivals = this.departures = this.circuits = '';
  	let rwys = this.currentAd.runwayLogic(this.windDir, this.windStrength, this);
	this.rwyShorthand = this.shorthand(rwys[1]);
	return rwys[1];
  }

  getCircuitsLikely(): boolean {
  	return this.circuitsLikely;
  }

  rwyWindOK(rwyDir: number, windDir: number, windStrength: number, maxX: number, maxT: number): boolean {
        let wind = this.getXTWind(rwyDir, windDir, windStrength);
  	return (wind[0] < maxX && wind[1] > maxT );
  }

  getXTWind(rwyDir, windDir, windStrength): [number, number] {
  	let xw = this.getXWind(rwyDir, windDir, windStrength);
  	let tw = this.getTWind(rwyDir, windDir, windStrength);
	return [xw, tw];
  }

  getTWind(rwyDir, windDir, windStrength): number {
  	let relAng = Math.abs(rwyDir - windDir);
	let tWind = Math.round(windStrength * Math.cos(Math.PI * relAng/180));
	return tWind;
  }
  getXWind(rwyDir, windDir, windStrength): number {
  	let relAng = Math.abs(rwyDir - windDir);
	if (relAng > 180) {
		relAng = 360 - relAng;
	}
	let xWind = Math.abs(Math.round(Math.abs(windStrength * Math.sin(Math.PI * relAng/180))));
	return xWind;
  }

  getMaxTwindAsText(): string {
  	if (this.maxTwind[0] > 0) {
  		return 'maximum tailwind ' + this.maxTwind[0].toString() + ' knots runway ' + this.maxTwind[1];
	} else {
  		return '';
	}
  }

  getMaxXwindAsText(): string {
  	if (this.maxXwind[0] > 0) {
  		return 'maximum crosswind ' + this.maxXwind[0].toString() + ' knots runway ' + this.maxXwind[1];
	} else {
  		return '';
	}
  }

  getMaxXwindAsShorthand(): string {
  	if (this.maxXwind[0] > 0) {
  		return 'xw' + this.maxXwind[0].toString() + ' r' + this.maxXwind[1];
	} else {
  		return '';
	}
  }

  getMaxXwind(): [number, string] {
  	return this.maxXwind;
  }

  getMaxTwindAsShorthand(): string {
  	if (this.maxTwind[0] > 0) {
  		return 'tw' + this.maxTwind[0].toString() + ' r' + this.maxTwind[1];
	} else {
  		return '';
	}
  }

  getMaxTwind(): [number, string] {
  	return this.maxTwind;
  }

  servicesAsString(): string {
  	let services = this.knownAds[this.ad].services;
	let stA = [];
	for (let i = 0; i < services.length - 1; i++) {
		stA.push(services[i]);
	}
	let st = stA.join(', ');
	st += ' or ' + services[services.length - 1];
  	return st;
  }
}
