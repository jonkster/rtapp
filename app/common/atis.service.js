"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var weather_service_1 = require("../weather/weather.service");
var question_service_1 = require("../common/question.service");
var speak_service_1 = require("../common/speak.service");
var aerodromes_service_1 = require("../aerodromes/aerodromes.service");
var CommonAtisService = /** @class */ (function () {
    function CommonAtisService(weatherService, speakService, questionService, aerodromesService) {
        this.weatherService = weatherService;
        this.speakService = speakService;
        this.questionService = questionService;
        this.aerodromesService = aerodromesService;
        this.ident = '';
        this.approach = '';
        this.currentAtis = {};
    }
    CommonAtisService.prototype.getCurrentIdent = function () {
        return this.ident;
    };
    CommonAtisService.prototype.shorthand = function (st) {
        st = st.replace(/instrument/ig, 'inst');
        st = st.replace(/approach/ig, 'app');
        return st;
    };
    CommonAtisService.prototype.getCurrentApproach = function () {
        return this.shorthand(this.approach);
    };
    CommonAtisService.prototype.getCurrentTemp = function () {
        return this.weatherService.getCurrentTemp();
    };
    CommonAtisService.prototype.getCurrentRunways = function () {
        var rwys = this.aerodromesService.getRunwayShorthand();
        return rwys;
    };
    CommonAtisService.prototype.getCurrentWind = function () {
        return this.weatherService.windAsShorthand();
    };
    CommonAtisService.prototype.getCurrentVis = function () {
        return this.weatherService.visAsShorthand();
    };
    CommonAtisService.prototype.getCurrentWeather = function () {
        return this.weatherService.wxAsShorthand();
    };
    CommonAtisService.prototype.getCurrentCloud = function () {
        return this.weatherService.cloudAsShorthand();
    };
    CommonAtisService.prototype.getCurrentQNH = function () {
        return this.weatherService.qnhAsShorthand();
    };
    CommonAtisService.prototype.getCurrentOther = function () {
        return this.aerodromesService.getCurrentOther();
    };
    CommonAtisService.prototype.getShorthandAtis = function () {
        return this.shorthandAtis(this.currentAtis);
    };
    CommonAtisService.prototype.shorthandAtis = function (atis) {
        var shorthand = [];
        var bit = atis.approach;
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
        if (!atis.weather.match(/CAVOK/)) {
            bit = atis.visibility;
            bit = bit.replace(/greater than 10 kilometres/ig, ">10km");
            bit = bit.replace(/reducing to/ig, "↓");
            bit = bit.replace(/kilometres/ig, "km");
            bit = bit.replace(/metres/ig, "m");
            shorthand.push(bit);
        }
        bit = atis.weather;
        shorthand.push(bit);
        if (!atis.weather.match(/CAVOK/)) {
            bit = atis.cloud;
            bit = bit.replace(/broken/ig, "bkn");
            bit = bit.replace(/overcast/ig, "ovc");
            bit = bit.replace(/scattered/ig, "sct");
            bit = bit.replace(/isolated/ig, "iso");
            shorthand.push('CLD ' + bit);
        }
        bit = atis.temp;
        shorthand.push('T' + bit);
        bit = atis.qnh;
        shorthand.push('Q' + bit);
        var s = shorthand.join("\n");
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
    };
    CommonAtisService.prototype.generateAtisNew = function (level) {
        var wx = this.weatherService.createNewWeather();
        var adName = this.aerodromesService.getName();
        this.aerodromesService.setWind(wx.windDirection, wx.windStrength);
        var atis = {
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
        };
        atis.shorthand = this.shorthandAtis(atis);
        console.log(atis);
        this.currentAtis = atis;
    };
    CommonAtisService.prototype.windAsWords = function (st) {
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
    };
    CommonAtisService.prototype.surfaceAsWords = function (st) {
        st = st.replace(/WET/ig, 'runway wet');
        st = st.replace(/DAMP/ig, 'runway wet');
        st = st.replace(/FLOODED/ig, 'runway flooded');
        st = st.replace(/WATER PATCHES/ig, 'water patches on runway');
        return st;
    };
    CommonAtisService.prototype.visAsWords = function (st) {
        st = st.replace(/ 10 /g, ' ten ');
        st = st.replace(/000 /g, 'thousand ');
        st = st.replace(/00 /g, 'hundred ');
        st = this.windAsWords(st);
        return st;
    };
    CommonAtisService.prototype.runwaysAsWords = function (st) {
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
    };
    CommonAtisService.prototype.atisAsWords = function () {
        var aLines = [];
        var atis = this.currentAtis;
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
        var text = aLines.join(',');
        text = text.replace(/-x-/g, '');
        text = text.replace(/,,+/g, ',');
        return text;
    };
    CommonAtisService.prototype.generateAtis = function (level) {
        this.generateAtisNew(level);
        var words = this.atisAsWords();
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
    };
    CommonAtisService.prototype.getIdent = function () {
        var chIndex = Math.round(Math.random() * 7);
        var ch = String.fromCharCode(chIndex + 65);
        this.ident = ch;
        return this.speakService.alphabet(ch);
    };
    CommonAtisService.prototype.toNumbers = function (n) {
        var map = {
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
        var nst = n.toString();
        var d = nst.split('');
        var response = [];
        for (var i = 0; i < d.length; i++) {
            var dst = d[i];
            var dPhon = map[dst];
            if (dPhon !== undefined) {
                response.push(dPhon);
            }
            else {
                response.push(dst);
            }
        }
        return response.join(' ');
    };
    CommonAtisService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [weather_service_1.WeatherService,
            speak_service_1.CommonSpeakService,
            question_service_1.CommonQuestionService,
            aerodromes_service_1.AerodromesService])
    ], CommonAtisService);
    return CommonAtisService;
}());
exports.CommonAtisService = CommonAtisService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRpcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRpcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhEQUE0RDtBQUU1RCwrREFBbUU7QUFDbkUseURBQTZEO0FBQzdELHVFQUFxRTtBQUtyRTtJQU9FLDJCQUFvQixjQUE4QixFQUN6QyxZQUFnQyxFQUNoQyxlQUFzQyxFQUN0QyxpQkFBb0M7UUFIekIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3pDLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBdUI7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVJyQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsZ0JBQVcsR0FBa0IsRUFBUyxDQUFDO0lBTUUsQ0FBQztJQUUzQywyQ0FBZSxHQUF0QjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFTyxxQ0FBUyxHQUFqQixVQUFrQixFQUFVO1FBQzNCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFTSw4Q0FBa0IsR0FBekI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLDBDQUFjLEdBQXJCO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVNLDZDQUFpQixHQUF4QjtRQUNDLElBQUksSUFBSSxHQUFHLElBQUks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QUUsTUFBTTtZQUNYLEdBQUcsRUFBRSxLQUFLO1lBQ1YsR0FBRyxFQUFFLFFBQVE7WUFDYixHQUFHLEVBQUUsT0FBTztZQUNaLEdBQUcsRUFBRSxPQUFPO1NBQ1gsQ0FBQztRQUNILElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQztRQUNGLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBNWJZLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQVF5QixnQ0FBYztZQUMzQixrQ0FBa0I7WUFDZix3Q0FBcUI7WUFDbkIsc0NBQWlCO09BVmxDLGlCQUFpQixDQThiN0I7SUFBRCx3QkFBQztDQUFBLEFBOWJELElBOGJDO0FBOWJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdlYXRoZXJTZXJ2aWNlIH0gZnJvbSAnLi4vd2VhdGhlci93ZWF0aGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2VhdGhlciwgQ2xvdWQgfSBmcm9tICcuLi93ZWF0aGVyL3dlYXRoZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vblF1ZXN0aW9uU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vcXVlc3Rpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uU3BlYWtTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9zcGVhay5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBZXJvZHJvbWVzU2VydmljZSB9IGZyb20gXCIuLi9hZXJvZHJvbWVzL2Flcm9kcm9tZXMuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBBdGlzSW50ZXJmYWNlIH0gZnJvbSBcIi4vYXRpcy5pbnRlcmZhY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbW1vbkF0aXNTZXJ2aWNlIHtcblxuICBwcml2YXRlIGlkZW50OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBhcHByb2FjaDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgY3VycmVudEF0aXM6IEF0aXNJbnRlcmZhY2UgPSB7fSBhcyBhbnk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlYXRoZXJTZXJ2aWNlOiBXZWF0aGVyU2VydmljZSxcblx0ICBwcml2YXRlIHNwZWFrU2VydmljZTogQ29tbW9uU3BlYWtTZXJ2aWNlLFxuXHQgIHByaXZhdGUgcXVlc3Rpb25TZXJ2aWNlOiBDb21tb25RdWVzdGlvblNlcnZpY2UsXG5cdCAgcHJpdmF0ZSBhZXJvZHJvbWVzU2VydmljZTogQWVyb2Ryb21lc1NlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50SWRlbnQoKSB7XG5cdCAgcmV0dXJuIHRoaXMuaWRlbnQ7XG4gIH0gIFxuXG4gIHByaXZhdGUgc2hvcnRoYW5kKHN0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBcdHN0ID0gc3QucmVwbGFjZSgvaW5zdHJ1bWVudC9pZywgJ2luc3QnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2FwcHJvYWNoL2lnLCAnYXBwJyk7XG4gIFx0cmV0dXJuIHN0O1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRBcHByb2FjaCgpIHtcblx0ICByZXR1cm4gdGhpcy5zaG9ydGhhbmQodGhpcy5hcHByb2FjaCk7XG4gIH0gIFxuXG4gIHB1YmxpYyBnZXRDdXJyZW50VGVtcCgpIHtcblx0ICByZXR1cm4gdGhpcy53ZWF0aGVyU2VydmljZS5nZXRDdXJyZW50VGVtcCgpO1xuICB9ICBcblxuICBwdWJsaWMgZ2V0Q3VycmVudFJ1bndheXMoKSB7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldFJ1bndheVNob3J0aGFuZCgpO1xuXHRyZXR1cm4gcnd5cztcbiAgfSAgXG5cbiAgcHVibGljIGdldEN1cnJlbnRXaW5kKCkge1xuICBcdHJldHVybiB0aGlzLndlYXRoZXJTZXJ2aWNlLndpbmRBc1Nob3J0aGFuZCgpO1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRWaXMoKSB7XG4gIFx0cmV0dXJuIHRoaXMud2VhdGhlclNlcnZpY2UudmlzQXNTaG9ydGhhbmQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50V2VhdGhlcigpIHtcbiAgXHRyZXR1cm4gdGhpcy53ZWF0aGVyU2VydmljZS53eEFzU2hvcnRoYW5kKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudENsb3VkKCkge1xuICBcdHJldHVybiB0aGlzLndlYXRoZXJTZXJ2aWNlLmNsb3VkQXNTaG9ydGhhbmQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50UU5IKCkge1xuICBcdHJldHVybiB0aGlzLndlYXRoZXJTZXJ2aWNlLnFuaEFzU2hvcnRoYW5kKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudE90aGVyKCkge1xuICBcdHJldHVybiB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEN1cnJlbnRPdGhlcigpO1xuICB9XG5cbiAgcHVibGljIGdldFNob3J0aGFuZEF0aXMoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2hvcnRoYW5kQXRpcyh0aGlzLmN1cnJlbnRBdGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG9ydGhhbmRBdGlzKGF0aXM6IEF0aXNJbnRlcmZhY2UpOiBzdHJpbmcge1xuICBcdGxldCBzaG9ydGhhbmQ6IHN0cmluZ1tdID0gW107XG4gIFx0bGV0IGJpdCA9IGF0aXMuYXBwcm9hY2g7XG5cdGlmIChiaXQgIT09ICcnKSB7XG5cdFx0Yml0ID0gYml0LnJlcGxhY2UoL2luc3RydW1lbnQvaWcsICdpbnN0Jyk7XG5cdFx0Yml0ID0gYml0LnJlcGxhY2UoL2FwcHJvYWNoL2lnLCAnYXBwJyk7XG5cdFx0Yml0ID0gYml0LnJlcGxhY2UoL3Zpc3VhbC9pZywgJ3ZpcycpO1xuXHRcdGJpdCA9IGJpdC5yZXBsYWNlKC9pbmRlcGVuZGVudC9pZywgJ2luZCcpO1xuXHRcdHNob3J0aGFuZC5wdXNoKCdleHAgJyArIGJpdCk7XG5cdH1cblxuXHRiaXQgPSBhdGlzLnJ1bndheXM7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC8gYW5kIC9pZywgJysnKTtcblx0Yml0ID0gYml0LnJlcGxhY2UoLyBmb3IgL2lnLCAnJyk7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC8gYXJyaXZhbHMgL2lnLCAnYXJyJyk7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC8gZGVwYXJ0dXJlcyAvaWcsICdkZXAnKTtcblx0Yml0ID0gYml0LnJlcGxhY2UoLyBjaXJjdWl0cyAvaWcsICdjY3RzJyk7XG5cdHNob3J0aGFuZC5wdXNoKGJpdCk7XG5cblx0Yml0ID0gYXRpcy5ydW53YXlzU3VyZmFjZTtcblx0Yml0ID0gYml0LnJlcGxhY2UoL3dhdGVyIHBhdGNoZXMvaWcsICd3YXRlcicpO1xuXHRzaG9ydGhhbmQucHVzaChiaXQpO1xuXG5cdGJpdCA9IGF0aXMuaG9sZGluZztcblx0c2hvcnRoYW5kLnB1c2goYml0KTtcblxuXHRiaXQgPSBhdGlzLnJ1bndheU9wcztcblx0c2hvcnRoYW5kLnB1c2goYml0KTtcblxuXHRiaXQgPSBhdGlzLndpbmQ7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC92YXJpYWJsZS9pZywgJ3ZibCcpO1xuXHRiaXQgPSBiaXQucmVwbGFjZSgvdmFyeWluZyBiZXR3ZWVuL2lnLCAnJyk7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC8gYW5kIC9pZywgJy0nKTtcblx0Yml0ID0gYml0LnJlcGxhY2UoL2RlZ3JlZXMvaWcsICcnKTtcblx0Yml0ID0gYml0LnJlcGxhY2UoL2tub3RzL2lnLCAna3RzJyk7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC9taW5pbXVtL2lnLCAnJyk7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC9tYXhpbXVtL2lnLCAnLScpO1xuXHRiaXQgPSBiaXQucmVwbGFjZSgvXFxzKixcXHMqL2lnLCAnLycpO1xuXHRiaXQgPSBiaXQucmVwbGFjZSgvXFxzKy9pZywgJyAnKTtcblx0c2hvcnRoYW5kLnB1c2goYml0KTtcblxuXHRiaXQgPSBhdGlzLnh3aW5kO1xuXHRiaXQgPSBiaXQucmVwbGFjZSgvY3Jvc3N3aW5kL2lnLCBcInh3XCIpO1xuXHRzaG9ydGhhbmQucHVzaChiaXQpO1xuXG5cdGJpdCA9IGF0aXMudHdpbmQ7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC90YWlsd2luZC9pZywgXCJ0d1wiKTtcblx0c2hvcnRoYW5kLnB1c2goYml0KTtcblxuXHRpZiAoISBhdGlzLndlYXRoZXIubWF0Y2goL0NBVk9LLykpIHtcblx0XHRiaXQgPSBhdGlzLnZpc2liaWxpdHk7XG5cdFx0Yml0ID0gYml0LnJlcGxhY2UoL2dyZWF0ZXIgdGhhbiAxMCBraWxvbWV0cmVzL2lnLCBcIj4xMGttXCIpO1xuXHRcdGJpdCA9IGJpdC5yZXBsYWNlKC9yZWR1Y2luZyB0by9pZywgXCLihpNcIik7XG5cdFx0Yml0ID0gYml0LnJlcGxhY2UoL2tpbG9tZXRyZXMvaWcsIFwia21cIik7XG5cdFx0Yml0ID0gYml0LnJlcGxhY2UoL21ldHJlcy9pZywgXCJtXCIpO1xuXHRcdHNob3J0aGFuZC5wdXNoKGJpdCk7XG5cdH1cblxuXHRiaXQgPSBhdGlzLndlYXRoZXI7XG5cdHNob3J0aGFuZC5wdXNoKGJpdCk7XG5cblx0aWYgKCEgYXRpcy53ZWF0aGVyLm1hdGNoKC9DQVZPSy8pKSB7XG5cdFx0Yml0ID0gYXRpcy5jbG91ZDtcblx0XHRiaXQgPSBiaXQucmVwbGFjZSgvYnJva2VuL2lnLCBcImJrblwiKTtcblx0XHRiaXQgPSBiaXQucmVwbGFjZSgvb3ZlcmNhc3QvaWcsIFwib3ZjXCIpO1xuXHRcdGJpdCA9IGJpdC5yZXBsYWNlKC9zY2F0dGVyZWQvaWcsIFwic2N0XCIpO1xuXHRcdGJpdCA9IGJpdC5yZXBsYWNlKC9pc29sYXRlZC9pZywgXCJpc29cIik7XG5cdFx0c2hvcnRoYW5kLnB1c2goJ0NMRCAnICsgYml0KTtcblx0fVxuXG5cdGJpdCA9IGF0aXMudGVtcDtcblx0c2hvcnRoYW5kLnB1c2goJ1QnK2JpdCk7XG5cblx0Yml0ID0gYXRpcy5xbmg7XG5cdHNob3J0aGFuZC5wdXNoKCdRJytiaXQpO1xuXG5cdGxldCBzID0gc2hvcnRoYW5kLmpvaW4oXCJcXG5cIik7XG5cdHMgPSBzLnJlcGxhY2UoL21heGltdW0vaWcsICdtYXgnKTtcblx0cyA9IHMucmVwbGFjZSgvbWluaW11bS9pZywgJ21heCcpO1xuXHRzID0gcy5yZXBsYWNlKC9rbm90cy9pZywgJ2t0cycpO1xuXHRzID0gcy5yZXBsYWNlKC9ydW53YXkvaWcsICdyd3knKTtcblx0cyA9IHMucmVwbGFjZSgvc2hvd2Vycy9pZywgJ3Nod3JzICcpO1xuXHRzID0gcy5yZXBsYWNlKC90aHVuZGVyc3Rvcm1zL2lnLCAnVFMgJyk7XG5cdHMgPSBzLnJlcGxhY2UoL3JhaW4vaWcsICdyYSAnKTtcblx0cyA9IHMucmVwbGFjZSgvIG9mIC9pZywgJycpO1xuXHRzID0gcy5yZXBsYWNlKC8gaW4gYXJlYS9pZywgJyBhcmVhJyk7XG5cdHMgPSBzLnJlcGxhY2UoLy14LS9nLCAnJyk7XG5cdHMgPSBzLnJlcGxhY2UoL1xcblxcbisvZywgXCJcXG5cIik7XG5cdGJpdCA9IGJpdC5yZXBsYWNlKC9cXHMrL2lnLCAnICcpO1xuXHRyZXR1cm4gcztcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZUF0aXNOZXcobGV2ZWw6IHN0cmluZykge1xuICBcdGxldCB3eDpXZWF0aGVyID0gdGhpcy53ZWF0aGVyU2VydmljZS5jcmVhdGVOZXdXZWF0aGVyKCk7XG4gIFx0bGV0IGFkTmFtZSA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TmFtZSgpO1xuICBcdHRoaXMuYWVyb2Ryb21lc1NlcnZpY2Uuc2V0V2luZCh3eC53aW5kRGlyZWN0aW9uLCB3eC53aW5kU3RyZW5ndGgpO1xuXHRsZXQgYXRpczogQXRpc0ludGVyZmFjZSA9IHtcblx0XHQnYWQnOiBhZE5hbWUsXG5cdFx0J2lkZW50JzogdGhpcy5nZXRJZGVudCgpLFxuXHRcdCd0aW1lJzogJzAwMDAnLFxuXHRcdCdhcHByb2FjaCc6IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0QXBwcm9hY2goKSxcblx0XHQncnVud2F5cyc6IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0QWN0aXZlUnVud2F5c0FzVGV4dCgpLFxuICBcdFx0J3J1bndheXNTdXJmYWNlJzogdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRSdW53YXlTdXJmYWNlKCksXG4gIFx0XHQnaG9sZGluZyc6IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0SG9sZGluZygpLFxuICBcdFx0J3J1bndheU9wcyc6IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0UnVud2F5T3BlcmF0aW9ucygpLFxuICBcdFx0J3dpbmQnOiB0aGlzLndlYXRoZXJTZXJ2aWNlLndpbmRBc1RleHQoKSxcbiAgXHRcdCd4d2luZCc6IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TWF4WHdpbmRBc1RleHQoKSxcbiAgXHRcdCd0d2luZCc6IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TWF4VHdpbmRBc1RleHQoKSxcbiAgXHRcdCd2aXNpYmlsaXR5JzogdGhpcy53ZWF0aGVyU2VydmljZS52aXNBc1RleHQoKSxcbiAgXHRcdCd3ZWF0aGVyJzogdGhpcy53ZWF0aGVyU2VydmljZS53ZWF0aGVyQXNTdHJpbmcoKSxcbiAgXHRcdCdjbG91ZCc6IHRoaXMud2VhdGhlclNlcnZpY2UuY2xvdWRBc1RleHQoKSxcbiAgXHRcdCd0ZW1wJzogd3gudGVtcCxcbiAgXHRcdCdxbmgnOiB0aGlzLndlYXRoZXJTZXJ2aWNlLnFuaEFzVGV4dCgpLFxuICBcdFx0J2NvbnRhY3QnOiB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLnNlcnZpY2VzQXNTdHJpbmcoKSxcbiAgXHRcdCdzaG9ydGhhbmQnOiAnJyxcbiAgXHRcdCdxdWVzdGlvbnMnOiBbXVxuXHR9IGFzIGFueTtcblx0YXRpcy5zaG9ydGhhbmQgPSB0aGlzLnNob3J0aGFuZEF0aXMoYXRpcyk7XG5cdGNvbnNvbGUubG9nKGF0aXMpO1xuXHR0aGlzLmN1cnJlbnRBdGlzID0gYXRpcztcbiAgfVxuXG4gIHB1YmxpYyB3aW5kQXNXb3JkcyhzdDogc3RyaW5nKSA6IHN0cmluZyB7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC8wL2csICd6ZXJvICcpO1xuXHRzdCA9IHN0LnJlcGxhY2UoLzEvZywgJ29uZSAnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzIvZywgJ3R3byAnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzMvZywgJ3RocmVlICcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvNC9nLCAnZm91ciAnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzUvZywgJ2ZpdmUgJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC82L2csICdzaXggJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC83L2csICdzZXZlbiAnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzgvZywgJ2VpZ2h0ICcpO1xuXHRzdCA9IHN0LnJlcGxhY2UoLzkvZywgJ25pbmUgJyk7XG5cdHJldHVybiBzdDtcbiAgfVxuXG4gIHB1YmxpYyBzdXJmYWNlQXNXb3JkcyhzdDogc3RyaW5nKSA6IHN0cmluZyB7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9XRVQvaWcsICdydW53YXkgd2V0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9EQU1QL2lnLCAncnVud2F5IHdldCcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvRkxPT0RFRC9pZywgJ3J1bndheSBmbG9vZGVkJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9XQVRFUiBQQVRDSEVTL2lnLCAnd2F0ZXIgcGF0Y2hlcyBvbiBydW53YXknKTtcblx0cmV0dXJuIHN0O1xuICB9XG5cbiAgcHVibGljIHZpc0FzV29yZHMoc3Q6IHN0cmluZykgOiBzdHJpbmcge1xuICBcdHN0ID0gc3QucmVwbGFjZSgvIDEwIC9nLCAnIHRlbiAnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzAwMCAvZywgJ3Rob3VzYW5kICcpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvMDAgL2csICdodW5kcmVkICcpO1xuXHRzdCA9IHRoaXMud2luZEFzV29yZHMoc3QpO1xuXHRyZXR1cm4gc3Q7XG4gIH1cblxuICBwdWJsaWMgcnVud2F5c0FzV29yZHMoc3Q6IHN0cmluZykgOiBzdHJpbmcge1xuICBcdHN0ID0gc3QucmVwbGFjZSgvTC9pZywgJyBsZWZ0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9SL2lnLCAnIHJpZ2h0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9DL2lnLCAnIGNlbnRyZScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvMC9nLCAnIHplcm8nKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzEvZywgJyBvbmUnKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzIvZywgJyB0d28nKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzMvZywgJyB0aHJlZScpO1xuICBcdHN0ID0gc3QucmVwbGFjZSgvNC9nLCAnIGZvdXInKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzUvZywgJyBmaXZlJyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC82L2csICcgc2l4Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC83L2csICcgc2V2ZW4nKTtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoLzgvZywgJyBlaWdodCcpO1xuXHRzdCA9IHN0LnJlcGxhY2UoLzkvZywgJyBuaW5lJyk7XG5cdHJldHVybiBzdDtcbiAgfVxuXG4gIHB1YmxpYyBhdGlzQXNXb3JkcygpOiBzdHJpbmcge1xuICBcdGxldCBhTGluZXM6IHN0cmluZ1tdID0gW107XG5cdGxldCBhdGlzID0gdGhpcy5jdXJyZW50QXRpcztcblx0YUxpbmVzLnB1c2goYXRpcy5hZCArICcgdGVybWluYWwgaW5mb3JtYXRpb24gJyArIGF0aXMuaWRlbnQpO1x0XG5cdGlmIChhdGlzLmFwcHJvYWNoICE9PSAnJykge1xuXHRcdGFMaW5lcy5wdXNoKCdleHBlY3QgJyArIGF0aXMuYXBwcm9hY2gpO1xuXHR9XG5cdGFMaW5lcy5wdXNoKCdydW53YXkgJyArIHRoaXMucnVud2F5c0FzV29yZHMoYXRpcy5ydW53YXlzKSk7XG5cblx0aWYgKGF0aXMucnVud2F5c1N1cmZhY2UgIT09ICcnKSB7XG5cdFx0YUxpbmVzLnB1c2godGhpcy5zdXJmYWNlQXNXb3JkcyhhdGlzLnJ1bndheXNTdXJmYWNlKSk7XG5cdH1cblx0aWYgKGF0aXMuaG9sZGluZyAhPT0gJycpIHtcblx0XHRhTGluZXMucHVzaChhdGlzLmhvbGRpbmcpO1xuXHR9XG5cdGlmIChhdGlzLnJ1bndheU9wcyAhPT0gJycpIHtcblx0XHRhTGluZXMucHVzaChhdGlzLnJ1bndheU9wcyk7XG5cdH1cblx0YUxpbmVzLnB1c2goJ3dpbmQgJyArIHRoaXMud2luZEFzV29yZHMoYXRpcy53aW5kKSk7XG5cblx0aWYgKGF0aXMueHdpbmQgIT09ICcnKSB7XG5cdFx0YUxpbmVzLnB1c2godGhpcy53aW5kQXNXb3JkcyhhdGlzLnh3aW5kKSk7XG5cdH1cblx0aWYgKGF0aXMudHdpbmQgIT09ICcnKSB7XG5cdFx0YUxpbmVzLnB1c2godGhpcy53aW5kQXNXb3JkcyhhdGlzLnR3aW5kKSk7XG5cdH1cblx0aWYgKGF0aXMud2VhdGhlciAhPT0gJ0NBVk9LJykge1xuXHRcdGFMaW5lcy5wdXNoKCd2aXNpYmlsaXR5ICcgKyB0aGlzLnZpc0FzV29yZHMoYXRpcy52aXNpYmlsaXR5KSk7XG5cdH1cblx0aWYgKGF0aXMud2VhdGhlciAhPT0gJycpIHtcblx0XHRhTGluZXMucHVzaCgnd2VhdGhlciAnICsgdGhpcy52aXNBc1dvcmRzKGF0aXMud2VhdGhlcikpO1xuXHR9XG5cdGlmIChhdGlzLndlYXRoZXIgIT09ICdDQVZPSycpIHtcblx0XHRhTGluZXMucHVzaCgnY2xvdWQgJyArIGF0aXMuY2xvdWQpO1xuXHR9XG5cdGFMaW5lcy5wdXNoKCd0ZW1wZXJhdHVyZSAnICsgdGhpcy53aW5kQXNXb3JkcyhhdGlzLnRlbXAudG9TdHJpbmcoKSkpO1xuXHRhTGluZXMucHVzaCgnUSBOIEggJyArIHRoaXMud2luZEFzV29yZHMoYXRpcy5xbmgpKTtcblx0YUxpbmVzLnB1c2goJ29uIGZpcnN0IGNvbnRhY3Qgd2l0aCAnICsgYXRpcy5hZCArICcgJyArIGF0aXMuY29udGFjdCArICcgbm90aWZ5IHJlY2VpcHQgb2YgaW5mb3JtYXRpb24gJyArIGF0aXMuaWRlbnQpO1xuXHRsZXQgdGV4dCA9IGFMaW5lcy5qb2luKCcsJyk7XG5cdHRleHQgPSB0ZXh0LnJlcGxhY2UoLy14LS9nLCAnJyk7XG5cdHRleHQgPSB0ZXh0LnJlcGxhY2UoLywsKy9nLCAnLCcpO1xuXHRyZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZUF0aXMobGV2ZWw6IHN0cmluZykgOiBzdHJpbmcge1xuXHR0aGlzLmdlbmVyYXRlQXRpc05ldyhsZXZlbCk7XG5cdGxldCB3b3JkcyA9IHRoaXMuYXRpc0FzV29yZHMoKTtcblx0Y29uc29sZS5sb2cod29yZHMpO1xuXHRyZXR1cm4gd29yZHM7XG5cdC8qXG5cbiAgXHRsZXQgd3g6V2VhdGhlciA9IHRoaXMud2VhdGhlclNlcnZpY2UuY3JlYXRlTmV3V2VhdGhlcigpO1xuICBcdGxldCBhZE5hbWUgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldE5hbWUoKTtcbiAgXHR0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLnNldFdpbmQod3gud2luZERpcmVjdGlvbiwgd3gud2luZFN0cmVuZ3RoKTtcbiAgXHRsZXQgaWRlbnQgPSB0aGlzLmdldElkZW50KCk7XG4gIFx0bGV0IGF0aXM6IHN0cmluZ1tdID0gW107XG5cdHRoaXMuYXBwcm9hY2ggPSAnJztcblxuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5jbGVhclF1ZXN0aW9ucygpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignd2hhdCBpbmZvcm1hdGlvbiBoYXZlIHlvdSByZWNlaXZlZD8nLCBpZGVudCwgWydhbHBoYScsICdicmF2bycsICdjaGFybGllJywgJ2RlbHRhJywgJ2VjaG8nLCAnZm94dHJvdCddLCAnJyk7XG5cblx0YXRpcy5wdXNoKGFkTmFtZSk7XHRcblx0YXRpcy5wdXNoKCd0ZXJtaW5hbCBpbmZvcm1hdGlvbicpO1x0XG5cdGF0aXMucHVzaChpZGVudCk7XHRcblx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXROb0NpcmN1aXRzKGZhbHNlKTtcblx0aWYgKHRoaXMud2VhdGhlclNlcnZpY2UuaXNJTUMoKSkge1xuXHRcdHRoaXMuYXBwcm9hY2ggPSAnaW5zdHJ1bWVudCBhcHByb2FjaCc7XG5cdFx0YXRpcy5wdXNoKCdleHBlY3QgaW5zdHJ1bWVudCBhcHByb2FjaCcpO1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdJZiBhcnJpdmluZywgd2hhdCBzb3J0IG9mIGFwcHJvYWNoIHdvdWxkIHlvdSBleHBlY3Q/JywgXCJpbnN0cnVtZW50XCIsIFsndmlzdWFsJywgJ3NwZWNpYWwgdmZyJywgJ3N0YW5kYXJkJywgJ2Nhbm5vdCBiZSBkZXRlcm1pbmVkJ10sICdhdGlzIHNheXMgZXhwZWN0IGluc3RydW1lbnQgYXBwcm9hY2gnKTtcblx0XHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBbGxvd1NwZWNpYWxWRlIoKSkge1xuXHRcdFx0aWYgKHRoaXMud2VhdGhlclNlcnZpY2UuaXNSVkZSKCkpIHtcblx0XHRcdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ0ZvciBmaXhlZCB3aW5nIFZGUiBhaXJjcmFmdCwgd2hhdCBpcyB0aGUgbWluaW11bSB2aXNpYmlsdHkgeW91IHNob3VsZCBtYWludGFpbj8nLCBcIjE2MDBtXCIsIFsnODAwbScsICcyMDAwbScsICc1MDAwbScsICc4a20nLCAnbm9uZSAtIHlvdSBjYW5ub3Qgb3BlcmF0ZSBWRlInXSwgJ3NwZWNpYWwgVkZSIHByb2NlZHVyZXMgLSB5b3UgbXVzdCBtYWludGFpbiAxNjAwbSB2aXNpYmlsaXR5Jyk7XG5cdFx0XHRcdGF0aXMucHVzaCgnc3BlY2lhbCBWIEYgUiBwcm9jZWR1cmVzIGFwcGx5Jylcblx0XHRcdFx0dGhpcy5hcHByb2FjaCArPSAnIHNwZWMgdmZyJztcblx0XHRcdFx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXROb0NpcmN1aXRzKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignSWYgYXJyaXZpbmcsIHdoYXQgc29ydCBvZiBhcHByb2FjaCB3b3VsZCB5b3UgbW9zdCBsaWtlbHkgZXhwZWN0PycsIFwidmlzdWFsXCIsIFsgJ2luc3RydW1lbnQnLCAnaWxzJywgJ3NwZWNpYWwgdmZyJywgJ3N0YW5kYXJkJywgJ2Nhbm5vdCBiZSBkZXRlcm1pbmVkJ10sICdubyBtZW50aW9uIGlzIG1hZGUgb2Ygc3BlY2lmaWMgYXBwcm9hY2hlcyBzbyBwcm9iYWJseSB2aXN1YWwnKTtcblx0fVxuXHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBbGxvd1NwZWNpYWxWRlIoKSkge1xuXHRcdGlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNWRlIoKSkge1xuXHRcdFx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXROb0NpcmN1aXRzKHRydWUpO1xuXHRcdFx0YXRpcy5wdXNoKCdjb250cm9sIHpvbmUgY2xvc2VkIGZvciBWIEYgUiBvcGVyYXRpb25zJyk7XG5cdFx0XHR0aGlzLmFwcHJvYWNoICs9ICcgbm8gdmZyJztcblx0XHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdGb3IgZml4ZWQgd2luZyBWRlIgYWlyY3JhZnQsIHdoYXQgaXMgdGhlIG1pbmltdW0gdmlzaWJpbHR5IHlvdSBzaG91bGQgbWFpbnRhaW4/JywgXCJub25lIC0geW91IGNhbm5vdCBvcGVyYXRlIFZGUlwiLCBbJzgwMG0nLCAnMjAwMG0nLCAnNTAwMG0nLCAnOGttJywgJ25vbmUgLSB5b3UgY2Fubm90IG9wZXJhdGUgVkZSJ10sICd0aGUgem9uZSBpcyBjbG9zZWQgZm9yIFZGUiBvcGVyYXRpb25zJyk7XG5cdFx0fVxuXHR9XG5cdGF0aXMucHVzaCgnLCcpO1x0XG5cdGF0aXMucHVzaCh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEFjdGl2ZVJ1bndheXMoKSk7XG5cdGxldCByd3lPcHRzQSA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0UnVud2F5cygpO1xuXHRsZXQgcnd5T3B0c0QgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldFJ1bndheXMoKTtcblx0bGV0IHJ3eU9wdHNDaXJjdWl0cyA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0UnVud2F5cygpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hpY2ggcnVud2F5IHdvdWxkIHlvdSBleHBlY3QgZm9yIGFuIGFycml2YWwnLCB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEFycml2YWxSdW53YXkoKSwgcnd5T3B0c0EsICcnKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doaWNoIHJ1bndheSB3b3VsZCB5b3UgZXhwZWN0IGZvciBhIGRlcGFydHVyZScsIHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0RGVwYXJ0dXJlUnVud2F5KCksIHJ3eU9wdHNELCAnJyk7XG5cdHJ3eU9wdHNDaXJjdWl0cy5wdXNoKCdjaXJjdWl0cyBub3QgYXZhaWxhYmxlJyk7XG5cdGlmICh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldENpcmN1aXRzTGlrZWx5KCkpIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hpY2ggcnVud2F5IHdvdWxkIHlvdSBleHBlY3QgZm9yIGNpcmN1aXRzJywgdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRDaXJjdWl0UnVud2F5KCksIHJ3eU9wdHNDaXJjdWl0cywgJycpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdXaGljaCBydW53YXkgd291bGQgeW91IGV4cGVjdCBmb3IgY2lyY3VpdHMnLCAneW91IHdvdWxkIGJlIHVubGlrZWx5IHRvIGJlIGFsbG93ZWQgY2lyY3VpdHMnLCByd3lPcHRzQ2lyY3VpdHMsICcnKTtcblx0fVxuaWYgKHRoaXMud2VhdGhlclNlcnZpY2UuZ2V0R3JvdW5kQ29uZGl0aW9uKCkgIT09ICcnKSB7XG5cdFx0YXRpcy5wdXNoKCcsJyk7XHRcblx0XHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5tdWx0aXBsZVJ1bndheXMoKSkge1xuXHRcdFx0YXRpcy5wdXNoKCdydW53YXlzJylcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXRpcy5wdXNoKCdydW53YXknKVxuXHRcdH1cblx0XHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS5nZXRHcm91bmRDb25kaXRpb24oKSk7XG5cdH1cblx0YXRpcy5wdXNoKCcsJyk7XHRcblx0YXRpcy5wdXNoKCd3aW5kICcpO1xuXHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS53aW5kQXNTdHJpbmcoKSk7XG5cdGxldCBtYXhYd2luZCA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TWF4WHdpbmQoKTtcblx0aWYgKG1heFh3aW5kWzBdID4gMCkge1xuXHRhdGlzLnB1c2goJ2Nyb3NzIHdpbmQgbWF4aW11bSAnICsgdGhpcy50b051bWJlcnMobWF4WHdpbmRbMF0pICsgJyBrbm90cyBydW53YXkgJyArIG1heFh3aW5kWzFdKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doYXQgaXMgdGhlIG1heGltdW0gY3Jvc3Mgd2luZCByZXBvcnRlZD8nLCBtYXhYd2luZFswXS50b1N0cmluZygpLCBbJzAnLCAnNScsICc3JywgJzEwJywgJzEyJywgJzE1J10sICcnKTtcbn1cbmxldCBtYXhUd2luZCA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TWF4VHdpbmQoKTtcbmlmIChtYXhUd2luZFswXSA+IDApIHtcblx0YXRpcy5wdXNoKCd0YWlsIHdpbmQgbWF4aW11bSAnICsgdGhpcy50b051bWJlcnMobWF4VHdpbmRbMF0pICsgJyBrbm90cyBydW53YXkgJyArIG1heFR3aW5kWzFdKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doYXQgaXMgdGhlIG1heGltdW0gdGFpbCB3aW5kIHJlcG9ydGVkPycsIG1heFR3aW5kWzBdLnRvU3RyaW5nKCksIFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnXSwgJycpO1xufVxuXHRcbmF0aXMucHVzaCgnLCcpO1x0XG5pZiAoISB0aGlzLndlYXRoZXJTZXJ2aWNlLmlzQ0FWT0soKSkge1xuXHRhdGlzLnB1c2goJ3Zpc2liaWxpdHknKTtcdFxuXHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS52aXNBc1N0cmluZygpKTtcblx0YXRpcy5wdXNoKCcsJyk7XHRcbn0gZWxzZSB7XG5cdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdJcyB0aGVyZSBjbG91ZCBhYm92ZSA1MDAwIGZlZXQ/JywgJ3Bvc3NpYmx5IHllcycsIFsnZGVmaW5pdGVseSB5ZXMnLCAnZGVmaW5pdGVseSBubyddLCBcIkNBVk9LIG1lYW5zIG5vIGNsb3VkIGJlbG93IDUwMDAsIHRoZXJlIGNvdWxkIGJlIGNsb3VkIGFib3ZlIHRoaXMnXCIpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hhdCBpcyB0aGUgdmlzaWJpbGl0eT8nLCAnMTBrbSBvciBncmVhdGVyJywgWycyMDAwbScsICc1MDAwbScsICc4a20nXSwgXCJDQVZPSyBtZWFucyB2aXNpYmlsaXR5IG11c3QgYmUgMTBrbSBvciBncmVhdGVyXCIpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignQ291bGQgdGhlcmUgYmUgVG93ZXJpbmcgQ3VtdWx1cyBhYm92ZSB0aGUgYWVyb2Ryb21lPycsICdubycsIFsneWVzJ10sIFwidGhlcmUgbXVzdCBiZSBubyB0b3dlcmluZyBDdW11bHVzIGlmIENBVk9LXCIpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignQ291bGQgdGhlcmUgYmUgU3RyYXRvY3VtdWx1cyBhYm92ZSB0aGUgYWVyb2Ryb21lPycsICd5ZXMnLCBbJ25vJ10sIFwicHJvdmlkaW5nIHRoZSBjbG91ZCBpcyBhYm92ZSA1MDAwJyBpdCBjYW4gc3RpbGwgYmUgQ0FWT0tcIik7XG59XG5hdGlzLnB1c2goJ3dlYXRoZXInKTtcdFxuYXRpcy5wdXNoKHRoaXMud2VhdGhlclNlcnZpY2Uud2VhdGhlckFzU3RyaW5nKCkpO1xuYXRpcy5wdXNoKCcsJyk7XHRcbmlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNGT0coKSkge1xuXHRpZiAoISB0aGlzLndlYXRoZXJTZXJ2aWNlLmlzQ0FWT0soKSkge1xuXHRcdGF0aXMucHVzaCgnY2xvdWQnKTtcdFxuXHRcdGF0aXMucHVzaCh0aGlzLndlYXRoZXJTZXJ2aWNlLmNsb3VkQXNTdHJpbmcoKSk7XG5cdFx0YXRpcy5wdXNoKCcsJyk7XHRcblx0fVxufVxuYXRpcy5wdXNoKCd0ZW1wZXJhdHVyZScpO1x0XG5hdGlzLnB1c2godGhpcy50b051bWJlcnMod3gudGVtcCkpO1xuaWYgKCh3eC50ZW1wIC0gd3guZGV3cG9pbnQpIDwgNCkge1xuXHRhdGlzLnB1c2goJ2Rld3BvaW50Jyk7XG5cdGF0aXMucHVzaCh0aGlzLnRvTnVtYmVycyh3eC5kZXdwb2ludCkpO1xuXHRsZXQgZGlmZiA9IHd4LnRlbXAgLSB3eC5kZXdwb2ludDtcblx0aWYgKGRpZmYgPiAwKSB7XG5cdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdXb3VsZCBhIGRyb3AgaW4gdGVtcGVyYXR1cmUgYnkgJyArIGRpZmYgKyAnZGVncmVlcyBtYXR0ZXIgZm9yIHZpc2liaWxpdHk/JywgJ3llcycsIFsgJ25vJyBdLCAndGhlIGRld3BvaW50IGlzIHdpdGhpbiAnICsgZGlmZiArICcgZGVncmVlcyBvZiB0aGUgYWlyIHRlbXBlcmF0dXJlIC0gZHJvcHBpbmcgdGVtcGVyYXR1cmUgY291bGQgcmVzdWx0IGluIGNsb3VkIGZvcm1pbmcnKTtcblx0fVxufVxuYXRpcy5wdXNoKCcsJyk7XHRcbmF0aXMucHVzaCgnUSBOIEgnKTtcdFxuYXRpcy5wdXNoKHd4LnFuaCk7XG50aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hhdCBpcyB0aGUgUU5IPycsIHRoaXMud2VhdGhlclNlcnZpY2UucW5oTnVtYmVyLnRvU3RyaW5nKCksIFsgJzEwMDknLCAnMTAxMycsICcxMDE1JywgJzEwMDUnLCAnMTAxNycgXSwgJycpO1xuYXRpcy5wdXNoKCcsJyk7XHRcblxubGV0IHNwZWM6IHN0cmluZ1tdID0gdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRTcGVjaWFsaXRpZXMoKTtcbmlmIChzcGVjLmxlbmd0aCA+IDApIHtcblx0YXRpcy5wdXNoKHNwZWMuam9pbignLCAnKSk7XG5cdGF0aXMucHVzaCgnLCcpO1x0XG59XG5hdGlzLnB1c2goJ29uIGZpcnN0IGNvbnRhY3Qgd2l0aCcpO1x0XG5hdGlzLnB1c2goYWROYW1lKTtcdFxuYXRpcy5wdXNoKHRoaXMuYWVyb2Ryb21lc1NlcnZpY2Uuc2VydmljZXNBc1N0cmluZygpKTtcdFxuYXRpcy5wdXNoKCdub3RpZnkgcmVjZWlwdCBvZiBpbmZvcm1hdGlvbicpO1x0XG5hdGlzLnB1c2goaWRlbnQpO1x0XG5hdGlzLnB1c2goJy4nKTtcdFxuXG5sZXQgYSA9IGF0aXMuam9pbignICcpO1xuY29uc29sZS5sb2coJz4nLCBhKTtcbnJldHVybiBhO1xuKi9cbn1cblxuZ2V0SWRlbnQoKSB7XG5sZXQgY2hJbmRleCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDcpO1xubGV0IGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShjaEluZGV4ICsgNjUpO1xudGhpcy5pZGVudCA9IGNoO1xucmV0dXJuIHRoaXMuc3BlYWtTZXJ2aWNlLmFscGhhYmV0KGNoKTtcbn1cblxucHVibGljIHRvTnVtYmVycyhuOiBudW1iZXIpIDogc3RyaW5nIHtcbmxldCBtYXAgPSB7XG5cdCcwJzogJ3plcm8nLFxuXHQnMSc6ICd3dW4nLFxuXHQnMic6ICd0d28nLFxuXHQnMyc6ICd0aHJlZScsXG5cdCc0JzogJ2ZvcmUnLFxuXHQnNSc6ICdmaWZlJyxcblx0JzYnOiAnc2l4Jyxcblx0JzcnOiAnc2VmZmVuJyxcblx0JzgnOiAnZWlnaHQnLFxuXHQnOSc6ICduaW5lcicsXG5cdH07XG5sZXQgbnN0ID0gbi50b1N0cmluZygpO1xubGV0IGQgPSBuc3Quc3BsaXQoJycpO1xubGV0IHJlc3BvbnNlOiBzdHJpbmdbXSA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XG5cdGxldCBkc3QgPSBkW2ldO1xuXHRsZXQgZFBob24gPSBtYXBbZHN0XTtcblx0aWYgKGRQaG9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXNwb25zZS5wdXNoKGRQaG9uKTtcblx0fSBlbHNlIHtcblx0cmVzcG9uc2UucHVzaChkc3QpO1xuXHR9XG59XG5yZXR1cm4gcmVzcG9uc2Uuam9pbignICcpO1xufVxuXG59XG4iXX0=