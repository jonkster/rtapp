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
        var st = stA.join(', ');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVyb2Ryb21lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVyb2Ryb21lcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDhEQUE0RDtBQUk1RDtJQWlVRSwyQkFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL1QxQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGFBQVEsR0FBUTtZQUN2QixNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Z0JBQ3pDLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixlQUFlLEVBQUUsS0FBSztnQkFDdEIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDN0MsaUJBQWlCLEVBQUU7b0JBQ2xCO3dCQUNRLElBQUksRUFBRSwrRUFBK0U7d0JBQzVGLFlBQVksRUFBRSxlQUFlO3dCQUM3QixPQUFPLEVBQUUsR0FBRzt3QkFDWixJQUFJLEVBQUUsSUFBSTtxQkFDVjtvQkFDRDt3QkFDQyxJQUFJLEVBQUUsd0lBQXdJO3dCQUM5SSxZQUFZLEVBQUUsR0FBRzt3QkFDakIsT0FBTyxFQUFFLEdBQUc7d0JBQ1osSUFBSSxFQUFFLElBQUk7cUJBQ1Y7b0JBQ0Q7d0JBQ0MsSUFBSSxFQUFFLHNLQUFzSzt3QkFDNUssWUFBWSxFQUFFLEdBQUc7d0JBQ2pCLE9BQU8sRUFBRSxHQUFHO3dCQUNaLElBQUksRUFBRSxJQUFJO3FCQUNWO29CQUNEO3dCQUNDLElBQUksRUFBRSxtRUFBbUU7d0JBQ3pFLFlBQVksRUFBRSxHQUFHO3dCQUNqQixPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxJQUFJLEVBQUUsSUFBSTtxQkFDVjtpQkFDRDtnQkFDRCxXQUFXLEVB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LElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLEVBQUUsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNYLENBQUM7SUF4a0JVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQWtVeUIsZ0NBQWM7T0FqVXZDLGlCQUFpQixDQXlrQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXprQkQsSUF5a0JDO0FBemtCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWF0aGVyLCBDbG91ZCB9IGZyb20gJy4uL3dlYXRoZXIvd2VhdGhlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgV2VhdGhlclNlcnZpY2UgfSBmcm9tICcuLi93ZWF0aGVyL3dlYXRoZXIuc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFlcm9kcm9tZXNTZXJ2aWNlIHtcblxuICBwcml2YXRlIHNwZWNzOiBzdHJpbmcgPSAnJztcblxuICBwcml2YXRlIGtub3duQWRzOiBhbnkgPSB7XG4gIFx0J1lTU1knOiB7XG5cdFx0bmFtZTogJ1N5ZG5leScsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJywgJ2FwcHJvYWNoJ10sXG5cdFx0aW1jQXBwcm9hY2g6ICdJTFMgYXBwcm9hY2gnLFxuXHRcdGFsbG93U3BlY2lhbFZGUjogZmFsc2UsXG5cdFx0Y2lyY3VpdHNMaWtlbHk6IGZhbHNlLFxuXHRcdHJ1bndheXM6IFsnMTZMLCAxNlInLCAnMzRMLCAzNFInLCAnMDcnLCAnMjUnXSxcblx0XHRsb2NhbFNwZWNpYWxpdGllczogW1xuXHRcdFx0e1xuXHQgICAgICAgXHRcdFx0aXRlbTogJ0N1bXVsb25pbWJ1cyBhbmQgbGlnaHRuaW5nIG9ic2VydmVkIHRvIHRoZSBzb3V0aC4gd2F0ZXJzcG91dCBvYnNlcnZlZCB0byBlYXN0Jyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAndGh1bmRlcnN0b3JtcycsXG5cdFx0XHRcdHJ1bndheXM6ICcqJyxcblx0XHRcdFx0cHJvYjogMC4wNVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aXRlbTogJ2JldHdlZW4gdGltZSB6ZXJvIHR3byB6ZXJvIHplcm8gYW5kIHRpbWUgemVybyBmb3VyIG9uZSBmaWZlIGV4cGVjdCBtaW5vciBkZWxheXMgZHVlIEFlcm9kcm9tZSBFbWVyZ2VuY3kgUGVyc29ubmVsIGV4ZXJjaXNlIGluIHByb2dyZXNzJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICcqJyxcblx0XHRcdFx0cHJvYjogMC4wMlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aXRlbTogJ2N1cmZldyByZXN0cmljdGlvbnMgYXBwbHkgZnJvbSBvbmUgdHdvIGZvdXIgZml2ZSwgYXJyaXZhbHMgcnVud2F5IHRocmVlIGZvciBsZWZ0IGFmdGVyIG9uZSB0aHJlZSB6ZXJvIHplcm8sIGFsbCBkZXBhcnR1cmVzIG9uZSBzaXggZGlyZWN0aW9uIGFmdGVyIG9uZSB0d28gZm91ciBmaXZlJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICcqJyxcblx0XHRcdFx0cHJvYjogMC4xMFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aXRlbTogJ0RPTUVTVElDIEpFVCBERVBhcnR1cmVzIFZJQSB3b2xsb25nb25nIGV4cGVjdCBydW53YXkgb25lIHNpeCBsZWZ0Jyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICdvbmUgc2l4IGxlZnQgYW5kIHJpZ2h0Jyxcblx0XHRcdFx0cHJvYjogMC40MFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdHJ1bndheUxvZ2ljOiBmdW5jdGlvbih3aW5kZGlyOiBudW1iZXIsIHdpbmRzdHJlbmd0aDogbnVtYmVyLCBzZXJ2aWNlOiBhbnkpOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10geyBcblx0XHRcdGxldCByd3kgPSAnJztcblx0XHRcdGxldCBzdGQgPSAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzJztcblx0XHRcdGxldCBzdGRQYXJhbGxlbCA9ICdwYXJhbGxlbCBzaW11bHRhbmVvdXMgcnVud2F5IG9wZXJhdGlvbnMgaW4gcHJvZ3Jlc3MgaW5kZXBlbmRlbnQgZGVwYXJ0dXJlcyBpbiBwcm9ncmVzcyc7XG5cdFx0XHRsZXQgd2luZCA9IFswLCAwXTtcblx0XHRcdGxldCByID0gJyc7XG5cdFx0XHRsZXQgclNob3J0aGFuZCA9ICcnO1xuXHRcdFx0aWYgKHNlcnZpY2Uucnd5V2luZE9LKDE2MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCAyMCwgLTUpKSB7XG5cdFx0XHRcdHJTaG9ydGhhbmQgPSBcIjE2TCBhbmQgMTZSIGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlc1wiO1xuXHRcdFx0XHRyID0gXCJvbmUgc2l4IGxlZnQgYW5kIHJpZ2h0XCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5cyBcIiArIHIgKyBcIiBcIiArIHN0ZCArICcgJyArIHN0ZFBhcmFsbGVsO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMTYwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzE2TCwgMTZSJztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzE2TCwgMTZSJztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygzNDAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgMjAsIC01KSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIzNEwgYW5kIDM0UiBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwidGhyZWUgZm91ciBsZWZ0IGFuZCByaWdodFwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheXMgXCIgKyByICsgXCIgXCIgKyBzdGQgKyAnICcgKyBzdGRQYXJhbGxlbDtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDM0MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICczNEwsIDM0Uic7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICczNEwsIDM0Uic7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnJztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soNzAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgMjAsIC01KSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIwNyBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwiemVybyBzZXZlblwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHIgKyBcIiBcIiArIHN0ZDtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDcwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzA3Jztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzA3Jztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygyNTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgMjAsIC01KSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIyNSBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwidHdvIGZpdmVcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByICsgXCIgXCIgKyBzdGQ7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgyNTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMjUnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMjUnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJyc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIxNkwgYW5kIDE2UiBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwib25lIHNpeCBsZWZ0IGFuZCByaWdodFwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheXMgXCIgKyByICsgXCIgXCIgKyBzdGQgKyAnICcgKyBzdGRQYXJhbGxlbDtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDE2MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcxNkwsIDE2Uic7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcxNkwsIDE2Uic7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnJztcblx0XHRcdH1cblx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gWzAsIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0aWYgKHdpbmRbMF0gPiAxMikge1xuICBcdFx0XHRcdHNlcnZpY2UubWF4WHdpbmQgPSBbd2luZFswXSwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHR9XG5cdFx0XHRpZiAod2luZFsxXSA8IDApIHtcbiAgXHRcdFx0XHRzZXJ2aWNlLm1heFR3aW5kID0gW01hdGguYWJzKHdpbmRbMF0pLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBbciwgcnd5LCByU2hvcnRoYW5kXTtcblx0ICAgICAgIFx0fVxuXHR9LFxuICBcdCdZU0NOJzoge1xuXHRcdG5hbWU6ICdDYW1kZW4nLFxuXHRcdHNlcnZpY2VzOiBbJ3Rvd2VyJywgJ2dyb3VuZCddLFxuXHRcdGltY0FwcHJvYWNoOiAnaW5zdHJ1bWVudCBhcHByb2FjaCcsXG5cdFx0YWxsb3dTcGVjaWFsVkZSOiB0cnVlLFxuXHRcdGNpcmN1aXRzTGlrZWx5OiB0cnVlLFxuXHRcdHJ1bndheXM6IFsnMDYnLCAnMjQnLCAnMTAnLCAnMjgnXSxcblx0XHRsb2NhbFNwZWNpYWxpdGllczogW1xuXHRcdFx0eyBpdGVtOiAnR2xpZGluZyBvcGVyYXRpb25zIGluIHByb2dyZXNzJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnVkZSJyxcblx0XHRcdFx0cnVud2F5czogJyonLFxuXHRcdFx0ICAgICAgIFx0cHJvYjogMC41MFxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0cnVud2F5TG9naWM6IGZ1bmN0aW9uKHdpbmRkaXI6IG51bWJlciwgd2luZHN0cmVuZ3RoOiBudW1iZXIsIHNlcnZpY2U6IGFueSk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7IFxuXHRcdFx0bGV0IHJ3eSA9ICcnO1xuXHRcdFx0bGV0IHdpbmQgPSBbMCwgMF07XG5cdFx0XHRsZXQgciA9ICcnO1xuXHRcdFx0bGV0IHJTaG9ydGhhbmQgPSAnJztcblx0XHRcdGlmIChzZXJ2aWNlLnJ3eVdpbmRPSyg2MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMDZcIjtcblx0XHRcdFx0ciA9IFwiemVybyBzaXhcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoNjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMDYnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMDYnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzA2Jztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMjQwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIyNFwiO1xuXHRcdFx0XHRyID0gXCJ0d28gZm91clwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgyNDAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMjQnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMjQnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzI0Jztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMTAwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIxMFwiO1xuXHRcdFx0XHRyID0gXCJvbmUgemVyb1wiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgxMDAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMTAnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMTAnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzEwJztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMjgwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIyOFwiO1xuXHRcdFx0XHRyID0gXCJ0d28gZWlnaHRcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMjgwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzI4Jztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzI4Jztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcyOCc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIwNlwiO1xuXHRcdFx0XHRyID0gXCJ6ZXJvIHNpeFwiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCg2MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcwNic7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcwNic7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnMDYnO1xuXHRcdFx0fVxuXHRcdFx0c2VydmljZS5tYXhYd2luZCA9IFswLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdHNlcnZpY2UubWF4VHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRpZiAod2luZFswXSA+IDgpIHtcbiAgXHRcdFx0XHRzZXJ2aWNlLm1heFh3aW5kID0gW3dpbmRbMF0sIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHdpbmRbMV0gPCAwKSB7XG4gIFx0XHRcdFx0c2VydmljZS5tYXhUd2luZCA9IFtNYXRoLmFicyh3aW5kWzBdKSwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gW3IsIHJ3eSwgclNob3J0aGFuZF07XG5cdFx0fVxuXHR9LFxuICBcdCdZU0NCJzoge1xuXHRcdG5hbWU6ICdDYW5iZXJyYScsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJywgJ2FwcHJvYWNoJ10sXG5cdFx0aW1jQXBwcm9hY2g6ICdpbnN0cnVtZW50IGFwcHJvYWNoJyxcblx0XHRhbGxvd1NwZWNpYWxWRlI6IGZhbHNlLFxuXHRcdGNpcmN1aXRzTGlrZWx5OiB0cnVlLFxuXHRcdHJ1bndheXM6IFsnMTcnLCAnMzUnLCAnMzAnLCAnMTInXSxcblx0XHRsb2NhbFNwZWNpYWxpdGllczogW1xuXHRcdFx0e1xuXHQgICAgICAgXHRcdFx0aXRlbTogJ1NJR01FVCBDVVJSRU5UIEZPUiBTRVZlcmUgVFVSQnVsZW5jZSBmb3JlY2FzdCBiZXR3ZWVuIHRlbiB0aG91c2FuZCBmZWV0IGFuZCBmbGlnaHQgbGV2ZWwgdHdvIGZvdXIgemVybycsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMTVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdNRU4gYW5kIEhBTkQgVE9PTFMgT1BFUkFUSU5HIFRPIFRIRSBFREdFIE9GIHJ1bndheSBvbmUgc2VmZmVuJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICdvbmUgc2VmZmVuJyxcblx0XHRcdFx0cHJvYjogMC4yMFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aXRlbTogJ01FTiBhbmQgSEFORCBUT09MUyBPUEVSQVRJTkcgVE8gVEhFIEVER0UgT0YgcnVud2F5IHRocmVlIGZpZmUnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJ3RocmVlIGZpZmUnLFxuXHRcdFx0XHRwcm9iOiAwLjIwXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRydW53YXlMb2dpYzogZnVuY3Rpb24od2luZGRpcjogbnVtYmVyLCB3aW5kc3RyZW5ndGg6IG51bWJlciwgc2VydmljZTogYW55KTogW3N0cmluZywgc3RyaW5nLCBzdHJpbmddIHsgXG5cdFx0XHRsZXQgcnd5ID0gJyc7XG5cdFx0XHRsZXQgd2luZCA9IFswLCAwXTtcblx0XHRcdGxldCByID0gJyc7XG5cdFx0XHRsZXQgclNob3J0aGFuZCA9ICcnO1xuXHRcdFx0aWYgKHNlcnZpY2Uucnd5V2luZE9LKDM1MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMzUgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcInRocmVlIGZpdmVcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMzUwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzM1Jztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzM1Jztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMTcwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIxNyBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwib25lIHNldmVuXCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDE3MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcxNyc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcxNyc7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDMwMCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0clNob3J0aGFuZCA9IFwiMzAgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzXCI7XG5cdFx0XHRcdHIgPSBcInRocmVlIHplcm9cIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMzAwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzMwJztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzMwJztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMTIwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIxMiBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXNcIjtcblx0XHRcdFx0ciA9IFwib25lIHR3b1wiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgxMjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzEyJztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzEyJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJTaG9ydGhhbmQgPSBcIjM1IGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlc1wiO1xuXHRcdFx0XHRyID0gXCJ0aHJlZSBmaXZlXCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDM1MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICczNSc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICczNSc7XG5cdFx0XHR9XG5cdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gc2VydmljZS5hcnJpdmFscztcblx0XHRcdGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygxMjAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpKSB7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnMTInO1xuXHRcdFx0XHRyd3kgKz0gXCIgcnVud2F5IG9uZSB0d28gaW4gdXNlXCI7XG5cdFx0XHR9IGVsc2UgaWYgKHNlcnZpY2Uucnd5V2luZE9LKDMwMCwgd2luZGRpciwgd2luZHN0cmVuZ3RoLCA4LCAtMykpIHtcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICczMCc7XG5cdFx0XHRcdHJ3eSArPSBcIiBydW53YXkgdGhyZWUgemVybyBpbiB1c2VcIjtcblx0XHRcdH1cblxuXHRcdFx0c2VydmljZS5tYXhYd2luZCA9IFswLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdHNlcnZpY2UubWF4VHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRpZiAod2luZFswXSA+IDEyKSB7XG4gIFx0XHRcdFx0c2VydmljZS5tYXhYd2luZCA9IFt3aW5kWzBdLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdH1cblx0XHRcdGlmICh3aW5kWzFdIDwgMCkge1xuICBcdFx0XHRcdHNlcnZpY2UubWF4VHdpbmQgPSBbTWF0aC5hYnMod2luZFswXSksIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFtyLCByd3ksIHJTaG9ydGhhbmRdO1xuXHRcdH1cblx0fSxcbiAgXHQnWVNCSyc6IHtcblx0XHRuYW1lOiAnQmFua3N0b3duJyxcblx0XHRzZXJ2aWNlczogWyd0b3dlcicsICdncm91bmQnXSxcblx0XHRpbWNBcHByb2FjaDogJ2luc3RydW1lbnQgYXBwcm9hY2gnLFxuXHRcdGFsbG93U3BlY2lhbFZGUjogdHJ1ZSxcblx0XHRjaXJjdWl0c0xpa2VseTogdHJ1ZSxcblx0XHRydW53YXlzOiBbJzI5TCcsICcyOVIsIDI5QycsICcxMVInLCAnMTFMLCAxMUMnXSxcblx0XHRsb2NhbFNwZWNpYWxpdGllczogW10sXG5cdFx0cnVud2F5TG9naWM6IGZ1bmN0aW9uKHdpbmRkaXI6IG51bWJlciwgd2luZHN0cmVuZ3RoOiBudW1iZXIsIHNlcnZpY2U6IGFueSk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7IFxuXHRcdFx0bGV0IHJ3eSA9ICcnO1xuXHRcdFx0bGV0IHdpbmQgPSBbMCwgMF07XG5cdFx0XHRsZXQgciA9ICcnO1xuXHRcdFx0bGV0IHJTaG9ydGhhbmQgPSAnJztcblx0XHRcdGlmIChzZXJ2aWNlLnJ3eVdpbmRPSygyOTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCwgOCwgLTMpKSB7XG5cdFx0XHRcdHJTaG9ydGhhbmQgPSBcIjI5UiBhbmQgMjlDIGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcyBmcmVxdWVuY3kgMTMyLjggMjlMIGZvciBjaXJjdWl0IHRyYWluaW5nIGZyZXF1ZW5jeSAxMjMuNlwiO1xuXHRcdFx0XHRyID0gXCJ0d28gbmluZXIgcmlnaHQgYW5kIHR3byBuaW5lciBjZW50cmUgZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIHR3byBuaW5lciBsZWZ0IGZvciBjaXJjdWl0IHRyYWluaW5nXCI7XG5cdFx0XHRcdHJ3eSA9IFwicnVud2F5IFwiICsgcjtcblx0XHRcdFx0d2luZCA9IHNlcnZpY2UuZ2V0WFRXaW5kKDI5MCwgd2luZGRpciwgd2luZHN0cmVuZ3RoKTtcblx0XHRcdFx0c2VydmljZS5hcnJpdmFscyA9ICcyOVIsIDI5Qyc7XG5cdFx0XHRcdHNlcnZpY2UuZGVwYXJ0dXJlcyA9ICcyOVIsIDI5Qyc7XG5cdFx0XHRcdHNlcnZpY2UuY2lyY3VpdHMgPSAnMjlMJztcblx0XHRcdH0gZWxzZSBpZiAoc2VydmljZS5yd3lXaW5kT0soMTEwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgsIDgsIC0zKSkge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIxMUwgYW5kIDExQyBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMgZnJlcXVlbmN5IDEzMi44IDExUiBmb3IgY2lyY3VpdCB0cmFpbmluZyBmcmVxdWVuY3kgMTIzLjZcIjtcblx0XHRcdFx0ciA9IFwib25lIG9uZSBsZWZ0IGFuZCBvbmUgb25lIGNlbnRyZSBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMgb25lIG9uZSByaWdodCBmb3IgY2lyY3VpdCB0cmFpbmluZ1wiO1xuXHRcdFx0XHRyd3kgPSBcInJ1bndheSBcIiArIHI7XG5cdFx0XHRcdHdpbmQgPSBzZXJ2aWNlLmdldFhUV2luZCgxMTAsIHdpbmRkaXIsIHdpbmRzdHJlbmd0aCk7XG5cdFx0XHRcdHNlcnZpY2UuYXJyaXZhbHMgPSAnMTFMLCAxMUMnO1xuXHRcdFx0XHRzZXJ2aWNlLmRlcGFydHVyZXMgPSAnMTFMLCAxMUMnO1xuXHRcdFx0XHRzZXJ2aWNlLmNpcmN1aXRzID0gJzExUic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyU2hvcnRoYW5kID0gXCIyOVIgYW5kIDI5QyBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMgZnJlcXVlbmN5IDEzMi44IDI5TCBmb3IgY2lyY3VpdCB0cmFpbmluZyBmcmVxdWVuY3kgMTIzLjZcIjtcblx0XHRcdFx0cnd5ID0gXCJydW53YXkgXCIgKyByO1xuXHRcdFx0XHR3aW5kID0gc2VydmljZS5nZXRYVFdpbmQoMjkwLCB3aW5kZGlyLCB3aW5kc3RyZW5ndGgpO1xuXHRcdFx0XHRzZXJ2aWNlLmFycml2YWxzID0gJzI5UiwgMjlDJztcblx0XHRcdFx0c2VydmljZS5kZXBhcnR1cmVzID0gJzI5UiwgMjlDJztcblx0XHRcdFx0c2VydmljZS5jaXJjdWl0cyA9ICcyOUwnO1xuXHRcdFx0fVxuXHRcdFx0c2VydmljZS5tYXhYd2luZCA9IFswLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdHNlcnZpY2UubWF4VHdpbmQgPSBbMCwgc2VydmljZS5hcnJpdmFsc107XG5cdFx0XHRpZiAod2luZFswXSA+IDEyKSB7XG4gIFx0XHRcdFx0c2VydmljZS5tYXhYd2luZCA9IFt3aW5kWzBdLCBzZXJ2aWNlLmFycml2YWxzXTtcblx0XHRcdH1cblx0XHRcdGlmICh3aW5kWzFdIDwgMCkge1xuICBcdFx0XHRcdHNlcnZpY2UubWF4VHdpbmQgPSBbTWF0aC5hYnMod2luZFswXSksIHNlcnZpY2UuYXJyaXZhbHNdO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFtyLCByd3ksIHJTaG9ydGhhbmRdO1xuXHRcdH1cblx0fVxuICB9XG5cbiAgcHJpdmF0ZSBhZDogc3RyaW5nID0gJ1lTQ04nO1xuICBwcml2YXRlIHdpbmREaXI6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgd2luZFN0cmVuZ3RoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHd4OiBXZWF0aGVyID0ge30gYXMgYW55O1xuICBwcml2YXRlIHJjb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtYXhYd2luZDogW251bWJlciwgc3RyaW5nXSA9IFswLCAnJ107XG4gIHByaXZhdGUgbWF4VHdpbmQ6IFtudW1iZXIsIHN0cmluZ10gPSBbMCwgJyddO1xuICBwcml2YXRlIGFycml2YWxzID0gJyc7XG4gIHByaXZhdGUgZGVwYXJ0dXJlcyA9ICcnO1xuICBwcml2YXRlIGNpcmN1aXRzID0gJyc7XG4gIHByaXZhdGUgY2lyY3VpdHNMaWtlbHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBub0NpcmN1aXRzOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudEFkOiBhbnk7XG4gIHByaXZhdGUgcnd5U2hvcnRoYW5kOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlYXRoZXJTZXJ2aWNlOiBXZWF0aGVyU2VydmljZSkgeyB9XG5cbiAgc2V0QWQoYWQ6IHN0cmluZykge1xuICBcdHRoaXMuYWQgPSBhZDtcblx0dGhpcy5jdXJyZW50QWQgPSB0aGlzLmtub3duQWRzW3RoaXMuYWRdO1xuICBcdHRoaXMuY2lyY3VpdHNMaWtlbHkgPSB0aGlzLmtub3duQWRzW3RoaXMuYWRdLmNpcmN1aXRzTGlrZWx5O1xuXHR0aGlzLmFycml2YWxzID0gJyc7XG5cdHRoaXMuZGVwYXJ0dXJlcyA9ICcnO1xuXHR0aGlzLmNpcmN1aXRzID0gJyc7XG4gIFx0dGhpcy5yY291bnQgPSAwO1xuICBcdHRoaXMud2luZERpciA9IDA7XG5cdHRoaXMud2luZFN0cmVuZ3RoID0gMDtcbiAgfVxuXG4gIGdldEFwcHJvYWNoKCk6IHN0cmluZyB7XG5cdGlmICh0aGlzLndlYXRoZXJTZXJ2aWNlLmlzSU1DKCkpIHtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50QWRbJ2ltY0FwcHJvYWNoJ107XG5cdH1cbiAgXHRyZXR1cm4gJyc7XG4gIH1cblxuICBnZXRSdW53YXlTdXJmYWNlKCk6IHN0cmluZyB7XG5cdHJldHVybiB0aGlzLndlYXRoZXJTZXJ2aWNlLmdldEdyb3VuZENvbmRpdGlvbigpO1xuICB9XG5cbiAgZ2V0UnVud2F5T3BlcmF0aW9ucygpOiBzdHJpbmcge1xuXHQgIGlmICh0aGlzLmdldEFsbG93U3BlY2lhbFZGUigpKSB7XG4gIFx0XHRpZiAodGhpcy53ZWF0aGVyU2VydmljZS5pc1JWRlIoKSkge1xuXHRcdFx0cmV0dXJuICdyZXN0cmljdGVkIHZmciBvcGVyYXRpb25zLCBzcGVjaWFsIHZmciBwcm9jZWR1cmVzIGFwcGx5Jztcblx0XHR9XG5cdCAgXHRpZiAodGhpcy53ZWF0aGVyU2VydmljZS5pc0lNQygpKSB7XG5cdFx0XHRyZXR1cm4gJ2NvbnRyb2wgem9uZSBjbG9zZWQgZm9yIHZmciBvcGVyYXRpb25zJztcblx0XHR9XG5cdH1cblx0cmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0SG9sZGluZygpOiBzdHJpbmcge1xuICBcdHJldHVybiAnLXgtJztcbiAgfVxuXG4gIHNldFdpbmQod2luZERpcjogbnVtYmVyLCB3aW5kU3RyZW5ndGg6IG51bWJlcikge1xuICBcdHRoaXMud2luZERpciA9IHdpbmREaXI7XG4gIFx0dGhpcy53aW5kU3RyZW5ndGggPSB3aW5kU3RyZW5ndGg7XG5cdGlmICh0aGlzLndpbmREaXIgPT09IDApIHtcblx0XHR0aGlzLndpbmREaXIgPSAzNjA7XG5cdH1cbiAgfVxuXG4gIHNldFd4KHd4OiBXZWF0aGVyKSB7XG4gIFx0dGhpcy53eCA9IHd4O1xuXHR0aGlzLmFycml2YWxzID0gJyc7XG5cdHRoaXMuZGVwYXJ0dXJlcyA9ICcnO1xuXHR0aGlzLmNpcmN1aXRzID0gJyc7XG4gIFx0dGhpcy5yY291bnQgPSAwO1xuICBcdHRoaXMud2luZERpciA9IDA7XG5cdHRoaXMud2luZFN0cmVuZ3RoID0gMDtcbiAgXHR0aGlzLm5vQ2lyY3VpdHMgPSBmYWxzZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gIFx0cmV0dXJuIHRoaXMua25vd25BZHNbdGhpcy5hZF0ubmFtZTtcbiAgfVxuXG4gIGdldEFsbG93U3BlY2lhbFZGUigpOiBib29sZWFuIHtcbiAgXHRyZXR1cm4gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5hbGxvd1NwZWNpYWxWRlI7XG4gIH1cblxuICBnZXRBcnJpdmFsUnVud2F5KCkgOiBzdHJpbmcge1xuICBcdHJldHVybiB0aGlzLmFycml2YWxzO1xuICB9XG4gIGdldERlcGFydHVyZVJ1bndheSgpIDogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5kZXBhcnR1cmVzO1xuICB9XG4gIGdldENpcmN1aXRSdW53YXkoKSA6IHN0cmluZyB7XG4gIFx0cmV0dXJuIHRoaXMuY2lyY3VpdHM7XG4gIH1cblxuICBnZXRDdXJyZW50T3RoZXIoKTogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5zcGVjcztcbiAgfVxuXG4gIGdldFNwZWNpYWxpdGllcygpIDogc3RyaW5nW10ge1xuICBcdGxldCByZXM6IHN0cmluZ1tdID0gW107XG4gIFx0bGV0IHNwZWNzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5sb2NhbFNwZWNpYWxpdGllcztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGVjcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBzcGVjID0gc3BlY3NbaV07XG5cdFx0aWYgKE1hdGgucmFuZG9tKCkgPCBzcGVjLnByb2IpIHtcblx0XHRcdGlmICgoc3BlYy53eENvbmRpdGlvbnMgPT09ICcqJykgfHwgKHRoaXMud2VhdGhlckhhcyhzcGVjLnd4Q29uZGl0aW9ucykpKSB7XG5cdFx0XHRcdGlmICgoc3BlYy5ydW53YXlzID09PSAnKicpIHx8ICh0aGlzLnJ1bndheXNNYXRjaChzcGVjLnJ1bndheXMpKSkge1xuXHRcdFx0XHRcdHJlcy5wdXNoKHNwZWMuaXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dGhpcy5zcGVjcyA9IHRoaXMuc2hvcnRoYW5kKHJlcy5qb2luKCcsICcpKTtcblx0cmV0dXJuIHJlcztcbiAgfVxuXG4gIHNob3J0aGFuZChzdDogc3RyaW5nKSA6IHN0cmluZyB7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9kb21lc3RpYy9pZywgJ2RvbScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZG9tZXN0aWMvaWcsICdjY3RzJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9kZXBhcnR1cmVzL2lnLCAnZGVwcycpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvYXJyaXZhbHMvaWcsICdhcnInKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3dvbGxvbmdvbmcvaWcsICdXT0wnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2V4cGVjdC9pZywgJ3hwdCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvcnVud2F5L2lnLCAncnd5Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9vbmUvaWcsICcxJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC90d28vaWcsICcyJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC90aHJlZS9pZywgJzMnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2Zvci9pZywgJzQnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2ZvdXIvaWcsICc0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9maXZlL2lnLCAnNScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZmlmZS9pZywgJzUnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3NpeC9pZywgJzYnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3NldmVuL2lnLCAnNycpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvc2VmZmVuL2lnLCAnNycpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZWlnaHQvaWcsICc4Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9uaW5lci9pZywgJzknKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3plcm8vaWcsICcwJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9sZWZ0L2lnLCAnTCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvcmlnaHQvaWcsICdSJyk7XG5cdHJldHVybiBzdDtcbiAgfVxuXG4gIHNldE5vQ2lyY3VpdHModjogYm9vbGVhbikge1xuICBcdHRoaXMubm9DaXJjdWl0cyA9IHY7XG4gIH1cblxuICB3ZWF0aGVySGFzKHd4OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gIFx0aWYgKHRoaXMud3gud3ggPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRsZXQgcmVnRXhwID0gbmV3IFJlZ0V4cCh3eCwgJ2knKTtcblx0cmV0dXJuIHJlZ0V4cC50ZXN0KHRoaXMud3gud3guam9pbignLCcpKTtcbiAgfVxuXG4gIHJ1bndheXNNYXRjaChyd3k6IHN0cmluZykgOiBib29sZWFuIHtcbiAgXHRsZXQgcnd5cyA9IHRoaXMuZ2V0QWN0aXZlUnVud2F5cygpO1xuXHRsZXQgcmVnRXhwID0gbmV3IFJlZ0V4cChyd3ksICdpJyk7XG5cdHJldHVybiByZWdFeHAudGVzdChyd3lzKTtcbiAgfVxuXG4gIGdldFJ1bndheXMoKSA6IHN0cmluZ1tdIHtcbiAgXHRsZXQgcnd5cyA9IHRoaXMua25vd25BZHNbdGhpcy5hZF0ucnVud2F5cztcblx0bGV0IHJ3eUFycmF5ID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcnd5cy5sZW5ndGg7IGkrKykge1xuXHRcdHJ3eUFycmF5LnB1c2gocnd5c1tpXS5zbmFtZSk7XG5cdH1cblx0cmV0dXJuIHJ3eUFycmF5O1xuICB9XG5cbiAgbXVsdGlwbGVSdW53YXlzKCkgOiBib29sZWFuIHtcbiAgXHR0aGlzLmdldEFjdGl2ZVJ1bndheXMoKTtcblx0cmV0dXJuIHRoaXMucmNvdW50ID4gMTtcbiAgfVxuXG4gIGdldEtub3duQWRzKCkge1xuICBcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmtub3duQWRzKTtcbiAgfVxuXG4gIGdldFJlbEFuZ2xlKHJ3eUFuZzogbnVtYmVyLCB3aW5kQW5nOiBudW1iZXIpOiBudW1iZXIge1xuXHQgIGxldCByZWxBbmcgPSBNYXRoLmFicyhyd3lBbmcgLSB3aW5kQW5nKTtcblx0ICBpZiAocmVsQW5nID4gMTgwKSB7XG5cdFx0ICByZWxBbmcgPSAzNjAgLSByZWxBbmc7XG5cdCAgfVxuXHQgIHJldHVybiByZWxBbmc7XG4gIH1cblxuICBnZXRSdW53YXlTaG9ydGhhbmQoKTogc3RyaW5nIHtcblx0cmV0dXJuIHRoaXMucnd5U2hvcnRoYW5kO1xuICB9XG5cbiAgZ2V0QWN0aXZlUnVud2F5c0FzVGV4dCgpIDogc3RyaW5nIHtcblx0bGV0IHJ3eXMgPSB0aGlzLmN1cnJlbnRBZC5ydW53YXlMb2dpYyh0aGlzLndpbmREaXIsIHRoaXMud2luZFN0cmVuZ3RoLCB0aGlzKTtcbiAgXHRyZXR1cm4gcnd5c1syXTtcbiAgfVxuXG4gIGdldEFjdGl2ZVJ1bndheXMoKSA6IHN0cmluZyB7XG5cdHRoaXMuYXJyaXZhbHMgPSB0aGlzLmRlcGFydHVyZXMgPSB0aGlzLmNpcmN1aXRzID0gJyc7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmN1cnJlbnRBZC5ydW53YXlMb2dpYyh0aGlzLndpbmREaXIsIHRoaXMud2luZFN0cmVuZ3RoLCB0aGlzKTtcblx0dGhpcy5yd3lTaG9ydGhhbmQgPSB0aGlzLnNob3J0aGFuZChyd3lzWzFdKTtcblx0cmV0dXJuIHJ3eXNbMV07XG4gIH1cblxuICBnZXRDaXJjdWl0c0xpa2VseSgpOiBib29sZWFuIHtcbiAgXHRyZXR1cm4gdGhpcy5jaXJjdWl0c0xpa2VseTtcbiAgfVxuXG4gIHJ3eVdpbmRPSyhyd3lEaXI6IG51bWJlciwgd2luZERpcjogbnVtYmVyLCB3aW5kU3RyZW5ndGg6IG51bWJlciwgbWF4WDogbnVtYmVyLCBtYXhUOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHdpbmQgPSB0aGlzLmdldFhUV2luZChyd3lEaXIsIHdpbmREaXIsIHdpbmRTdHJlbmd0aCk7XG4gIFx0cmV0dXJuICh3aW5kWzBdIDwgbWF4WCAmJiB3aW5kWzFdID4gbWF4VCApO1xuICB9XG5cbiAgZ2V0WFRXaW5kKHJ3eURpciwgd2luZERpciwgd2luZFN0cmVuZ3RoKTogW251bWJlciwgbnVtYmVyXSB7XG4gIFx0bGV0IHh3ID0gdGhpcy5nZXRYV2luZChyd3lEaXIsIHdpbmREaXIsIHdpbmRTdHJlbmd0aCk7XG4gIFx0bGV0IHR3ID0gdGhpcy5nZXRUV2luZChyd3lEaXIsIHdpbmREaXIsIHdpbmRTdHJlbmd0aCk7XG5cdHJldHVybiBbeHcsIHR3XTtcbiAgfVxuXG4gIGdldFRXaW5kKHJ3eURpciwgd2luZERpciwgd2luZFN0cmVuZ3RoKTogbnVtYmVyIHtcbiAgXHRsZXQgcmVsQW5nID0gTWF0aC5hYnMocnd5RGlyIC0gd2luZERpcik7XG5cdGxldCB0V2luZCA9IE1hdGgucm91bmQod2luZFN0cmVuZ3RoICogTWF0aC5jb3MoTWF0aC5QSSAqIHJlbEFuZy8xODApKTtcblx0cmV0dXJuIHRXaW5kO1xuICB9XG4gIGdldFhXaW5kKHJ3eURpciwgd2luZERpciwgd2luZFN0cmVuZ3RoKTogbnVtYmVyIHtcbiAgXHRsZXQgcmVsQW5nID0gTWF0aC5hYnMocnd5RGlyIC0gd2luZERpcik7XG5cdGlmIChyZWxBbmcgPiAxODApIHtcblx0XHRyZWxBbmcgPSAzNjAgLSByZWxBbmc7XG5cdH1cblx0bGV0IHhXaW5kID0gTWF0aC5hYnMoTWF0aC5yb3VuZChNYXRoLmFicyh3aW5kU3RyZW5ndGggKiBNYXRoLnNpbihNYXRoLlBJICogcmVsQW5nLzE4MCkpKSk7XG5cdHJldHVybiB4V2luZDtcbiAgfVxuXG4gIGdldE1heFR3aW5kQXNUZXh0KCk6IHN0cmluZyB7XG4gIFx0aWYgKHRoaXMubWF4VHdpbmRbMF0gPiAwKSB7XG4gIFx0XHRyZXR1cm4gJ21heGltdW0gdGFpbHdpbmQgJyArIHRoaXMubWF4VHdpbmRbMF0udG9TdHJpbmcoKSArICcga25vdHMgcnVud2F5ICcgKyB0aGlzLm1heFR3aW5kWzFdO1xuXHR9IGVsc2Uge1xuICBcdFx0cmV0dXJuICcnO1xuXHR9XG4gIH1cblxuICBnZXRNYXhYd2luZEFzVGV4dCgpOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLm1heFh3aW5kWzBdID4gMCkge1xuICBcdFx0cmV0dXJuICdtYXhpbXVtIGNyb3Nzd2luZCAnICsgdGhpcy5tYXhYd2luZFswXS50b1N0cmluZygpICsgJyBrbm90cyBydW53YXkgJyArIHRoaXMubWF4WHdpbmRbMV07XG5cdH0gZWxzZSB7XG4gIFx0XHRyZXR1cm4gJyc7XG5cdH1cbiAgfVxuXG4gIGdldE1heFh3aW5kQXNTaG9ydGhhbmQoKTogc3RyaW5nIHtcbiAgXHRpZiAodGhpcy5tYXhYd2luZFswXSA+IDApIHtcbiAgXHRcdHJldHVybiAneHcnICsgdGhpcy5tYXhYd2luZFswXS50b1N0cmluZygpICsgJyByJyArIHRoaXMubWF4WHdpbmRbMV07XG5cdH0gZWxzZSB7XG4gIFx0XHRyZXR1cm4gJyc7XG5cdH1cbiAgfVxuXG4gIGdldE1heFh3aW5kKCk6IFtudW1iZXIsIHN0cmluZ10ge1xuICBcdHJldHVybiB0aGlzLm1heFh3aW5kO1xuICB9XG5cbiAgZ2V0TWF4VHdpbmRBc1Nob3J0aGFuZCgpOiBzdHJpbmcge1xuICBcdGlmICh0aGlzLm1heFR3aW5kWzBdID4gMCkge1xuICBcdFx0cmV0dXJuICd0dycgKyB0aGlzLm1heFR3aW5kWzBdLnRvU3RyaW5nKCkgKyAnIHInICsgdGhpcy5tYXhUd2luZFsxXTtcblx0fSBlbHNlIHtcbiAgXHRcdHJldHVybiAnJztcblx0fVxuICB9XG5cbiAgZ2V0TWF4VHdpbmQoKTogW251bWJlciwgc3RyaW5nXSB7XG4gIFx0cmV0dXJuIHRoaXMubWF4VHdpbmQ7XG4gIH1cblxuICBzZXJ2aWNlc0FzU3RyaW5nKCk6IHN0cmluZyB7XG4gIFx0bGV0IHNlcnZpY2VzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5zZXJ2aWNlcztcblx0bGV0IHN0QSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNlcnZpY2VzLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdHN0QS5wdXNoKHNlcnZpY2VzW2ldKTtcblx0fVxuXHRsZXQgc3QgPSBzdEEuam9pbignLCAnKTtcblx0c3QgKz0gJyBvciAnICsgc2VydmljZXNbc2VydmljZXMubGVuZ3RoIC0gMV07XG4gIFx0cmV0dXJuIHN0O1xuICB9XG59XG4iXX0=