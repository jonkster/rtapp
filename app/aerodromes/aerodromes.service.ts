import { Injectable } from '@angular/core';
import { Weather, Cloud } from '../weather/weather.interface';


@Injectable()
export class AerodromesService {

  private specs: string = '';

  private knownAds: any = {
  	'YSSY': {
		name: 'Sydney',
		services: ['tower', 'ground', 'approach'],
		allowSpecialVFR: false,
		circuitsLikely: false,
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
		runways: [
			{
				'name': 'three four left and right',
				'sname': '34L and 34R',
				'dir': 340,
				'extra': 'for arrivals and departures parallel runway operations in progress independent departures in progress'
			},
			{
				'name': 'one six left and right',
				'sname': '16L and 16R',
				'dir': 160,
				'extra': 'for arrivals and departures parallel runway operations in progress independent departures in progress'
			}
		]
	},
  	'YSCN': {
		name: 'Camden',
		services: ['tower', 'ground'],
		allowSpecialVFR: true,
		circuitsLikely: true,
		localSpecialities: [
			{ item: 'Gliding operations in progress',
				wxConditions: 'VFR',
				runways: '*',
			       	prob: 0.50
			}
		],
		runways: [
			{
				'name': 'zero six',
				'sname': '06',
				'dir': 60,
				'extra': 'for arrivals and departures'
			},
			{
				'name': 'two four',
				'sname': '24',
				'dir': 240,
				'extra': 'right hand circuits for arrivals and departures'
			},
			{
				'name': 'one zero',
				'sname': '10',
				'dir': 110,
				'extra': 'in use'
			},
			{
				'name': 'two eight',
				'sname': '28',
				'dir': 280,
				'extra': 'in use'
			}
		]
	},
  	'YSCB': {
		name: 'Canberra',
		services: ['tower', 'ground', 'approach'],
		allowSpecialVFR: false,
		circuitsLikely: true,
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
		runways: [
			{
				'name': 'three fife',
				'sname': '35',
				'dir': 350,
				'extra': 'for arrivals and departures'
			},
			{
				'name': 'one seffen',
				'sname': '17',
				'dir': 170,
				'extra': 'for arrivals and departures'
			},
			{
				'name': 'three zero',
				'sname': '30',
				'dir': 300,
				'extra': 'for arrivals and departures'
			},
			{
				'name': 'one two',
				'sname': '12',
				'dir': 120,
				'extra': 'for arrivals and departures'
			}
		]
	},
  	'YSBK': {
		name: 'Bankstown',
		services: ['tower', 'ground'],
		allowSpecialVFR: true,
		circuitsLikely: true,
		localSpecialities: [],
		runways: [
			{
				'name': 'one one left and one one centre',
				'sname': '11L and 11C',
				'dir': 110,
				'extra': 'for arrivals and departures frequency one three two decimal eight'
			},
			{
				'name': 'one one right',
				'sname': '11R',
				'dir': 110,
				'extra': 'for circuit training right hand circuits frequency one two three decimal six'
			},
			{
				'name': 'two niner right and two niner centre',
				'sname': '29R and 29C',
				'dir': 290,
				'extra': 'for arrivals and departures right hand circuits frequency one three two decimal eight'
			},
			{
				'name': 'two niner left',
				'sname': '29L',
				'dir': 290,
				'extra': 'for circuit training frequency one two three decimal six'
			}
		]
	}
  }

  private ad: string = 'YSCN';
  private windDir: number = 0;
  private windStrength: number = 0;
  private wx: Weather = {} as any;
  private rcount: number = 0;
  private maxXwind: number = 0;
  private arrivals = '';
  private departures = '';
  private circuits = '';
  private circuitsLikely: boolean = false;
  private noCircuits: boolean = false;

  constructor() { }

  setAd(ad: string) {
  	this.ad = ad;
  	this.circuitsLikely = this.knownAds[this.ad].circuitsLikely;
  	this.maxXwind = 0;
	this.arrivals = '';
	this.departures = '';
	this.circuits = '';
  	this.rcount = 0;
  	this.windDir = 0;
	this.windStrength = 0;
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
  	this.maxXwind = 0;
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

  getActiveRunways() : string {
	let rwysSt: string[] = [];
  	let rwys = this.knownAds[this.ad].runways;
	this.arrivals = this.departures = this.circuits = '';
  	this.maxXwind = 0;
	for (let i = 0; i < rwys.length; i++) {
		let rwy = rwys[i];
		let relAng = Math.abs(rwy.dir - this.windDir);
		if (relAng > 180) {
			relAng = 360 - relAng;
		}
		if (relAng < 90) {
			let st = 'runway ' + rwy.name;
			if (rwy.extra !== '') {
				st += ' ' + rwy.extra;
			}
			if (st.match(/arrival/i)) {
				this.arrivals = rwy.sname;
			}
			if (st.match(/departure/i)) {
				this.departures = rwy.sname;
			}
			if (st.match(/circuits/i)) {
				this.circuits = rwy.sname;
			}
			
			rwysSt.push(st);
			let xw = this.getXWind(rwy.dir, this.windDir, this.windStrength);
			if (xw > this.maxXwind) {
				this.maxXwind = xw;
			}
		}
	}
	if ((this.circuits === '') && (this.circuitsLikely) && (! this.noCircuits)) {
		this.circuits = this.arrivals;
	}
	if (this.noCircuits) {
		this.circuits = '';
	}
	this.rcount = rwysSt.length;
	return rwysSt.join(', ');
  }

  getCircuitsLikely(): boolean {
  	return this.circuitsLikely;
  }

  getXWind(rwyDir, windDir, windStrength): number {
  	let relAng = Math.abs(rwyDir - windDir);
	if (relAng > 180) {
		relAng = 360 - relAng;
	}
	let xWind = Math.round(Math.abs(windStrength * Math.sin(Math.PI * relAng/180)));
	return xWind;
  }

  getMaxXwindAsShorthand(): string {
  	if (this.maxXwind >= 7) {
  		return 'xw' + this.maxXwind.toString();
	} else {
  		return '';
	}
  }

  getMaxXwind(): number {
  	return this.maxXwind;
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
