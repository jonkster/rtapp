"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AerodromesService = /** @class */ (function () {
    function AerodromesService() {
        this.specs = '';
        this.knownAds = {
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
        };
        this.ad = 'YSCN';
        this.windDir = 0;
        this.windStrength = 0;
        this.wx = {};
        this.rcount = 0;
        this.maxXwind = 0;
        this.arrivals = '';
        this.departures = '';
        this.circuits = '';
        this.circuitsLikely = false;
        this.noCircuits = false;
    }
    AerodromesService.prototype.setAd = function (ad) {
        this.ad = ad;
        this.circuitsLikely = this.knownAds[this.ad].circuitsLikely;
        this.maxXwind = 0;
        this.arrivals = '';
        this.departures = '';
        this.circuits = '';
        this.rcount = 0;
        this.windDir = 0;
        this.windStrength = 0;
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
        this.maxXwind = 0;
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
    AerodromesService.prototype.getActiveRunways = function () {
        var rwysSt = [];
        var rwys = this.knownAds[this.ad].runways;
        this.arrivals = this.departures = this.circuits = '';
        this.maxXwind = 0;
        for (var i = 0; i < rwys.length; i++) {
            var rwy = rwys[i];
            var relAng = Math.abs(rwy.dir - this.windDir);
            if (relAng > 180) {
                relAng = 360 - relAng;
            }
            if (relAng < 90) {
                var st = 'runway ' + rwy.name;
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
                var xw = this.getXWind(rwy.dir, this.windDir, this.windStrength);
                if (xw > this.maxXwind) {
                    this.maxXwind = xw;
                }
            }
        }
        if ((this.circuits === '') && (this.circuitsLikely) && (!this.noCircuits)) {
            this.circuits = this.arrivals;
        }
        if (this.noCircuits) {
            this.circuits = '';
        }
        this.rcount = rwysSt.length;
        return rwysSt.join(', ');
    };
    AerodromesService.prototype.getCircuitsLikely = function () {
        return this.circuitsLikely;
    };
    AerodromesService.prototype.getXWind = function (rwyDir, windDir, windStrength) {
        var relAng = Math.abs(rwyDir - windDir);
        if (relAng > 180) {
            relAng = 360 - relAng;
        }
        var xWind = Math.round(Math.abs(windStrength * Math.sin(Math.PI * relAng / 180)));
        return xWind;
    };
    AerodromesService.prototype.getMaxXwindAsShorthand = function () {
        if (this.maxXwind >= 7) {
            return 'xw' + this.maxXwind.toString();
        }
        else {
            return '';
        }
    };
    AerodromesService.prototype.getMaxXwind = function () {
        return this.maxXwind;
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
        __metadata("design:paramtypes", [])
    ], AerodromesService);
    return AerodromesService;
}());
exports.AerodromesService = AerodromesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVyb2Ryb21lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVyb2Ryb21lcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBSzNDO0lBNkxFO1FBM0xRLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsYUFBUSxHQUFRO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDVCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQztnQkFDekMsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixpQkFBaUIsRUFBRTtvQkFDbEI7d0JBQ1EsSUFBSSxFQUFFLCtFQUErRTt3QkFDNUYsWUFBWSxFQUFFLGVBQWU7d0JBQzdCLE9BQU8sRUFBRSxHQUFHO3dCQUNaLElBQUksRUFBRSxJQUFJO3FCQUNWO29CQUNEO3dCQUNDLElBQUksRUFBRSx3SUFBd0k7d0JBQzlJLFlBQVksRUFBRSxHQUFHO3dCQUNqQixPQUFPLEVBQUUsR0FBRzt3QkFDWixJQUFJLEVBQUUsSUFBSTtxQkFDVjtvQkFDRDt3QkFDQyxJQUFJLEVBQUUsc0tBQXNLO3dCQUM1SyxZQUFZLEVBQUUsR0FBRzt3QkFDakIsT0FBTyxFQUFFLEdBQUc7d0JBQ1osSUFBSSxFQUFFLElBQUk7cUJBQ1Y7b0JBQ0Q7d0JBQ0MsSUFBSSxFQUFFLG1FQUFtRTt3QkFDekUsWUFBWSxFQUFFLEdBQUc7d0JBQ2pCLE9BQU8sRUFBRSx3QkFBd0I7d0JBQ2pDLElBQUksRUFBRSxJQUFJO3FCQUNWO2lCQUNEO2dCQUNELE9BQU8sRUFBRTtvQkFDUjt3QkFDQyxNQUFNLEVBQUUsMkJBQTJCO3dCQUNuQyxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsT0FBTyxFQUFFLHVHQUF1RztxQkFDaEg7b0JBQ0Q7d0JBQ0MsTUFBTSxFQUFFLHdCQUF3Qjt3QkFD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RSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsRUFBRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQWhaVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0FpWjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWpaRCxJQWlaQztBQWpaWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWF0aGVyLCBDbG91ZCB9IGZyb20gJy4uL3dlYXRoZXIvd2VhdGhlci5pbnRlcmZhY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBZXJvZHJvbWVzU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzcGVjczogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBrbm93bkFkczogYW55ID0ge1xuICBcdCdZU1NZJzoge1xuXHRcdG5hbWU6ICdTeWRuZXknLFxuXHRcdHNlcnZpY2VzOiBbJ3Rvd2VyJywgJ2dyb3VuZCcsICdhcHByb2FjaCddLFxuXHRcdGFsbG93U3BlY2lhbFZGUjogZmFsc2UsXG5cdFx0Y2lyY3VpdHNMaWtlbHk6IGZhbHNlLFxuXHRcdGxvY2FsU3BlY2lhbGl0aWVzOiBbXG5cdFx0XHR7XG5cdCAgICAgICBcdFx0XHRpdGVtOiAnQ3VtdWxvbmltYnVzIGFuZCBsaWdodG5pbmcgb2JzZXJ2ZWQgdG8gdGhlIHNvdXRoLiB3YXRlcnNwb3V0IG9ic2VydmVkIHRvIGVhc3QnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICd0aHVuZGVyc3Rvcm1zJyxcblx0XHRcdFx0cnVud2F5czogJyonLFxuXHRcdFx0XHRwcm9iOiAwLjA1XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtOiAnYmV0d2VlbiB0aW1lIHplcm8gdHdvIHplcm8gemVybyBhbmQgdGltZSB6ZXJvIGZvdXIgb25lIGZpZmUgZXhwZWN0IG1pbm9yIGRlbGF5cyBkdWUgQWVyb2Ryb21lIEVtZXJnZW5jeSBQZXJzb25uZWwgZXhlcmNpc2UgaW4gcHJvZ3Jlc3MnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJyonLFxuXHRcdFx0XHRwcm9iOiAwLjAyXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtOiAnY3VyZmV3IHJlc3RyaWN0aW9ucyBhcHBseSBmcm9tIG9uZSB0d28gZm91ciBmaXZlLCBhcnJpdmFscyBydW53YXkgdGhyZWUgZm9yIGxlZnQgYWZ0ZXIgb25lIHRocmVlIHplcm8gemVybywgYWxsIGRlcGFydHVyZXMgb25lIHNpeCBkaXJlY3Rpb24gYWZ0ZXIgb25lIHR3byBmb3VyIGZpdmUnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJyonLFxuXHRcdFx0XHRwcm9iOiAwLjEwXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtOiAnRE9NRVNUSUMgSkVUIERFUGFydHVyZXMgVklBIHdvbGxvbmdvbmcgZXhwZWN0IHJ1bndheSBvbmUgc2l4IGxlZnQnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJ29uZSBzaXggbGVmdCBhbmQgcmlnaHQnLFxuXHRcdFx0XHRwcm9iOiAwLjQwXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0cnVud2F5czogW1xuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0aHJlZSBmb3VyIGxlZnQgYW5kIHJpZ2h0Jyxcblx0XHRcdFx0J3NuYW1lJzogJzM0TCBhbmQgMzRSJyxcblx0XHRcdFx0J2Rpcic6IDM0MCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcyBwYXJhbGxlbCBydW53YXkgb3BlcmF0aW9ucyBpbiBwcm9ncmVzcyBpbmRlcGVuZGVudCBkZXBhcnR1cmVzIGluIHByb2dyZXNzJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAnb25lIHNpeCBsZWZ0IGFuZCByaWdodCcsXG5cdFx0XHRcdCdzbmFtZSc6ICcxNkwgYW5kIDE2UicsXG5cdFx0XHRcdCdkaXInOiAxNjAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMgcGFyYWxsZWwgcnVud2F5IG9wZXJhdGlvbnMgaW4gcHJvZ3Jlc3MgaW5kZXBlbmRlbnQgZGVwYXJ0dXJlcyBpbiBwcm9ncmVzcydcblx0XHRcdH1cblx0XHRdXG5cdH0sXG4gIFx0J1lTQ04nOiB7XG5cdFx0bmFtZTogJ0NhbWRlbicsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJ10sXG5cdFx0YWxsb3dTcGVjaWFsVkZSOiB0cnVlLFxuXHRcdGNpcmN1aXRzTGlrZWx5OiB0cnVlLFxuXHRcdGxvY2FsU3BlY2lhbGl0aWVzOiBbXG5cdFx0XHR7IGl0ZW06ICdHbGlkaW5nIG9wZXJhdGlvbnMgaW4gcHJvZ3Jlc3MnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICdWRlInLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHQgICAgICAgXHRwcm9iOiAwLjUwXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRydW53YXlzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ3plcm8gc2l4Jyxcblx0XHRcdFx0J3NuYW1lJzogJzA2Jyxcblx0XHRcdFx0J2Rpcic6IDYwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAndHdvIGZvdXInLFxuXHRcdFx0XHQnc25hbWUnOiAnMjQnLFxuXHRcdFx0XHQnZGlyJzogMjQwLFxuXHRcdFx0XHQnZXh0cmEnOiAncmlnaHQgaGFuZCBjaXJjdWl0cyBmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICdvbmUgemVybycsXG5cdFx0XHRcdCdzbmFtZSc6ICcxMCcsXG5cdFx0XHRcdCdkaXInOiAxMTAsXG5cdFx0XHRcdCdleHRyYSc6ICdpbiB1c2UnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0d28gZWlnaHQnLFxuXHRcdFx0XHQnc25hbWUnOiAnMjgnLFxuXHRcdFx0XHQnZGlyJzogMjgwLFxuXHRcdFx0XHQnZXh0cmEnOiAnaW4gdXNlJ1xuXHRcdFx0fVxuXHRcdF1cblx0fSxcbiAgXHQnWVNDQic6IHtcblx0XHRuYW1lOiAnQ2FuYmVycmEnLFxuXHRcdHNlcnZpY2VzOiBbJ3Rvd2VyJywgJ2dyb3VuZCcsICdhcHByb2FjaCddLFxuXHRcdGFsbG93U3BlY2lhbFZGUjogZmFsc2UsXG5cdFx0Y2lyY3VpdHNMaWtlbHk6IHRydWUsXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtcblx0XHRcdHtcblx0ICAgICAgIFx0XHRcdGl0ZW06ICdTSUdNRVQgQ1VSUkVOVCBGT1IgU0VWZXJlIFRVUkJ1bGVuY2UgZm9yZWNhc3QgYmV0d2VlbiB0ZW4gdGhvdXNhbmQgZmVldCBhbmQgZmxpZ2h0IGxldmVsIHR3byBmb3VyIHplcm8nLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJyonLFxuXHRcdFx0XHRwcm9iOiAwLjE1XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtOiAnTUVOIGFuZCBIQU5EIFRPT0xTIE9QRVJBVElORyBUTyBUSEUgRURHRSBPRiBydW53YXkgb25lIHNlZmZlbicsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnb25lIHNlZmZlbicsXG5cdFx0XHRcdHByb2I6IDAuMjBcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdNRU4gYW5kIEhBTkQgVE9PTFMgT1BFUkFUSU5HIFRPIFRIRSBFREdFIE9GIHJ1bndheSB0aHJlZSBmaWZlJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICd0aHJlZSBmaWZlJyxcblx0XHRcdFx0cHJvYjogMC4yMFxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0cnVud2F5czogW1xuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0aHJlZSBmaWZlJyxcblx0XHRcdFx0J3NuYW1lJzogJzM1Jyxcblx0XHRcdFx0J2Rpcic6IDM1MCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcydcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ29uZSBzZWZmZW4nLFxuXHRcdFx0XHQnc25hbWUnOiAnMTcnLFxuXHRcdFx0XHQnZGlyJzogMTcwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAndGhyZWUgemVybycsXG5cdFx0XHRcdCdzbmFtZSc6ICczMCcsXG5cdFx0XHRcdCdkaXInOiAzMDAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICdvbmUgdHdvJyxcblx0XHRcdFx0J3NuYW1lJzogJzEyJyxcblx0XHRcdFx0J2Rpcic6IDEyMCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcydcblx0XHRcdH1cblx0XHRdXG5cdH0sXG4gIFx0J1lTQksnOiB7XG5cdFx0bmFtZTogJ0JhbmtzdG93bicsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJ10sXG5cdFx0YWxsb3dTcGVjaWFsVkZSOiB0cnVlLFxuXHRcdGNpcmN1aXRzTGlrZWx5OiB0cnVlLFxuXHRcdGxvY2FsU3BlY2lhbGl0aWVzOiBbXSxcblx0XHRydW53YXlzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ29uZSBvbmUgbGVmdCBhbmQgb25lIG9uZSBjZW50cmUnLFxuXHRcdFx0XHQnc25hbWUnOiAnMTFMIGFuZCAxMUMnLFxuXHRcdFx0XHQnZGlyJzogMTEwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIGZyZXF1ZW5jeSBvbmUgdGhyZWUgdHdvIGRlY2ltYWwgZWlnaHQnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICdvbmUgb25lIHJpZ2h0Jyxcblx0XHRcdFx0J3NuYW1lJzogJzExUicsXG5cdFx0XHRcdCdkaXInOiAxMTAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgY2lyY3VpdCB0cmFpbmluZyByaWdodCBoYW5kIGNpcmN1aXRzIGZyZXF1ZW5jeSBvbmUgdHdvIHRocmVlIGRlY2ltYWwgc2l4J1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAndHdvIG5pbmVyIHJpZ2h0IGFuZCB0d28gbmluZXIgY2VudHJlJyxcblx0XHRcdFx0J3NuYW1lJzogJzI5UiBhbmQgMjlDJyxcblx0XHRcdFx0J2Rpcic6IDI5MCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcyByaWdodCBoYW5kIGNpcmN1aXRzIGZyZXF1ZW5jeSBvbmUgdGhyZWUgdHdvIGRlY2ltYWwgZWlnaHQnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0d28gbmluZXIgbGVmdCcsXG5cdFx0XHRcdCdzbmFtZSc6ICcyOUwnLFxuXHRcdFx0XHQnZGlyJzogMjkwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGNpcmN1aXQgdHJhaW5pbmcgZnJlcXVlbmN5IG9uZSB0d28gdGhyZWUgZGVjaW1hbCBzaXgnXG5cdFx0XHR9XG5cdFx0XVxuXHR9XG4gIH1cblxuICBwcml2YXRlIGFkOiBzdHJpbmcgPSAnWVNDTic7XG4gIHByaXZhdGUgd2luZERpcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB3aW5kU3RyZW5ndGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgd3g6IFdlYXRoZXIgPSB7fSBhcyBhbnk7XG4gIHByaXZhdGUgcmNvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1heFh3aW5kOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGFycml2YWxzID0gJyc7XG4gIHByaXZhdGUgZGVwYXJ0dXJlcyA9ICcnO1xuICBwcml2YXRlIGNpcmN1aXRzID0gJyc7XG4gIHByaXZhdGUgY2lyY3VpdHNMaWtlbHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBub0NpcmN1aXRzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBzZXRBZChhZDogc3RyaW5nKSB7XG4gIFx0dGhpcy5hZCA9IGFkO1xuICBcdHRoaXMuY2lyY3VpdHNMaWtlbHkgPSB0aGlzLmtub3duQWRzW3RoaXMuYWRdLmNpcmN1aXRzTGlrZWx5O1xuICBcdHRoaXMubWF4WHdpbmQgPSAwO1xuXHR0aGlzLmFycml2YWxzID0gJyc7XG5cdHRoaXMuZGVwYXJ0dXJlcyA9ICcnO1xuXHR0aGlzLmNpcmN1aXRzID0gJyc7XG4gIFx0dGhpcy5yY291bnQgPSAwO1xuICBcdHRoaXMud2luZERpciA9IDA7XG5cdHRoaXMud2luZFN0cmVuZ3RoID0gMDtcbiAgfVxuXG4gIHNldFdpbmQod2luZERpcjogbnVtYmVyLCB3aW5kU3RyZW5ndGg6IG51bWJlcikge1xuICBcdHRoaXMud2luZERpciA9IHdpbmREaXI7XG4gIFx0dGhpcy53aW5kU3RyZW5ndGggPSB3aW5kU3RyZW5ndGg7XG5cdGlmICh0aGlzLndpbmREaXIgPT09IDApIHtcblx0XHR0aGlzLndpbmREaXIgPSAzNjA7XG5cdH1cbiAgfVxuXG4gIHNldFd4KHd4OiBXZWF0aGVyKSB7XG4gIFx0dGhpcy53eCA9IHd4O1xuICBcdHRoaXMubWF4WHdpbmQgPSAwO1xuXHR0aGlzLmFycml2YWxzID0gJyc7XG5cdHRoaXMuZGVwYXJ0dXJlcyA9ICcnO1xuXHR0aGlzLmNpcmN1aXRzID0gJyc7XG4gIFx0dGhpcy5yY291bnQgPSAwO1xuICBcdHRoaXMud2luZERpciA9IDA7XG5cdHRoaXMud2luZFN0cmVuZ3RoID0gMDtcbiAgXHR0aGlzLm5vQ2lyY3VpdHMgPSBmYWxzZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gIFx0cmV0dXJuIHRoaXMua25vd25BZHNbdGhpcy5hZF0ubmFtZTtcbiAgfVxuXG4gIGdldEFsbG93U3BlY2lhbFZGUigpOiBib29sZWFuIHtcbiAgXHRyZXR1cm4gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5hbGxvd1NwZWNpYWxWRlI7XG4gIH1cblxuICBnZXRBcnJpdmFsUnVud2F5KCkgOiBzdHJpbmcge1xuICBcdHJldHVybiB0aGlzLmFycml2YWxzO1xuICB9XG4gIGdldERlcGFydHVyZVJ1bndheSgpIDogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5kZXBhcnR1cmVzO1xuICB9XG4gIGdldENpcmN1aXRSdW53YXkoKSA6IHN0cmluZyB7XG4gIFx0cmV0dXJuIHRoaXMuY2lyY3VpdHM7XG4gIH1cblxuICBnZXRDdXJyZW50T3RoZXIoKTogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5zcGVjcztcbiAgfVxuXG4gIGdldFNwZWNpYWxpdGllcygpIDogc3RyaW5nW10ge1xuICBcdGxldCByZXM6IHN0cmluZ1tdID0gW107XG4gIFx0bGV0IHNwZWNzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5sb2NhbFNwZWNpYWxpdGllcztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGVjcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBzcGVjID0gc3BlY3NbaV07XG5cdFx0aWYgKE1hdGgucmFuZG9tKCkgPCBzcGVjLnByb2IpIHtcblx0XHRcdGlmICgoc3BlYy53eENvbmRpdGlvbnMgPT09ICcqJykgfHwgKHRoaXMud2VhdGhlckhhcyhzcGVjLnd4Q29uZGl0aW9ucykpKSB7XG5cdFx0XHRcdGlmICgoc3BlYy5ydW53YXlzID09PSAnKicpIHx8ICh0aGlzLnJ1bndheXNNYXRjaChzcGVjLnJ1bndheXMpKSkge1xuXHRcdFx0XHRcdHJlcy5wdXNoKHNwZWMuaXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0dGhpcy5zcGVjcyA9IHRoaXMuc2hvcnRoYW5kKHJlcy5qb2luKCcsICcpKTtcblx0cmV0dXJuIHJlcztcbiAgfVxuXG4gIHNob3J0aGFuZChzdDogc3RyaW5nKSA6IHN0cmluZyB7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9kb21lc3RpYy9pZywgJ2RvbScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZGVwYXJ0dXJlcy9pZywgJ2RlcHMnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2Fycml2YWxzL2lnLCAnYXJyJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC93b2xsb25nb25nL2lnLCAnV09MJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9leHBlY3QvaWcsICd4cHQnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3J1bndheS9pZywgJ3J3eScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvb25lL2lnLCAnMScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvdHdvL2lnLCAnMicpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvdGhyZWUvaWcsICczJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9mb3IvaWcsICc0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9mb3VyL2lnLCAnNCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvZml2ZS9pZywgJzUnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2ZpZmUvaWcsICc1Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9zaXgvaWcsICc2Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9zZXZlbi9pZywgJzcnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3NlZmZlbi9pZywgJzcnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2VpZ2h0L2lnLCAnOCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvbmluZXIvaWcsICc5Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC96ZXJvL2lnLCAnMCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvbGVmdC9pZywgJ0wnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL3JpZ2h0L2lnLCAnUicpO1xuXHRyZXR1cm4gc3Q7XG4gIH1cblxuICBzZXROb0NpcmN1aXRzKHY6IGJvb2xlYW4pIHtcbiAgXHR0aGlzLm5vQ2lyY3VpdHMgPSB2O1xuICB9XG5cbiAgd2VhdGhlckhhcyh3eDogc3RyaW5nKSA6IGJvb2xlYW4ge1xuICBcdGlmICh0aGlzLnd4Lnd4ID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAod3gsICdpJyk7XG5cdHJldHVybiByZWdFeHAudGVzdCh0aGlzLnd4Lnd4LmpvaW4oJywnKSk7XG4gIH1cblxuICBydW53YXlzTWF0Y2gocnd5OiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmdldEFjdGl2ZVJ1bndheXMoKTtcblx0bGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAocnd5LCAnaScpO1xuXHRyZXR1cm4gcmVnRXhwLnRlc3Qocnd5cyk7XG4gIH1cblxuICBnZXRSdW53YXlzKCkgOiBzdHJpbmdbXSB7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmtub3duQWRzW3RoaXMuYWRdLnJ1bndheXM7XG5cdGxldCByd3lBcnJheSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJ3eXMubGVuZ3RoOyBpKyspIHtcblx0XHRyd3lBcnJheS5wdXNoKHJ3eXNbaV0uc25hbWUpO1xuXHR9XG5cdHJldHVybiByd3lBcnJheTtcbiAgfVxuXG4gIG11bHRpcGxlUnVud2F5cygpIDogYm9vbGVhbiB7XG4gIFx0dGhpcy5nZXRBY3RpdmVSdW53YXlzKCk7XG5cdHJldHVybiB0aGlzLnJjb3VudCA+IDE7XG4gIH1cblxuICBnZXRLbm93bkFkcygpIHtcbiAgXHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5rbm93bkFkcyk7XG4gIH1cblxuICBnZXRBY3RpdmVSdW53YXlzKCkgOiBzdHJpbmcge1xuXHRsZXQgcnd5c1N0OiBzdHJpbmdbXSA9IFtdO1xuICBcdGxldCByd3lzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5ydW53YXlzO1xuXHR0aGlzLmFycml2YWxzID0gdGhpcy5kZXBhcnR1cmVzID0gdGhpcy5jaXJjdWl0cyA9ICcnO1xuICBcdHRoaXMubWF4WHdpbmQgPSAwO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJ3eXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgcnd5ID0gcnd5c1tpXTtcblx0XHRsZXQgcmVsQW5nID0gTWF0aC5hYnMocnd5LmRpciAtIHRoaXMud2luZERpcik7XG5cdFx0aWYgKHJlbEFuZyA+IDE4MCkge1xuXHRcdFx0cmVsQW5nID0gMzYwIC0gcmVsQW5nO1xuXHRcdH1cblx0XHRpZiAocmVsQW5nIDwgOTApIHtcblx0XHRcdGxldCBzdCA9ICdydW53YXkgJyArIHJ3eS5uYW1lO1xuXHRcdFx0aWYgKHJ3eS5leHRyYSAhPT0gJycpIHtcblx0XHRcdFx0c3QgKz0gJyAnICsgcnd5LmV4dHJhO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHN0Lm1hdGNoKC9hcnJpdmFsL2kpKSB7XG5cdFx0XHRcdHRoaXMuYXJyaXZhbHMgPSByd3kuc25hbWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoc3QubWF0Y2goL2RlcGFydHVyZS9pKSkge1xuXHRcdFx0XHR0aGlzLmRlcGFydHVyZXMgPSByd3kuc25hbWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoc3QubWF0Y2goL2NpcmN1aXRzL2kpKSB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdHMgPSByd3kuc25hbWU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJ3eXNTdC5wdXNoKHN0KTtcblx0XHRcdGxldCB4dyA9IHRoaXMuZ2V0WFdpbmQocnd5LmRpciwgdGhpcy53aW5kRGlyLCB0aGlzLndpbmRTdHJlbmd0aCk7XG5cdFx0XHRpZiAoeHcgPiB0aGlzLm1heFh3aW5kKSB7XG5cdFx0XHRcdHRoaXMubWF4WHdpbmQgPSB4dztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKCh0aGlzLmNpcmN1aXRzID09PSAnJykgJiYgKHRoaXMuY2lyY3VpdHNMaWtlbHkpICYmICghIHRoaXMubm9DaXJjdWl0cykpIHtcblx0XHR0aGlzLmNpcmN1aXRzID0gdGhpcy5hcnJpdmFscztcblx0fVxuXHRpZiAodGhpcy5ub0NpcmN1aXRzKSB7XG5cdFx0dGhpcy5jaXJjdWl0cyA9ICcnO1xuXHR9XG5cdHRoaXMucmNvdW50ID0gcnd5c1N0Lmxlbmd0aDtcblx0cmV0dXJuIHJ3eXNTdC5qb2luKCcsICcpO1xuICB9XG5cbiAgZ2V0Q2lyY3VpdHNMaWtlbHkoKTogYm9vbGVhbiB7XG4gIFx0cmV0dXJuIHRoaXMuY2lyY3VpdHNMaWtlbHk7XG4gIH1cblxuICBnZXRYV2luZChyd3lEaXIsIHdpbmREaXIsIHdpbmRTdHJlbmd0aCk6IG51bWJlciB7XG4gIFx0bGV0IHJlbEFuZyA9IE1hdGguYWJzKHJ3eURpciAtIHdpbmREaXIpO1xuXHRpZiAocmVsQW5nID4gMTgwKSB7XG5cdFx0cmVsQW5nID0gMzYwIC0gcmVsQW5nO1xuXHR9XG5cdGxldCB4V2luZCA9IE1hdGgucm91bmQoTWF0aC5hYnMod2luZFN0cmVuZ3RoICogTWF0aC5zaW4oTWF0aC5QSSAqIHJlbEFuZy8xODApKSk7XG5cdHJldHVybiB4V2luZDtcbiAgfVxuXG4gIGdldE1heFh3aW5kQXNTaG9ydGhhbmQoKTogc3RyaW5nIHtcbiAgXHRpZiAodGhpcy5tYXhYd2luZCA+PSA3KSB7XG4gIFx0XHRyZXR1cm4gJ3h3JyArIHRoaXMubWF4WHdpbmQudG9TdHJpbmcoKTtcblx0fSBlbHNlIHtcbiAgXHRcdHJldHVybiAnJztcblx0fVxuICB9XG5cbiAgZ2V0TWF4WHdpbmQoKTogbnVtYmVyIHtcbiAgXHRyZXR1cm4gdGhpcy5tYXhYd2luZDtcbiAgfVxuXG4gIHNlcnZpY2VzQXNTdHJpbmcoKTogc3RyaW5nIHtcbiAgXHRsZXQgc2VydmljZXMgPSB0aGlzLmtub3duQWRzW3RoaXMuYWRdLnNlcnZpY2VzO1xuXHRsZXQgc3RBID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0c3RBLnB1c2goc2VydmljZXNbaV0pO1xuXHR9XG5cdGxldCBzdCA9IHN0QS5qb2luKCcsICcpO1xuXHRzdCArPSAnIG9yICcgKyBzZXJ2aWNlc1tzZXJ2aWNlcy5sZW5ndGggLSAxXTtcbiAgXHRyZXR1cm4gc3Q7XG4gIH1cbn1cbiJdfQ==