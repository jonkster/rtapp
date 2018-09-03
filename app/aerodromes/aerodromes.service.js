"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var weather_service_1 = require("../weather/weather.service");
var AerodromesService = /** @class */ (function () {
    function AerodromesService(weatherService) {
        this.weatherService = weatherService;
        this.specs = '';
        this.knownAds = {
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
                runwayLogic: function (winddir, windstrength, service) {
                    var rwy = '';
                    var std = 'for arrivals and departures';
                    var stdParallel = 'parallel simultaneous runway operations in progress independent departures in progress';
                    var wind = [0, 0];
                    var r = '';
                    var rShorthand = '';
                    if (service.rwyWindOK(160, winddir, windstrength, 20, -5)) {
                        rShorthand = "16L and 16R for arrivals and departures";
                        r = "one six left and right";
                        rwy = "runways " + r + " " + std + ' ' + stdParallel;
                        wind = service.getXTWind(160, winddir, windstrength);
                        service.arrivals = '16L, 16R';
                        service.departures = '16L, 16R';
                        service.circuits = '';
                    }
                    else if (service.rwyWindOK(340, winddir, windstrength, 20, -5)) {
                        rShorthand = "34L and 34R for arrivals and departures";
                        r = "three four left and right";
                        rwy = "runways " + r + " " + std + ' ' + stdParallel;
                        wind = service.getXTWind(340, winddir, windstrength);
                        service.arrivals = '34L, 34R';
                        service.departures = '34L, 34R';
                        service.circuits = '';
                    }
                    else if (service.rwyWindOK(70, winddir, windstrength, 20, -5)) {
                        rShorthand = "07 for arrivals and departures";
                        r = "zero seven";
                        rwy = "runway " + r + " " + std;
                        wind = service.getXTWind(70, winddir, windstrength);
                        service.arrivals = '07';
                        service.departures = '07';
                        service.circuits = '';
                    }
                    else if (service.rwyWindOK(250, winddir, windstrength, 20, -5)) {
                        rShorthand = "25 for arrivals and departures";
                        r = "two five";
                        rwy = "runway " + r + " " + std;
                        wind = service.getXTWind(250, winddir, windstrength);
                        service.arrivals = '25';
                        service.departures = '25';
                        service.circuits = '';
                    }
                    else {
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
                runwayLogic: function (winddir, windstrength, service) {
                    var rwy = '';
                    var wind = [0, 0];
                    var r = '';
                    var rShorthand = '';
                    if (service.rwyWindOK(60, winddir, windstrength, 8, -3)) {
                        rShorthand = "06";
                        r = "zero six";
                        rwy = "runway " + r;
                        wind = service.getXTWind(60, winddir, windstrength);
                        service.arrivals = '06';
                        service.departures = '06';
                        service.circuits = '06';
                    }
                    else if (service.rwyWindOK(240, winddir, windstrength, 8, -3)) {
                        rShorthand = "24";
                        r = "two four";
                        rwy = "runway " + r;
                        wind = service.getXTWind(240, winddir, windstrength);
                        service.arrivals = '24';
                        service.departures = '24';
                        service.circuits = '24';
                    }
                    else if (service.rwyWindOK(100, winddir, windstrength, 8, -3)) {
                        rShorthand = "10";
                        r = "one zero";
                        rwy = "runway " + r;
                        wind = service.getXTWind(100, winddir, windstrength);
                        service.arrivals = '10';
                        service.departures = '10';
                        service.circuits = '10';
                    }
                    else if (service.rwyWindOK(280, winddir, windstrength, 8, -3)) {
                        rShorthand = "28";
                        r = "two eight";
                        rwy = "runway " + r;
                        wind = service.getXTWind(280, winddir, windstrength);
                        service.arrivals = '28';
                        service.departures = '28';
                        service.circuits = '28';
                    }
                    else {
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
                runwayLogic: function (winddir, windstrength, service) {
                    var rwy = '';
                    var wind = [0, 0];
                    var r = '';
                    var rShorthand = '';
                    if (service.rwyWindOK(350, winddir, windstrength, 8, -3)) {
                        rShorthand = "35 for arrivals and departures";
                        r = "three five";
                        rwy = "runway " + r;
                        wind = service.getXTWind(350, winddir, windstrength);
                        service.arrivals = '35';
                        service.departures = '35';
                    }
                    else if (service.rwyWindOK(170, winddir, windstrength, 8, -3)) {
                        rShorthand = "17 for arrivals and departures";
                        r = "one seven";
                        rwy = "runway " + r;
                        wind = service.getXTWind(170, winddir, windstrength);
                        service.arrivals = '17';
                        service.departures = '17';
                    }
                    else if (service.rwyWindOK(300, winddir, windstrength, 8, -3)) {
                        rShorthand = "30 for arrivals and departures";
                        r = "three zero";
                        rwy = "runway " + r;
                        wind = service.getXTWind(300, winddir, windstrength);
                        service.arrivals = '30';
                        service.departures = '30';
                    }
                    else if (service.rwyWindOK(120, winddir, windstrength, 8, -3)) {
                        rShorthand = "12 for arrivals and departures";
                        r = "one two";
                        rwy = "runway " + r;
                        wind = service.getXTWind(120, winddir, windstrength, 8, -3);
                        service.arrivals = '12';
                        service.departures = '12';
                    }
                    else {
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
                    }
                    else if (service.rwyWindOK(300, winddir, windstrength, 8, -3)) {
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
                runwayLogic: function (winddir, windstrength, service) {
                    var rwy = '';
                    var wind = [0, 0];
                    var r = '';
                    var rShorthand = '';
                    if (service.rwyWindOK(290, winddir, windstrength, 8, -3)) {
                        rShorthand = "29R and 29C for arrivals and departures frequency 132.8 29L for circuit training frequency 123.6";
                        r = "two niner right and two niner centre for arrivals and departures two niner left for circuit training";
                        rwy = "runway " + r;
                        wind = service.getXTWind(290, winddir, windstrength);
                        service.arrivals = '29R, 29C';
                        service.departures = '29R, 29C';
                        service.circuits = '29L';
                    }
                    else if (service.rwyWindOK(110, winddir, windstrength, 8, -3)) {
                        rShorthand = "11L and 11C for arrivals and departures frequency 132.8 11R for circuit training frequency 123.6";
                        r = "one one left and one one centre for arrivals and departures one one right for circuit training";
                        rwy = "runway " + r;
                        wind = service.getXTWind(110, winddir, windstrength);
                        service.arrivals = '11L, 11C';
                        service.departures = '11L, 11C';
                        service.circuits = '11R';
                    }
                    else {
                        rShorthand = "29R and 29C for arrivals and departures frequency 132.8 29L for circuit training frequency 123.6";
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
        };
        this.ad = 'YSCN';
        this.windDir = 0;
        this.windStrength = 0;
        this.wx = {};
        this.rcount = 0;
        this.maxXwind = [0, ''];
        this.maxTwind = [0, ''];
        this.arrivals = '';
        this.departures = '';
        this.circuits = '';
        this.circuitsLikely = false;
        this.noCircuits = false;
        this.rwyShorthand = '';
    }
    AerodromesService.prototype.setAd = function (ad) {
        this.ad = ad;
        this.currentAd = this.knownAds[this.ad];
        this.circuitsLikely = this.knownAds[this.ad].circuitsLikely;
        this.arrivals = '';
        this.departures = '';
        this.circuits = '';
        this.rcount = 0;
        this.windDir = 0;
        this.windStrength = 0;
    };
    AerodromesService.prototype.getApproach = function () {
        if (this.weatherService.isIMC()) {
            return this.currentAd['imcApproach'];
        }
        return '';
    };
    AerodromesService.prototype.getRunwaySurface = function () {
        return this.weatherService.getGroundCondition();
    };
    AerodromesService.prototype.getRunwayOperations = function () {
        if (this.getAllowSpecialVFR()) {
            if (this.weatherService.isRVFR()) {
                return 'restricted vfr operations, special vfr procedures apply';
            }
            if (this.weatherService.isIMC()) {
                return 'control zone closed for vfr operations';
            }
        }
        return '';
    };
    AerodromesService.prototype.getHolding = function () {
        return '-x-';
    };
    AerodromesService.prototype.setWind = function (windDir, windStrength) {
        this.windDir = windDir;
        this.windStrength = windStrength;
        if (this.windDir === 0) {
            this.windDir = 360;
        }
    };
    AerodromesService.prototype.setWx = function (wx) {
        this.wx = wx;
        this.arrivals = '';
        this.departures = '';
        this.circuits = '';
        this.rcount = 0;
        this.windDir = 0;
        this.windStrength = 0;
        this.noCircuits = false;
    };
    AerodromesService.prototype.getName = function () {
        return this.knownAds[this.ad].name;
    };
    AerodromesService.prototype.getAllowSpecialVFR = function () {
        return this.knownAds[this.ad].allowSpecialVFR;
    };
    AerodromesService.prototype.getArrivalRunway = function () {
        return this.arrivals;
    };
    AerodromesService.prototype.getDepartureRunway = function () {
        return this.departures;
    };
    AerodromesService.prototype.getCircuitRunway = function () {
        return this.circuits;
    };
    AerodromesService.prototype.getCurrentOther = function () {
        return this.specs;
    };
    AerodromesService.prototype.getSpecialities = function () {
        var res = [];
        var specs = this.knownAds[this.ad].localSpecialities;
        for (var i = 0; i < specs.length; i++) {
            var spec = specs[i];
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
    };
    AerodromesService.prototype.shorthand = function (st) {
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
    };
    AerodromesService.prototype.setNoCircuits = function (v) {
        this.noCircuits = v;
    };
    AerodromesService.prototype.weatherHas = function (wx) {
        if (this.wx.wx === undefined) {
            return false;
        }
        var regExp = new RegExp(wx, 'i');
        return regExp.test(this.wx.wx.join(','));
    };
    AerodromesService.prototype.runwaysMatch = function (rwy) {
        var rwys = this.getActiveRunways();
        var regExp = new RegExp(rwy, 'i');
        return regExp.test(rwys);
    };
    AerodromesService.prototype.getRunways = function () {
        var rwys = this.knownAds[this.ad].runways;
        var rwyArray = [];
        for (var i = 0; i < rwys.length; i++) {
            rwyArray.push(rwys[i].sname);
        }
        return rwyArray;
    };
    AerodromesService.prototype.multipleRunways = function () {
        this.getActiveRunways();
        return this.rcount > 1;
    };
    AerodromesService.prototype.getKnownAds = function () {
        return Object.keys(this.knownAds);
    };
    AerodromesService.prototype.getRelAngle = function (rwyAng, windAng) {
        var relAng = Math.abs(rwyAng - windAng);
        if (relAng > 180) {
            relAng = 360 - relAng;
        }
        return relAng;
    };
    AerodromesService.prototype.getRunwayShorthand = function () {
        return this.rwyShorthand;
    };
    AerodromesService.prototype.getActiveRunwaysAsText = function () {
        var rwys = this.currentAd.runwayLogic(this.windDir, this.windStrength, this);
        return rwys[2];
    };
    AerodromesService.prototype.getActiveRunways = function () {
        this.arrivals = this.departures = this.circuits = '';
        var rwys = this.currentAd.runwayLogic(this.windDir, this.windStrength, this);
        this.rwyShorthand = this.shorthand(rwys[1]);
        return rwys[1];
    };
    AerodromesService.prototype.getCircuitsLikely = function () {
        return this.circuitsLikely;
    };
    AerodromesService.prototype.rwyWindOK = function (rwyDir, windDir, windStrength, maxX, maxT) {
        var wind = this.getXTWind(rwyDir, windDir, windStrength);
        return (wind[0] < maxX && wind[1] > maxT);
    };
    AerodromesService.prototype.getXTWind = function (rwyDir, windDir, windStrength) {
        var xw = this.getXWind(rwyDir, windDir, windStrength);
        var tw = this.getTWind(rwyDir, windDir, windStrength);
        //console.log('rwy', rwyDir, windDir, '@', windStrength, 'xw=', xw, 'tw=', tw);
        return [xw, tw];
    };
    AerodromesService.prototype.getTWind = function (rwyDir, windDir, windStrength) {
        var relAng = Math.abs(rwyDir - windDir);
        var tWind = Math.round(windStrength * Math.cos(Math.PI * relAng / 180));
        return tWind;
    };
    AerodromesService.prototype.getXWind = function (rwyDir, windDir, windStrength) {
        var relAng = Math.abs(rwyDir - windDir);
        if (relAng > 180) {
            relAng = 360 - relAng;
        }
        var xWind = Math.abs(Math.round(Math.abs(windStrength * Math.sin(Math.PI * relAng / 180))));
        return xWind;
    };
    AerodromesService.prototype.getMaxTwindAsText = function () {
        if (this.maxTwind[0] > 0) {
            return 'maximum tailwind ' + this.maxTwind[0].toString() + ' knots runway ' + this.maxTwind[1];
        }
        else {
            return '';
        }
    };
    AerodromesService.prototype.getMaxXwindAsText = function () {
        if (this.maxXwind[0] > 0) {
            return 'maximum crosswind ' + this.maxXwind[0].toString() + ' knots runway ' + this.maxXwind[1];
        }
        else {
            return '';
        }
    };
    AerodromesService.prototype.getMaxXwindAsShorthand = function () {
        if (this.maxXwind[0] > 0) {
            return 'xw' + this.maxXwind[0].toString() + ' r' + this.maxXwind[1];
        }
        else {
            return '';
        }
    };
    AerodromesService.prototype.getMaxXwind = function () {
        return this.maxXwind;
    };
    AerodromesService.prototype.getMaxTwindAsShorthand = function () {
        if (this.maxTwind[0] > 0) {
            return 'tw' + this.maxTwind[0].toString() + ' r' + this.maxTwind[1];
        }
        else {
            return '';
        }
    };
    AerodromesService.prototype.getMaxTwind = function () {
        return this.maxTwind;
    };
    AerodromesService.prototype.servicesAsString = function () {
        var services = this.knownAds[this.ad].services;
        var stA = [];
        for (var i = 0; i < services.length - 1; i++) {
            stA.push(services[i]);
        }
        var st = stA.join(' ');
        st += ' or ' + services[services.length - 1];
        return st;
    };
    AerodromesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [weather_service_1.WeatherService])
    ], AerodromesService);
    return AerodromesService;
}());
exports.AerodromesService = AerodromesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVyb2Ryb21lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVyb2Ryb21lcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDhEQUE0RDtBQUk1RDtJQWlVRSwyQkFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL1QxQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGFBQVEsR0FBUTtZQUN2QixNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Z0JBQ3pDLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixlQUFlLEVBQUUsS0FBSztnQkFDdEIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDN0MsaUJBQWlCLEVBQUU7b0JBQ2xCO3dCQUNRLElBQUksRUFBRSwrRUFBK0U7d0JBQzVGLFlBQVksRUFBRSxlQUFlO3dCQUM3QixPQUFPLEVBQUUsR0FBRzt3QkFDWixJQUFJLEVBQUUsSUFBSTtxQkFDVjtvQkFDRDt3QkFDQyxJQUFJLEVBQUUsd0lBQXdJO3dCQUM5SSxZQUFZLEVBQUUsR0FBRzt3QkFDakIsT0FBTyxFQUFFLEdBQUc7d0JBQ1osSUFBSSxFQUFFLElBQUk7cUJBQ1Y7b0JBQ0Q7d0JBQ0MsSUFBSSxFQUFFLHNLQUFzSzt3QkFDNUssWUFBWSxFQUFFLEdBQUc7d0JBQ2pCLE9BQU8sRUFBRSxHQUFHO3dCQUNaLElBQUksRUFBRSxJQUFJO3FCQUNWO29CQUNEO3dCQUNDLElBQUksRUFBRSxtRUFBbUU7d0JBQ3pFLFlBQVksRUFBRSxHQUFHO3dCQUNqQixPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxJQUFJLEVBQUUsSUFBSTtxQkFDVjtpQkFDRDtnQkFDRCxXQUFXLEVB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QVEsQ0FBQztRQUNqRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDOUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixFQUFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBemtCVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FrVXlCLGdDQUFjO09BalV2QyxpQkFBaUIsQ0Ewa0I3QjtJQUFELHdCQUFDO0NBQUEsQUExa0JELElBMGtCQztBQTFrQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2VhdGhlciwgQ2xvdWQgfSBmcm9tICcuLi93ZWF0aGVyL3dlYXRoZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFdlYXRoZXJTZXJ2aWNlIH0gZnJvbSAnLi4vd2VhdGhlci93ZWF0aGVyLnNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZXJvZHJvbWVzU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzcGVjczogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBrbm93bkFkczogYW55ID0ge1xuICBcdCdZU1NZJzoge1xuXHRcdG5hbWU6ICdTeWRuZXknLFxuXHRcdHNlcnZpY2VzOiBbJ3Rvd2VyJywgJ2dyb3VuZCcsICdhcHByb2FjaCddLFxuXHRcdGltY0FwcHJvYWNoOiAnSUxTIGFwcHJvYWNoJyxcblx0XHRhbGxvd1NwZWNpYWxWRlI6IGZhbHNlLFxuXHRcdGNpcmN1aXRzTGlrZWx5OiBmYWxzZSxcblx0XHRydW53YXlzOiBbJzE2TCwgMTZSJywgJzM0TCwgMzRSJywgJzA3JywgJzI1J10sXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtcblx0XHRcdHtcblx0ICAgICAgIFx0XHRcdGl0ZW06ICdDdW11bG9uaW1idXMgYW5kIGxpZ2h0bmluZyBvYnNlcnZlZCB0byB0aGUgc291dGguIHdhdGVyc3BvdXQgb2JzZXJ2ZWQgdG8gZWFzdCcsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJ3RodW5kZXJzdG9ybXMnLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMDVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdiZXR3ZWVuIHRpbWUgemVybyB0d28gemVybyB6ZXJvIGFuZCB0aW1lIHplcm8gZm91ciBvbmUgZmlmZSBleHBlY3QgbWlub3IgZGVsYXlzIGR1ZSBBZXJvZHJvbWUgRW1lcmdlbmN5IFBlcnNvbm5lbCBleGVyY2lzZSBpbiBwcm9ncmVzcycsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMDJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdjdXJmZXcgcmVzdHJpY3Rpb25zIGFwcGx5IGZyb20gb25lIHR3byBmb3VyIGZpdmUsIGFycml2YWxzIHJ1bndheSB0aHJlZSBmb3IgbGVmdCBhZnRlciBvbmUgdGhyZWUgemVybyB6ZXJvLCBhbGwgZGVwYXJ0dXJlcyBvbmUgc2l4IGRpcmVjdGlvbiBhZnRlciBvbmUgdHdvIGZvdXIgZml2ZScsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMTBcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdET01FU1RJQyBKRVQgREVQYXJ0dXJlcyBWSUEgd29sbG9uZ29uZyBleHBlY3QgcnVud2F5IG9uZSBzaXggbGVmdCcsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnb25lIHNpeCBsZWZ0IGFuZCByaWdodCcsXG5cdFx0XHRcdHByb2I6IDAuNDBcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRydW53YXlMb2dpYzogZnVuY3Rpb24od2luZGRpcjogbnVtYmVyLCB3aW5kc3RyZW5ndGg6IG51bWJlciwgc2VydmljZTogYW55KTogW3N0cmluZywgc3RyaW5nLCBzdHJpbmddIHsgXG5cdFx0XHRsZXQgcnd5ID0gJyc7XG5cdFx0XHRsZXQgc3RkID0gJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcyc7XG5cdFx0XHRsZXQgc3RkUGFyYWxsZWwgPSAncGFyYWxsZWwgc2ltdWx0YW5lb3VzIHJ1bndheSBvcGVyYXRpb25zIGluIHByb2dyZXNzIGluZGVwZW5kZW50IGRlcGFydHVyZXMgaW4gcHJvZ3Jlc3MnO1xuXHRcdFx0bGV0IHdpbmQgPSBbMCwgMF07XG5cdFx0XHRsZXQgciA9ICcnO1xuXHRcdFx0bGV0IHJTaG9ydGhhbmQgPSAnJztcblx0XHRcdGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygxNjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgMjAsIC01KSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIxNkwgYW5kIDE2UiBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwib25lIHNpeCBsZWZ0IGFuZCByaWdodFwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheXMgXCIgKyByICsgXCIgXCIgKyBzdGQgKyAnICcgKyBzdGRQYXJhbGxlbDtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDE2MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcxNkwsIDE2Uic7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcxNkwsIDE2Uic7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnJztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMzQwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDIwLCAtNSkpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMzRMIGFuZCAzNFIgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcInRocmVlIGZvdXIgbGVmdCBhbmQgcmlnaHRcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXlzIFwiICsgciArIFwiIFwiICsgc3RkICsgJyAnICsgc3RkUGFyYWxsZWw7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgzNDAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMzRMLCAzNFInO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMzRMLCAzNFInO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJyc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDcwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDIwLCAtNSkpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMDcgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcInplcm8gc2V2ZW5cIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByICsgXCIgXCIgKyBzdGQ7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCg3MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcwNyc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcwNyc7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnJztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMjUwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDIwLCAtNSkpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMjUgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcInR3byBmaXZlXCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgciArIFwiIFwiICsgc3RkO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMjUwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzI1Jztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzI1Jztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMTZMIGFuZCAxNlIgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcIm9uZSBzaXggbGVmdCBhbmQgcmlnaHRcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXlzIFwiICsgciArIFwiIFwiICsgc3RkICsgJyAnICsgc3RkUGFyYWxsZWw7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgxNjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMTZMLCAxNlInO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMTZMLCAxNlInO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHRzZXJ2aWNlLm1heFh3aW5kID0gWzAsIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0c2VydmljZS5tYXhUd2luZCA9IFswLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdGlmICh3aW5kWzBdID4gMTIpIHtcbiAgXHRcdFx0XHRzZXJ2aWNlLm1heFh3aW5kID0gW3dpbmRbMF0sIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHdpbmRbMV0gPCAwKSB7XG4gIFx0XHRcdFx0c2VydmljZS5tYXhUd2luZCA9IFtNYXRoLmFicyh3aW5kWzBdKSwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gW3IsIHJ3eSwgclNob3J0aGFuZF07XG5cdCAgICAgICBcdH1cblx0fSxcbiAgXHQnWVNDTic6IHtcblx0XHRuYW1lOiAnQ2FtZGVuJyxcblx0XHRzZXJ2aWNlczogWyd0b3dlcicsICdncm91bmQnXSxcblx0XHRpbWNBcHByb2FjaDogJ2luc3RydW1lbnQgYXBwcm9hY2gnLFxuXHRcdGFsbG93U3BlY2lhbFZGUjogdHJ1ZSxcblx0XHRjaXJjdWl0c0xpa2VseTogdHJ1ZSxcblx0XHRydW53YXlzOiBbJzA2JywgJzI0JywgJzEwJywgJzI4J10sXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtcblx0XHRcdHsgaXRlbTogJ0dsaWRpbmcgb3BlcmF0aW9ucyBpbiBwcm9ncmVzcycsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJ1ZGUicsXG5cdFx0XHRcdHJ1bndheXM6ICcqJyxcblx0XHRcdCAgICAgICBcdHByb2I6IDAuNTBcblx0XHRcdH1cblx0XHRdLFxuXHRcdHJ1bndheUxvZ2ljOiBmdW5jdGlvbih3aW5kZGlyOiBudW1iZXIsIHdpbmRzdHJlbmd0aDogbnVtYmVyLCBzZXJ2aWNlOiBhbnkpOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10geyBcblx0XHRcdGxldCByd3kgPSAnJztcblx0XHRcdGxldCB3aW5kID0gWzAsIDBdO1xuXHRcdFx0bGV0IHIgPSAnJztcblx0XHRcdGxldCByU2hvcnRoYW5kID0gJyc7XG5cdFx0XHRpZiAoc2VydmljZS5yd3lXaW5kT0soNjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpKSB7XG5cdFx0XHRcdHJTaG9ydGhhbmQgPSBcIjA2XCI7XG5cdFx0XHRcdHIgPSBcInplcm8gc2l4XCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDYwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzA2Jztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzA2Jztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcwNic7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDI0MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMjRcIjtcblx0XHRcdFx0ciA9IFwidHdvIGZvdXJcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMjQwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzI0Jztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzI0Jztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcyNCc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDEwMCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMTBcIjtcblx0XHRcdFx0ciA9IFwib25lIHplcm9cIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMTAwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzEwJztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzEwJztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcxMCc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDI4MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMjhcIjtcblx0XHRcdFx0ciA9IFwidHdvIGVpZ2h0XCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDI4MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcyOCc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcyOCc7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnMjgnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMDZcIjtcblx0XHRcdFx0ciA9IFwiemVybyBzaXhcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoNjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMDYnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMDYnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzA2Jztcblx0XHRcdH1cblx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gWzAsIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0aWYgKHdpbmRbMF0gPiA4KSB7XG4gIFx0XHRcdFx0c2VydmljZS5tYXhYd2luZCA9IFt3aW5kWzBdLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdH1cblx0XHRcdGlmICh3aW5kWzFdIDwgMCkge1xuICBcdFx0XHRcdHNlcnZpY2UubWF4VHdpbmQgPSBbTWF0aC5hYnMod2luZFswXSksIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFtyLCByd3ksIHJTaG9ydGhhbmRdO1xuXHRcdH1cblx0fSxcbiAgXHQnWVNDQic6IHtcblx0XHRuYW1lOiAnQ2FuYmVycmEnLFxuXHRcdHNlcnZpY2VzOiBbJ3Rvd2VyJywgJ2dyb3VuZCcsICdhcHByb2FjaCddLFxuXHRcdGltY0FwcHJvYWNoOiAnaW5zdHJ1bWVudCBhcHByb2FjaCcsXG5cdFx0YWxsb3dTcGVjaWFsVkZSOiBmYWxzZSxcblx0XHRjaXJjdWl0c0xpa2VseTogdHJ1ZSxcblx0XHRydW53YXlzOiBbJzE3JywgJzM1JywgJzMwJywgJzEyJ10sXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtcblx0XHRcdHtcblx0ICAgICAgIFx0XHRcdGl0ZW06ICdTSUdNRVQgQ1VSUkVOVCBGT1IgU0VWZXJlIFRVUkJ1bGVuY2UgZm9yZWNhc3QgYmV0d2VlbiB0ZW4gdGhvdXNhbmQgZmVldCBhbmQgZmxpZ2h0IGxldmVsIHR3byBmb3VyIHplcm8nLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJyonLFxuXHRcdFx0XHRwcm9iOiAwLjE1XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtOiAnTUVOIGFuZCBIQU5EIFRPT0xTIE9QRVJBVElORyBUTyBUSEUgRURHRSBPRiBydW53YXkgb25lIHNlZmZlbicsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnb25lIHNlZmZlbicsXG5cdFx0XHRcdHByb2I6IDAuMjBcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdNRU4gYW5kIEhBTkQgVE9PTFMgT1BFUkFUSU5HIFRPIFRIRSBFREdFIE9GIHJ1bndheSB0aHJlZSBmaWZlJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICd0aHJlZSBmaWZlJyxcblx0XHRcdFx0cHJvYjogMC4yMFxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0cnVud2F5TG9naWM6IGZ1bmN0aW9uKHdpbmRkaXI6IG51bWJlciwgd2luZHN0cmVuZ3RoOiBudW1iZXIsIHNlcnZpY2U6IGFueSk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7IFxuXHRcdFx0bGV0IHJ3eSA9ICcnO1xuXHRcdFx0bGV0IHdpbmQgPSBbMCwgMF07XG5cdFx0XHRsZXQgciA9ICcnO1xuXHRcdFx0bGV0IHJTaG9ydGhhbmQgPSAnJztcblx0XHRcdGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygzNTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpKSB7XG5cdFx0XHRcdHJTaG9ydGhhbmQgPSBcIjM1IGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlc1wiO1xuXHRcdFx0XHRyID0gXCJ0aHJlZSBmaXZlXCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDM1MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICczNSc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICczNSc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDE3MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMTcgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcIm9uZSBzZXZlblwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgxNzAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMTcnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMTcnO1xuXHRcdFx0fSBlbHNlIGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygzMDAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpKSB7XG5cdFx0XHRcdHJTaG9ydGhhbmQgPSBcIjMwIGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlc1wiO1xuXHRcdFx0XHRyID0gXCJ0aHJlZSB6ZXJvXCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDMwMCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICczMCc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICczMCc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDEyMCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMTIgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcIm9uZSB0d29cIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMTIwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcxMic7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcxMic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIzNSBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwidGhyZWUgZml2ZVwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgzNTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMzUnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMzUnO1xuXHRcdFx0fVxuXHRcdFx0c2VydmljZS5jaXJjdWl0cyA9IHNlcnZpY2UuYXJyaXZhbHM7XG5cdFx0XHRpZiAoc2VydmljZS5yd3lXaW5kT0soMTIwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzEyJztcblx0XHRcdFx0cnd5ICs9IFwiIHJ1bndheSBvbmUgdHdvIGluIHVzZVwiO1xuXHRcdFx0fSBlbHNlIGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygzMDAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpKSB7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnMzAnO1xuXHRcdFx0XHRyd3kgKz0gXCIgcnVud2F5IHRocmVlIHplcm8gaW4gdXNlXCI7XG5cdFx0XHR9XG5cblx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gWzAsIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0aWYgKHdpbmRbMF0gPiAxMikge1xuICBcdFx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbd2luZFswXSwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHR9XG5cdFx0XHRpZiAod2luZFsxXSA8IDApIHtcbiAgXHRcdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gW01hdGguYWJzKHdpbmRbMF0pLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBbciwgcnd5LCByU2hvcnRoYW5kXTtcblx0XHR9XG5cdH0sXG4gIFx0J1lTQksnOiB7XG5cdFx0bmFtZTogJ0JhbmtzdG93bicsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJ10sXG5cdFx0aW1jQXBwcm9hY2g6ICdpbnN0cnVtZW50IGFwcHJvYWNoJyxcblx0XHRhbGxvd1NwZWNpYWxWRlI6IHRydWUsXG5cdFx0Y2lyY3VpdHNMaWtlbHk6IHRydWUsXG5cdFx0cnVud2F5czogWycyOUwnLCAnMjlSLCAyOUMnLCAnMTFSJywgJzExTCwgMTFDJ10sXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtdLFxuXHRcdHJ1bndheUxvZ2ljOiBmdW5jdGlvbih3aW5kZGlyOiBudW1iZXIsIHdpbmRzdHJlbmd0aDogbnVtYmVyLCBzZXJ2aWNlOiBhbnkpOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10geyBcblx0XHRcdGxldCByd3kgPSAnJztcblx0XHRcdGxldCB3aW5kID0gWzAsIDBdO1xuXHRcdFx0bGV0IHIgPSAnJztcblx0XHRcdGxldCByU2hvcnRoYW5kID0gJyc7XG5cdFx0XHRpZiAoc2VydmljZS5yd3lXaW5kT0soMjkwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIyOVIgYW5kIDI5QyBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMgZnJlcXVlbmN5IDEzMi44IDI5TCBmb3IgY2lyY3VpdCB0cmFpbmluZyBmcmVxdWVuY3kgMTIzLjZcIjtcblx0XHRcdFx0ciA9IFwidHdvIG5pbmVyIHJpZ2h0IGFuZCB0d28gbmluZXIgY2VudHJlIGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcyB0d28gbmluZXIgbGVmdCBmb3IgY2lyY3VpdCB0cmFpbmluZ1wiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgyOTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMjlSLCAyOUMnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMjlSLCAyOUMnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzI5TCc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDExMCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMTFMIGFuZCAxMUMgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIGZyZXF1ZW5jeSAxMzIuOCAxMVIgZm9yIGNpcmN1aXQgdHJhaW5pbmcgZnJlcXVlbmN5IDEyMy42XCI7XG5cdFx0XHRcdHIgPSBcIm9uZSBvbmUgbGVmdCBhbmQgb25lIG9uZSBjZW50cmUgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIG9uZSBvbmUgcmlnaHQgZm9yIGNpcmN1aXQgdHJhaW5pbmdcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMTEwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzExTCwgMTFDJztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzExTCwgMTFDJztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcxMVInO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMjlSIGFuZCAyOUMgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIGZyZXF1ZW5jeSAxMzIuOCAyOUwgZm9yIGNpcmN1aXQgdHJhaW5pbmcgZnJlcXVlbmN5IDEyMy42XCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDI5MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcyOVIsIDI5Qyc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcyOVIsIDI5Qyc7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnMjlMJztcblx0XHRcdH1cblx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gWzAsIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0aWYgKHdpbmRbMF0gPiAxMikge1xuICBcdFx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbd2luZFswXSwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHR9XG5cdFx0XHRpZiAod2luZFsxXSA8IDApIHtcbiAgXHRcdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gW01hdGguYWJzKHdpbmRbMF0pLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBbciwgcnd5LCByU2hvcnRoYW5kXTtcblx0XHR9XG5cdH1cbiAgfVxuXG4gIHByaXZhdGUgYWQ6IHN0cmluZyA9ICdZU0NOJztcbiAgcHJpdmF0ZSB3aW5kRGlyOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHdpbmRTdHJlbmd0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB3eDogV2VhdGhlciA9IHt9IGFzIGFueTtcbiAgcHJpdmF0ZSByY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbWF4WHdpbmQ6IFtudW1iZXIsIHN0cmluZ10gPSBbMCwgJyddO1xuICBwcml2YXRlIG1heFR3aW5kOiBbbnVtYmVyLCBzdHJpbmddID0gWzAsICcnXTtcbiAgcHJpdmF0ZSBhcnJpdmFscyA9ICcnO1xuICBwcml2YXRlIGRlcGFydHVyZXMgPSAnJztcbiAgcHJpdmF0ZSBjaXJjdWl0cyA9ICcnO1xuICBwcml2YXRlIGNpcmN1aXRzTGlrZWx5OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgbm9DaXJjdWl0czogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRBZDogYW55O1xuICBwcml2YXRlIHJ3eVNob3J0aGFuZDogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWF0aGVyU2VydmljZTogV2VhdGhlclNlcnZpY2UpIHsgfVxuXG4gIHNldEFkKGFkOiBzdHJpbmcpIHtcbiAgXHR0aGlzLmFkID0gYWQ7XG5cdHRoaXMuY3VycmVudEFkID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXTtcbiAgXHR0aGlzLmNpcmN1aXRzTGlrZWx5ID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5jaXJjdWl0c0xpa2VseTtcblx0dGhpcy5hcnJpdmFscyA9ICcnO1xuXHR0aGlzLmRlcGFydHVyZXMgPSAnJztcblx0dGhpcy5jaXJjdWl0cyA9ICcnO1xuICBcdHRoaXMucmNvdW50ID0gMDtcbiAgXHR0aGlzLndpbmREaXIgPSAwO1xuXHR0aGlzLndpbmRTdHJlbmd0aCA9IDA7XG4gIH1cblxuICBnZXRBcHByb2FjaCgpOiBzdHJpbmcge1xuXHRpZiAodGhpcy53ZWF0aGVyU2VydmljZS5pc0lNQygpKSB7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudEFkWydpbWNBcHByb2FjaCddO1xuXHR9XG4gIFx0cmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0UnVud2F5U3VyZmFjZSgpOiBzdHJpbmcge1xuXHRyZXR1cm4gdGhpcy53ZWF0aGVyU2VydmljZS5nZXRHcm91bmRDb25kaXRpb24oKTtcbiAgfVxuXG4gIGdldFJ1bndheU9wZXJhdGlvbnMoKTogc3RyaW5nIHtcblx0ICBpZiAodGhpcy5nZXRBbGxvd1NwZWNpYWxWRlIoKSkge1xuICBcdFx0aWYgKHRoaXMud2VhdGhlclNlcnZpY2UuaXNSVkZSKCkpIHtcblx0XHRcdHJldHVybiAncmVzdHJpY3RlZCB2ZnIgb3BlcmF0aW9ucywgc3BlY2lhbCB2ZnIgcHJvY2VkdXJlcyBhcHBseSc7XG5cdFx0fVxuXHQgIFx0aWYgKHRoaXMud2VhdGhlclNlcnZpY2UuaXNJTUMoKSkge1xuXHRcdFx0cmV0dXJuICdjb250cm9sIHpvbmUgY2xvc2VkIGZvciB2ZnIgb3BlcmF0aW9ucyc7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAnJztcbiAgfVxuXG4gIGdldEhvbGRpbmcoKTogc3RyaW5nIHtcbiAgXHRyZXR1cm4gJy14LSc7XG4gIH1cblxuICBzZXRXaW5kKHdpbmREaXI6IG51bWJlciwgd2luZFN0cmVuZ3RoOiBudW1iZXIpIHtcbiAgXHR0aGlzLndpbmREaXIgPSB3aW5kRGlyO1xuICBcdHRoaXMud2luZFN0cmVuZ3RoID0gd2luZFN0cmVuZ3RoO1xuXHRpZiAodGhpcy53aW5kRGlyID09PSAwKSB7XG5cdFx0dGhpcy53aW5kRGlyID0gMzYwO1xuXHR9XG4gIH1cblxuICBzZXRXeCh3eDogV2VhdGhlcikge1xuICBcdHRoaXMud3ggPSB3eDtcblx0dGhpcy5hcnJpdmFscyA9ICcnO1xuXHR0aGlzLmRlcGFydHVyZXMgPSAnJztcblx0dGhpcy5jaXJjdWl0cyA9ICcnO1xuICBcdHRoaXMucmNvdW50ID0gMDtcbiAgXHR0aGlzLndpbmREaXIgPSAwO1xuXHR0aGlzLndpbmRTdHJlbmd0aCA9IDA7XG4gIFx0dGhpcy5ub0NpcmN1aXRzID0gZmFsc2U7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICBcdHJldHVybiB0aGlzLmtub3duQWRzW3RoaXMuYWRdLm5hbWU7XG4gIH1cblxuICBnZXRBbGxvd1NwZWNpYWxWRlIoKTogYm9vbGVhbiB7XG4gIFx0cmV0dXJuIHRoaXMua25vd25BZHNbdGhpcy5hZF0uYWxsb3dTcGVjaWFsVkZSO1xuICB9XG5cbiAgZ2V0QXJyaXZhbFJ1bndheSgpIDogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5hcnJpdmFscztcbiAgfVxuICBnZXREZXBhcnR1cmVSdW53YXkoKSA6IHN0cmluZyB7XG4gIFx0cmV0dXJuIHRoaXMuZGVwYXJ0dXJlcztcbiAgfVxuICBnZXRDaXJjdWl0UnVud2F5KCkgOiBzdHJpbmcge1xuICBcdHJldHVybiB0aGlzLmNpcmN1aXRzO1xuICB9XG5cbiAgZ2V0Q3VycmVudE90aGVyKCk6IHN0cmluZyB7XG4gIFx0cmV0dXJuIHRoaXMuc3BlY3M7XG4gIH1cblxuICBnZXRTcGVjaWFsaXRpZXMoKSA6IHN0cmluZ1tdIHtcbiAgXHRsZXQgcmVzOiBzdHJpbmdbXSA9IFtdO1xuICBcdGxldCBzcGVjcyA9IHRoaXMua25vd25BZHNbdGhpcy5hZF0ubG9jYWxTcGVjaWFsaXRpZXM7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3BlY3MubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgc3BlYyA9IHNwZWNzW2ldO1xuXHRcdGlmIChNYXRoLnJhbmRvbSgpIDwgc3BlYy5wcm9iKSB7XG5cdFx0XHRpZiAoKHNwZWMud3hDb25kaXRpb25zID09PSAnKicpIHx8ICh0aGlzLndlYXRoZXJIYXMoc3BlYy53eENvbmRpdGlvbnMpKSkge1xuXHRcdFx0XHRpZiAoKHNwZWMucnVud2F5cyA9PT0gJyonKSB8fCAodGhpcy5ydW53YXlzTWF0Y2goc3BlYy5ydW53YXlzKSkpIHtcblx0XHRcdFx0XHRyZXMucHVzaChzcGVjLml0ZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHRoaXMuc3BlY3MgPSB0aGlzLnNob3J0aGFuZChyZXMuam9pbignLCAnKSk7XG5cdHJldHVybiByZXM7XG4gIH1cblxuICBzaG9ydGhhbmQoc3Q6IHN0cmluZykgOiBzdHJpbmcge1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZG9tZXN0aWMvaWcsICdkb20nKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2RvbWVzdGljL2lnLCAnY2N0cycpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZGVwYXJ0dXJlcy9pZywgJ2RlcHMnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2Fycml2YWxzL2lnLCAnYXJyJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC93b2xsb25nb25nL2lnLCAnV09MJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9leHBlY3QvaWcsICd4cHQnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3J1bndheS9pZywgJ3J3eScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvb25lL2lnLCAnMScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvdHdvL2lnLCAnMicpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvdGhyZWUvaWcsICczJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9mb3IvaWcsICc0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9mb3VyL2lnLCAnNCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZml2ZS9pZywgJzUnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2ZpZmUvaWcsICc1Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9zaXgvaWcsICc2Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9zZXZlbi9pZywgJzcnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3NlZmZlbi9pZywgJzcnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2VpZ2h0L2lnLCAnOCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvbmluZXIvaWcsICc5Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC96ZXJvL2lnLCAnMCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvbGVmdC9pZywgJ0wnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3JpZ2h0L2lnLCAnUicpO1xuXHRyZXR1cm4gc3Q7XG4gIH1cblxuICBzZXROb0NpcmN1aXRzKHY6IGJvb2xlYW4pIHtcbiAgXHR0aGlzLm5vQ2lyY3VpdHMgPSB2O1xuICB9XG5cbiAgd2VhdGhlckhhcyh3eDogc3RyaW5nKSA6IGJvb2xlYW4ge1xuICBcdGlmICh0aGlzLnd4Lnd4ID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAod3gsICdpJyk7XG5cdHJldHVybiByZWdFeHAudGVzdCh0aGlzLnd4Lnd4LmpvaW4oJywnKSk7XG4gIH1cblxuICBydW53YXlzTWF0Y2gocnd5OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmdldEFjdGl2ZVJ1bndheXMoKTtcblx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAocnd5LCAnaScpO1xuXHRyZXR1cm4gcmVnRXhwLnRlc3Qocnd5cyk7XG4gIH1cblxuICBnZXRSdW53YXlzKCkgOiBzdHJpbmdbXSB7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmtub3duQWRzW3RoaXMuYWRdLnJ1bndheXM7XG5cdGxldCByd3lBcnJheSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJ3eXMubGVuZ3RoOyBpKyspIHtcblx0XHRyd3lBcnJheS5wdXNoKHJ3eXNbaV0uc25hbWUpO1xuXHR9XG5cdHJldHVybiByd3lBcnJheTtcbiAgfVxuXG4gIG11bHRpcGxlUnVud2F5cygpIDogYm9vbGVhbiB7XG4gIFx0dGhpcy5nZXRBY3RpdmVSdW53YXlzKCk7XG5cdHJldHVybiB0aGlzLnJjb3VudCA+IDE7XG4gIH1cblxuICBnZXRLbm93bkFkcygpIHtcbiAgXHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5rbm93bkFkcyk7XG4gIH1cblxuICBnZXRSZWxBbmdsZShyd3lBbmc6IG51bWJlciwgd2luZEFuZzogbnVtYmVyKTogbnVtYmVyIHtcblx0ICBsZXQgcmVsQW5nID0gTWF0aC5hYnMocnd5QW5nIC0gd2luZEFuZyk7XG5cdCAgaWYgKHJlbEFuZyA+IDE4MCkge1xuXHRcdCAgcmVsQW5nID0gMzYwIC0gcmVsQW5nO1xuXHQgIH1cblx0ICByZXR1cm4gcmVsQW5nO1xuICB9XG5cbiAgZ2V0UnVud2F5U2hvcnRoYW5kKCk6IHN0cmluZyB7XG5cdHJldHVybiB0aGlzLnJ3eVNob3J0aGFuZDtcbiAgfVxuXG4gIGdldEFjdGl2ZVJ1bndheXNBc1RleHQoKSA6IHN0cmluZyB7XG5cdGxldCByd3lzID0gdGhpcy5jdXJyZW50QWQucnVud2F5TG9naWModGhpcy53aW5kRGlyLCB0aGlzLndpbmRTdHJlbmd0aCwgdGhpcyk7XG4gIFx0cmV0dXJuIHJ3eXNbMl07XG4gIH1cblxuICBnZXRBY3RpdmVSdW53YXlzKCkgOiBzdHJpbmcge1xuXHR0aGlzLmFycml2YWxzID0gdGhpcy5kZXBhcnR1cmVzID0gdGhpcy5jaXJjdWl0cyA9ICcnO1xuICBcdGxldCByd3lzID0gdGhpcy5jdXJyZW50QWQucnVud2F5TG9naWModGhpcy53aW5kRGlyLCB0aGlzLndpbmRTdHJlbmd0aCwgdGhpcyk7XG5cdHRoaXMucnd5U2hvcnRoYW5kID0gdGhpcy5zaG9ydGhhbmQocnd5c1sxXSk7XG5cdHJldHVybiByd3lzWzFdO1xuICB9XG5cbiAgZ2V0Q2lyY3VpdHNMaWtlbHkoKTogYm9vbGVhbiB7XG4gIFx0cmV0dXJuIHRoaXMuY2lyY3VpdHNMaWtlbHk7XG4gIH1cblxuICByd3lXaW5kT0socnd5RGlyOiBudW1iZXIsIHdpbmREaXI6IG51bWJlciwgd2luZFN0cmVuZ3RoOiBudW1iZXIsIG1heFg6IG51bWJlciwgbWF4VDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB3aW5kID0gdGhpcy5nZXRYVFdpbmQocnd5RGlyLCB3aW5kRGlyLCB3aW5kU3RyZW5ndGgpO1xuICBcdHJldHVybiAod2luZFswXSA8IG1heFggJiYgd2luZFsxXSA+IG1heFQgKTtcbiAgfVxuXG4gIGdldFhUV2luZChyd3lEaXIsIHdpbmREaXIsIHdpbmRTdHJlbmd0aCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICBcdGxldCB4dyA9IHRoaXMuZ2V0WFdpbmQocnd5RGlyLCB3aW5kRGlyLCB3aW5kU3RyZW5ndGgpO1xuICBcdGxldCB0dyA9IHRoaXMuZ2V0VFdpbmQocnd5RGlyLCB3aW5kRGlyLCB3aW5kU3RyZW5ndGgpO1xuXHQvL2NvbnNvbGUubG9nKCdyd3knLCByd3lEaXIsIHdpbmREaXIsICdAJywgd2luZFN0cmVuZ3RoLCAneHc9JywgeHcsICd0dz0nLCB0dyk7XG5cdHJldHVybiBbeHcsIHR3XTtcbiAgfVxuXG4gIGdldFRXaW5kKHJ3eURpciwgd2luZERpciwgd2luZFN0cmVuZ3RoKTogbnVtYmVyIHtcbiAgXHRsZXQgcmVsQW5nID0gTWF0aC5hYnMocnd5RGlyIC0gd2luZERpcik7XG5cdGxldCB0V2luZCA9IE1hdGgucm91bmQod2luZFN0cmVuZ3RoICogTWF0aC5jb3MoTWF0aC5QSSAqIHJlbEFuZy8xODApKTtcblx0cmV0dXJuIHRXaW5kO1xuICB9XG4gIGdldFhXaW5kKHJ3eURpciwgd2luZERpciwgd2luZFN0cmVuZ3RoKTogbnVtYmVyIHtcbiAgXHRsZXQgcmVsQW5nID0gTWF0aC5hYnMocnd5RGlyIC0gd2luZERpcik7XG5cdGlmIChyZWxBbmcgPiAxODApIHtcblx0XHRyZWxBbmcgPSAzNjAgLSByZWxBbmc7XG5cdH1cblx0bGV0IHhXaW5kID0gTWF0aC5hYnMoTWF0aC5yb3VuZChNYXRoLmFicyh3aW5kU3RyZW5ndGggKiBNYXRoLnNpbihNYXRoLlBJICogcmVsQW5nLzE4MCkpKSk7XG5cdHJldHVybiB4V2luZDtcbiAgfVxuXG4gIGdldE1heFR3aW5kQXNUZXh0KCk6IHN0cmluZyB7XG4gIFx0aWYgKHRoaXMubWF4VHdpbmRbMF0gPiAwKSB7XG4gIFx0XHRyZXR1cm4gJ21heGltdW0gdGFpbHdpbmQgJyArIHRoaXMubWF4VHdpbmRbMF0udG9TdHJpbmcoKSArICcga25vdHMgcnVud2F5ICcgKyB0aGlzLm1heFR3aW5kWzFdO1xuXHR9IGVsc2Uge1xuICBcdFx0cmV0dXJuICcnO1xuXHR9XG4gIH1cblxuICBnZXRNYXhYd2luZEFzVGV4dCgpOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLm1heFh3aW5kWzBdID4gMCkge1xuICBcdFx0cmV0dXJuICdtYXhpbXVtIGNyb3Nzd2luZCAnICsgdGhpcy5tYXhYd2luZFswXS50b1N0cmluZygpICsgJyBrbm90cyBydW53YXkgJyArIHRoaXMubWF4WHdpbmRbMV07XG5cdH0gZWxzZSB7XG4gIFx0XHRyZXR1cm4gJyc7XG5cdH1cbiAgfVxuXG4gIGdldE1heFh3aW5kQXNTaG9ydGhhbmQoKTogc3RyaW5nIHtcbiAgXHRpZiAodGhpcy5tYXhYd2luZFswXSA+IDApIHtcbiAgXHRcdHJldHVybiAneHcnICsgdGhpcy5tYXhYd2luZFswXS50b1N0cmluZygpICsgJyByJyArIHRoaXMubWF4WHdpbmRbMV07XG5cdH0gZWxzZSB7XG4gIFx0XHRyZXR1cm4gJyc7XG5cdH1cbiAgfVxuXG4gIGdldE1heFh3aW5kKCk6IFtudW1iZXIsIHN0cmluZ10ge1xuICBcdHJldHVybiB0aGlzLm1heFh3aW5kO1xuICB9XG5cbiAgZ2V0TWF4VHdpbmRBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLm1heFR3aW5kWzBdID4gMCkge1xuICBcdFx0cmV0dXJuICd0dycgKyB0aGlzLm1heFR3aW5kWzBdLnRvU3RyaW5nKCkgKyAnIHInICsgdGhpcy5tYXhUd2luZFsxXTtcblx0fSBlbHNlIHtcbiAgXHRcdHJldHVybiAnJztcblx0fVxuICB9XG5cbiAgZ2V0TWF4VHdpbmQoKTogW251bWJlciwgc3RyaW5nXSB7XG4gIFx0cmV0dXJuIHRoaXMubWF4VHdpbmQ7XG4gIH1cblxuICBzZXJ2aWNlc0FzU3RyaW5nKCk6IHN0cmluZyB7XG4gIFx0bGV0IHNlcnZpY2VzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5zZXJ2aWNlcztcblx0bGV0IHN0QSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNlcnZpY2VzLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdHN0QS5wdXNoKHNlcnZpY2VzW2ldKTtcblx0fVxuXHRsZXQgc3QgPSBzdEEuam9pbignICcpO1xuXHRzdCArPSAnIG9yICcgKyBzZXJ2aWNlc1tzZXJ2aWNlcy5sZW5ndGggLSAxXTtcbiAgXHRyZXR1cm4gc3Q7XG4gIH1cbn1cbiJdfQ==