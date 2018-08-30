"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AerodromesService = /** @class */ (function () {
    function AerodromesService() {
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
    }
    AerodromesService.prototype.setAd = function (ad) {
        this.ad = ad;
        this.circuitsLikely = this.knownAds[this.ad].circuitsLikely;
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
        return res;
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
        if ((this.circuits === '') && (this.circuitsLikely)) {
            this.circuits = this.arrivals;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVyb2Ryb21lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVyb2Ryb21lcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBSzNDO0lBMExFO1FBeExRLGFBQVEsR0FBUTtZQUN2QixNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUM7Z0JBQ3pDLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixjQUFjLEVBQUUsS0FBSztnQkFDckIsaUJBQWlCLEVBQUU7b0JBQ2xCO3dCQUNRLElBQUksRUFBRSwrRUFBK0U7d0JBQzVGLFlBQVksRUFBRSxlQUFlO3dCQUM3QixPQUFPLEVBQUUsR0FBRzt3QkFDWixJQUFJLEVBQUUsSUFBSTtxQkFDVjtvQkFDRDt3QkFDQyxJQUFJLEVBQUUsd0lBQXdJO3dCQUM5SSxZQUFZLEVBQUUsR0FBRzt3QkFDakIsT0FBTyxFQUFFLEdBQUc7d0JBQ1osSUFBSSxFQUFFLElBQUk7cUJBQ1Y7b0JBQ0Q7d0JBQ0MsSUFBSSxFQUFFLHNLQUFzSzt3QkFDNUssWUFBWSxFQUFFLEdBQUc7d0JBQ2pCLE9BQU8sRUFBRSxHQUFHO3dCQUNaLElBQUksRUFBRSxJQUFJO3FCQUNWO29CQUNEO3dCQUNDLElBQUksRUFBRSxtRUFBbUU7d0JBQ3pFLFlBQVksRUFBRSxHQUFHO3dCQUNqQixPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxJQUFJLEVBQUUsSUFBSTtxQkFDVjtpQkFDRDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1I7d0JBQ0MsTUFBTSxFQUFFLDJCQUEyQjt3QkFDbkMsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLEtBQUssRUFBRSxHQUFHO3dCQUNWLE9BQU8sRUFBRSx1R0FBdUc7cUJBQ2hIO29CQUNEO3dCQUNDLE1BQU0sRUFBRSx3QkFBd0I7d0JBQ2hDLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixL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Q0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUVELDRDQUFnQixHQUFoQjtRQUNDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDOUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixFQUFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBaFZVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFOztPQUNBLGlCQUFpQixDQWlWN0I7SUFBRCx3QkFBQztDQUFBLEFBalZELElBaVZDO0FBalZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdlYXRoZXIsIENsb3VkIH0gZnJvbSAnLi4vd2VhdGhlci93ZWF0aGVyLmludGVyZmFjZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFlcm9kcm9tZXNTZXJ2aWNlIHtcblxuICBwcml2YXRlIGtub3duQWRzOiBhbnkgPSB7XG4gIFx0J1lTU1knOiB7XG5cdFx0bmFtZTogJ1N5ZG5leScsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJywgJ2FwcHJvYWNoJ10sXG5cdFx0YWxsb3dTcGVjaWFsVkZSOiBmYWxzZSxcblx0XHRjaXJjdWl0c0xpa2VseTogZmFsc2UsXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtcblx0XHRcdHtcblx0ICAgICAgIFx0XHRcdGl0ZW06ICdDdW11bG9uaW1idXMgYW5kIGxpZ2h0bmluZyBvYnNlcnZlZCB0byB0aGUgc291dGguIHdhdGVyc3BvdXQgb2JzZXJ2ZWQgdG8gZWFzdCcsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJ3RodW5kZXJzdG9ybXMnLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMDVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdiZXR3ZWVuIHRpbWUgemVybyB0d28gemVybyB6ZXJvIGFuZCB0aW1lIHplcm8gZm91ciBvbmUgZmlmZSBleHBlY3QgbWlub3IgZGVsYXlzIGR1ZSBBZXJvZHJvbWUgRW1lcmdlbmN5IFBlcnNvbm5lbCBleGVyY2lzZSBpbiBwcm9ncmVzcycsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMDJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdjdXJmZXcgcmVzdHJpY3Rpb25zIGFwcGx5IGZyb20gb25lIHR3byBmb3VyIGZpdmUsIGFycml2YWxzIHJ1bndheSB0aHJlZSBmb3IgbGVmdCBhZnRlciBvbmUgdGhyZWUgemVybyB6ZXJvLCBhbGwgZGVwYXJ0dXJlcyBvbmUgc2l4IGRpcmVjdGlvbiBhZnRlciBvbmUgdHdvIGZvdXIgZml2ZScsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMTBcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdET01FU1RJQyBKRVQgREVQYXJ0dXJlcyBWSUEgd29sbG9uZ29uZyBleHBlY3QgcnVud2F5IG9uZSBzaXggbGVmdCcsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnb25lIHNpeCBsZWZ0IGFuZCByaWdodCcsXG5cdFx0XHRcdHByb2I6IDAuNDBcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRydW53YXlzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ3RocmVlIGZvdXIgbGVmdCBhbmQgcmlnaHQnLFxuXHRcdFx0XHQnc25hbWUnOiAnMzRMIGFuZCAzNFInLFxuXHRcdFx0XHQnZGlyJzogMzQwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIHBhcmFsbGVsIHJ1bndheSBvcGVyYXRpb25zIGluIHByb2dyZXNzIGluZGVwZW5kZW50IGRlcGFydHVyZXMgaW4gcHJvZ3Jlc3MnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICdvbmUgc2l4IGxlZnQgYW5kIHJpZ2h0Jyxcblx0XHRcdFx0J3NuYW1lJzogJzE2TCBhbmQgMTZSJyxcblx0XHRcdFx0J2Rpcic6IDE2MCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcyBwYXJhbGxlbCBydW53YXkgb3BlcmF0aW9ucyBpbiBwcm9ncmVzcyBpbmRlcGVuZGVudCBkZXBhcnR1cmVzIGluIHByb2dyZXNzJ1xuXHRcdFx0fVxuXHRcdF1cblx0fSxcbiAgXHQnWVNDTic6IHtcblx0XHRuYW1lOiAnQ2FtZGVuJyxcblx0XHRzZXJ2aWNlczogWyd0b3dlcicsICdncm91bmQnXSxcblx0XHRhbGxvd1NwZWNpYWxWRlI6IHRydWUsXG5cdFx0Y2lyY3VpdHNMaWtlbHk6IHRydWUsXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtcblx0XHRcdHsgaXRlbTogJ0dsaWRpbmcgb3BlcmF0aW9ucyBpbiBwcm9ncmVzcycsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJ1ZGUicsXG5cdFx0XHRcdHJ1bndheXM6ICcqJyxcblx0XHRcdCAgICAgICBcdHByb2I6IDAuNTBcblx0XHRcdH1cblx0XHRdLFxuXHRcdHJ1bndheXM6IFtcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAnemVybyBzaXgnLFxuXHRcdFx0XHQnc25hbWUnOiAnMDYnLFxuXHRcdFx0XHQnZGlyJzogNjAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0d28gZm91cicsXG5cdFx0XHRcdCdzbmFtZSc6ICcyNCcsXG5cdFx0XHRcdCdkaXInOiAyNDAsXG5cdFx0XHRcdCdleHRyYSc6ICdyaWdodCBoYW5kIGNpcmN1aXRzIGZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcydcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ29uZSB6ZXJvJyxcblx0XHRcdFx0J3NuYW1lJzogJzEwJyxcblx0XHRcdFx0J2Rpcic6IDExMCxcblx0XHRcdFx0J2V4dHJhJzogJ2luIHVzZSdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ3R3byBlaWdodCcsXG5cdFx0XHRcdCdzbmFtZSc6ICcyOCcsXG5cdFx0XHRcdCdkaXInOiAyODAsXG5cdFx0XHRcdCdleHRyYSc6ICdpbiB1c2UnXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuICBcdCdZU0NCJzoge1xuXHRcdG5hbWU6ICdDYW5iZXJyYScsXG5cdFx0c2VydmljZXM6IFsndG93ZXInLCAnZ3JvdW5kJywgJ2FwcHJvYWNoJ10sXG5cdFx0YWxsb3dTcGVjaWFsVkZSOiBmYWxzZSxcblx0XHRjaXJjdWl0c0xpa2VseTogdHJ1ZSxcblx0XHRsb2NhbFNwZWNpYWxpdGllczogW1xuXHRcdFx0e1xuXHQgICAgICAgXHRcdFx0aXRlbTogJ1NJR01FVCBDVVJSRU5UIEZPUiBTRVZlcmUgVFVSQnVsZW5jZSBmb3JlY2FzdCBiZXR3ZWVuIHRlbiB0aG91c2FuZCBmZWV0IGFuZCBmbGlnaHQgbGV2ZWwgdHdvIGZvdXIgemVybycsXG5cdFx0XHRcdHd4Q29uZGl0aW9uczogJyonLFxuXHRcdFx0XHRydW53YXlzOiAnKicsXG5cdFx0XHRcdHByb2I6IDAuMTVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW06ICdNRU4gYW5kIEhBTkQgVE9PTFMgT1BFUkFUSU5HIFRPIFRIRSBFREdFIE9GIHJ1bndheSBvbmUgc2VmZmVuJyxcblx0XHRcdFx0d3hDb25kaXRpb25zOiAnKicsXG5cdFx0XHRcdHJ1bndheXM6ICdvbmUgc2VmZmVuJyxcblx0XHRcdFx0cHJvYjogMC4yMFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aXRlbTogJ01FTiBhbmQgSEFORCBUT09MUyBPUEVSQVRJTkcgVE8gVEhFIEVER0UgT0YgcnVud2F5IHRocmVlIGZpZmUnLFxuXHRcdFx0XHR3eENvbmRpdGlvbnM6ICcqJyxcblx0XHRcdFx0cnVud2F5czogJ3RocmVlIGZpZmUnLFxuXHRcdFx0XHRwcm9iOiAwLjIwXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRydW53YXlzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ3RocmVlIGZpZmUnLFxuXHRcdFx0XHQnc25hbWUnOiAnMzUnLFxuXHRcdFx0XHQnZGlyJzogMzUwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAnb25lIHNlZmZlbicsXG5cdFx0XHRcdCdzbmFtZSc6ICcxNycsXG5cdFx0XHRcdCdkaXInOiAxNzAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0aHJlZSB6ZXJvJyxcblx0XHRcdFx0J3NuYW1lJzogJzMwJyxcblx0XHRcdFx0J2Rpcic6IDMwMCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBhcnJpdmFscyBhbmQgZGVwYXJ0dXJlcydcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ29uZSB0d28nLFxuXHRcdFx0XHQnc25hbWUnOiAnMTInLFxuXHRcdFx0XHQnZGlyJzogMTIwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzJ1xuXHRcdFx0fVxuXHRcdF1cblx0fSxcbiAgXHQnWVNCSyc6IHtcblx0XHRuYW1lOiAnQmFua3N0b3duJyxcblx0XHRzZXJ2aWNlczogWyd0b3dlcicsICdncm91bmQnXSxcblx0XHRhbGxvd1NwZWNpYWxWRlI6IHRydWUsXG5cdFx0Y2lyY3VpdHNMaWtlbHk6IHRydWUsXG5cdFx0bG9jYWxTcGVjaWFsaXRpZXM6IFtdLFxuXHRcdHJ1bndheXM6IFtcblx0XHRcdHtcblx0XHRcdFx0J25hbWUnOiAnb25lIG9uZSBsZWZ0IGFuZCBvbmUgb25lIGNlbnRyZScsXG5cdFx0XHRcdCdzbmFtZSc6ICcxMUwgYW5kIDExQycsXG5cdFx0XHRcdCdkaXInOiAxMTAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgYXJyaXZhbHMgYW5kIGRlcGFydHVyZXMgZnJlcXVlbmN5IG9uZSB0aHJlZSB0d28gZGVjaW1hbCBlaWdodCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ29uZSBvbmUgcmlnaHQnLFxuXHRcdFx0XHQnc25hbWUnOiAnMTFSJyxcblx0XHRcdFx0J2Rpcic6IDExMCxcblx0XHRcdFx0J2V4dHJhJzogJ2ZvciBjaXJjdWl0IHRyYWluaW5nIHJpZ2h0IGhhbmQgY2lyY3VpdHMgZnJlcXVlbmN5IG9uZSB0d28gdGhyZWUgZGVjaW1hbCBzaXgnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQnbmFtZSc6ICd0d28gbmluZXIgcmlnaHQgYW5kIHR3byBuaW5lciBjZW50cmUnLFxuXHRcdFx0XHQnc25hbWUnOiAnMjlSIGFuZCAyOUMnLFxuXHRcdFx0XHQnZGlyJzogMjkwLFxuXHRcdFx0XHQnZXh0cmEnOiAnZm9yIGFycml2YWxzIGFuZCBkZXBhcnR1cmVzIHJpZ2h0IGhhbmQgY2lyY3VpdHMgZnJlcXVlbmN5IG9uZSB0aHJlZSB0d28gZGVjaW1hbCBlaWdodCdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCduYW1lJzogJ3R3byBuaW5lciBsZWZ0Jyxcblx0XHRcdFx0J3NuYW1lJzogJzI5TCcsXG5cdFx0XHRcdCdkaXInOiAyOTAsXG5cdFx0XHRcdCdleHRyYSc6ICdmb3IgY2lyY3VpdCB0cmFpbmluZyBmcmVxdWVuY3kgb25lIHR3byB0aHJlZSBkZWNpbWFsIHNpeCdcblx0XHRcdH1cblx0XHRdXG5cdH1cbiAgfVxuXG4gIHByaXZhdGUgYWQ6IHN0cmluZyA9ICdZU0NOJztcbiAgcHJpdmF0ZSB3aW5kRGlyOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHdpbmRTdHJlbmd0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSB3eDogV2VhdGhlciA9IHt9IGFzIGFueTtcbiAgcHJpdmF0ZSByY291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbWF4WHdpbmQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgYXJyaXZhbHMgPSAnJztcbiAgcHJpdmF0ZSBkZXBhcnR1cmVzID0gJyc7XG4gIHByaXZhdGUgY2lyY3VpdHMgPSAnJztcbiAgcHJpdmF0ZSBjaXJjdWl0c0xpa2VseTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgc2V0QWQoYWQ6IHN0cmluZykge1xuICBcdHRoaXMuYWQgPSBhZDtcbiAgXHR0aGlzLmNpcmN1aXRzTGlrZWx5ID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5jaXJjdWl0c0xpa2VseTtcbiAgfVxuXG4gIHNldFdpbmQod2luZERpcjogbnVtYmVyLCB3aW5kU3RyZW5ndGg6IG51bWJlcikge1xuICBcdHRoaXMud2luZERpciA9IHdpbmREaXI7XG4gIFx0dGhpcy53aW5kU3RyZW5ndGggPSB3aW5kU3RyZW5ndGg7XG5cdGlmICh0aGlzLndpbmREaXIgPT09IDApIHtcblx0XHR0aGlzLndpbmREaXIgPSAzNjA7XG5cdH1cbiAgfVxuXG4gIHNldFd4KHd4OiBXZWF0aGVyKSB7XG4gIFx0dGhpcy53eCA9IHd4O1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgXHRyZXR1cm4gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5uYW1lO1xuICB9XG5cbiAgZ2V0QWxsb3dTcGVjaWFsVkZSKCk6IGJvb2xlYW4ge1xuICBcdHJldHVybiB0aGlzLmtub3duQWRzW3RoaXMuYWRdLmFsbG93U3BlY2lhbFZGUjtcbiAgfVxuXG4gIGdldEFycml2YWxSdW53YXkoKSA6IHN0cmluZyB7XG4gIFx0cmV0dXJuIHRoaXMuYXJyaXZhbHM7XG4gIH1cbiAgZ2V0RGVwYXJ0dXJlUnVud2F5KCkgOiBzdHJpbmcge1xuICBcdHJldHVybiB0aGlzLmRlcGFydHVyZXM7XG4gIH1cbiAgZ2V0Q2lyY3VpdFJ1bndheSgpIDogc3RyaW5nIHtcbiAgXHRyZXR1cm4gdGhpcy5jaXJjdWl0cztcbiAgfVxuXG4gIGdldFNwZWNpYWxpdGllcygpIDogc3RyaW5nW10ge1xuICBcdGxldCByZXM6IHN0cmluZ1tdID0gW107XG4gIFx0bGV0IHNwZWNzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5sb2NhbFNwZWNpYWxpdGllcztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGVjcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBzcGVjID0gc3BlY3NbaV07XG5cdFx0aWYgKE1hdGgucmFuZG9tKCkgPCBzcGVjLnByb2IpIHtcblx0XHRcdGlmICgoc3BlYy53eENvbmRpdGlvbnMgPT09ICcqJykgfHwgKHRoaXMud2VhdGhlckhhcyhzcGVjLnd4Q29uZGl0aW9ucykpKSB7XG5cdFx0XHRcdGlmICgoc3BlYy5ydW53YXlzID09PSAnKicpIHx8ICh0aGlzLnJ1bndheXNNYXRjaChzcGVjLnJ1bndheXMpKSkge1xuXHRcdFx0XHRcdHJlcy5wdXNoKHNwZWMuaXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlcztcbiAgfVxuXG4gIHdlYXRoZXJIYXMod3g6IHN0cmluZykgOiBib29sZWFuIHtcbiAgXHRpZiAodGhpcy53eC53eCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGxldCByZWdFeHAgPSBuZXcgUmVnRXhwKHd4LCAnaScpO1xuXHRyZXR1cm4gcmVnRXhwLnRlc3QodGhpcy53eC53eC5qb2luKCcsJykpO1xuICB9XG5cbiAgcnVud2F5c01hdGNoKHJ3eTogc3RyaW5nKSA6IGJvb2xlYW4ge1xuICBcdGxldCByd3lzID0gdGhpcy5nZXRBY3RpdmVSdW53YXlzKCk7XG5cdGxldCByZWdFeHAgPSBuZXcgUmVnRXhwKHJ3eSwgJ2knKTtcblx0cmV0dXJuIHJlZ0V4cC50ZXN0KHJ3eXMpO1xuICB9XG5cbiAgZ2V0UnVud2F5cygpIDogc3RyaW5nW10ge1xuICBcdGxldCByd3lzID0gdGhpcy5rbm93bkFkc1t0aGlzLmFkXS5ydW53YXlzO1xuXHRsZXQgcnd5QXJyYXkgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByd3lzLmxlbmd0aDsgaSsrKSB7XG5cdFx0cnd5QXJyYXkucHVzaChyd3lzW2ldLnNuYW1lKTtcblx0fVxuXHRyZXR1cm4gcnd5QXJyYXk7XG4gIH1cblxuICBtdWx0aXBsZVJ1bndheXMoKSA6IGJvb2xlYW4ge1xuICBcdHRoaXMuZ2V0QWN0aXZlUnVud2F5cygpO1xuXHRyZXR1cm4gdGhpcy5yY291bnQgPiAxO1xuICB9XG5cbiAgZ2V0S25vd25BZHMoKSB7XG4gIFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMua25vd25BZHMpO1xuICB9XG5cbiAgZ2V0QWN0aXZlUnVud2F5cygpIDogc3RyaW5nIHtcblx0bGV0IHJ3eXNTdDogc3RyaW5nW10gPSBbXTtcbiAgXHRsZXQgcnd5cyA9IHRoaXMua25vd25BZHNbdGhpcy5hZF0ucnVud2F5cztcblx0dGhpcy5hcnJpdmFscyA9IHRoaXMuZGVwYXJ0dXJlcyA9IHRoaXMuY2lyY3VpdHMgPSAnJztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByd3lzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IHJ3eSA9IHJ3eXNbaV07XG5cdFx0bGV0IHJlbEFuZyA9IE1hdGguYWJzKHJ3eS5kaXIgLSB0aGlzLndpbmREaXIpO1xuXHRcdGlmIChyZWxBbmcgPiAxODApIHtcblx0XHRcdHJlbEFuZyA9IDM2MCAtIHJlbEFuZztcblx0XHR9XG5cdFx0aWYgKHJlbEFuZyA8IDkwKSB7XG5cdFx0XHRsZXQgc3QgPSAncnVud2F5ICcgKyByd3kubmFtZTtcblx0XHRcdGlmIChyd3kuZXh0cmEgIT09ICcnKSB7XG5cdFx0XHRcdHN0ICs9ICcgJyArIHJ3eS5leHRyYTtcblx0XHRcdH1cblx0XHRcdGlmIChzdC5tYXRjaCgvYXJyaXZhbC9pKSkge1xuXHRcdFx0XHR0aGlzLmFycml2YWxzID0gcnd5LnNuYW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHN0Lm1hdGNoKC9kZXBhcnR1cmUvaSkpIHtcblx0XHRcdFx0dGhpcy5kZXBhcnR1cmVzID0gcnd5LnNuYW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHN0Lm1hdGNoKC9jaXJjdWl0cy9pKSkge1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRzID0gcnd5LnNuYW1lO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyd3lzU3QucHVzaChzdCk7XG5cdFx0XHRsZXQgeHcgPSB0aGlzLmdldFhXaW5kKHJ3eS5kaXIsIHRoaXMud2luZERpciwgdGhpcy53aW5kU3RyZW5ndGgpO1xuXHRcdFx0aWYgKHh3ID4gdGhpcy5tYXhYd2luZCkge1xuXHRcdFx0XHR0aGlzLm1heFh3aW5kID0geHc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGlmICgodGhpcy5jaXJjdWl0cyA9PT0gJycpICYmICh0aGlzLmNpcmN1aXRzTGlrZWx5KSkge1xuXHRcdHRoaXMuY2lyY3VpdHMgPSB0aGlzLmFycml2YWxzO1xuXHR9XG5cdHRoaXMucmNvdW50ID0gcnd5c1N0Lmxlbmd0aDtcblx0cmV0dXJuIHJ3eXNTdC5qb2luKCcsICcpO1xuICB9XG5cbiAgZ2V0Q2lyY3VpdHNMaWtlbHkoKTogYm9vbGVhbiB7XG4gIFx0cmV0dXJuIHRoaXMuY2lyY3VpdHNMaWtlbHk7XG4gIH1cblxuICBnZXRYV2luZChyd3lEaXIsIHdpbmREaXIsIHdpbmRTdHJlbmd0aCk6IG51bWJlciB7XG4gIFx0bGV0IHJlbEFuZyA9IE1hdGguYWJzKHJ3eURpciAtIHdpbmREaXIpO1xuXHRpZiAocmVsQW5nID4gMTgwKSB7XG5cdFx0cmVsQW5nID0gMzYwIC0gcmVsQW5nO1xuXHR9XG5cdGxldCB4V2luZCA9IE1hdGgucm91bmQoTWF0aC5hYnMod2luZFN0cmVuZ3RoICogTWF0aC5zaW4oTWF0aC5QSSAqIHJlbEFuZy8xODApKSk7XG5cdHJldHVybiB4V2luZDtcbiAgfVxuXG4gIGdldE1heFh3aW5kKCkge1xuICBcdHJldHVybiB0aGlzLm1heFh3aW5kO1xuICB9XG5cbiAgc2VydmljZXNBc1N0cmluZygpOiBzdHJpbmcge1xuICBcdGxldCBzZXJ2aWNlcyA9IHRoaXMua25vd25BZHNbdGhpcy5hZF0uc2VydmljZXM7XG5cdGxldCBzdEEgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNlcy5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRzdEEucHVzaChzZXJ2aWNlc1tpXSk7XG5cdH1cblx0bGV0IHN0ID0gc3RBLmpvaW4oJywgJyk7XG5cdHN0ICs9ICcgb3IgJyArIHNlcnZpY2VzW3NlcnZpY2VzLmxlbmd0aCAtIDFdO1xuICBcdHJldHVybiBzdDtcbiAgfVxufVxuIl19