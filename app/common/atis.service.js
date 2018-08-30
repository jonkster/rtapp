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
    CommonAtisService.prototype.getCurrentRunways = function () {
        var rwys = this.aerodromesService.getArrivalRunway();
        if (this.aerodromesService.getArrivalRunway() !== this.aerodromesService.getDepartureRunway()) {
            rwys += ' arr ' + this.aerodromesService.getDepartureRunway() + ' dep ';
        }
        else {
            rwys += ' a+d ';
        }
        if (this.aerodromesService.getCircuitRunway() !== '') {
            rwys += this.aerodromesService.getCircuitRunway() + ' cct';
        }
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
    CommonAtisService.prototype.generateAtis = function (level) {
        var wx = this.weatherService.createNewWeather();
        var adName = this.aerodromesService.getName();
        this.aerodromesService.setWind(wx.windDirection, wx.windStrength);
        var ident = this.getIdent();
        var atis = [];
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
                    atis.push('special V F R procedures apply');
                    this.approach += ' spec vfr';
                    this.aerodromesService.setNoCircuits(true);
                }
            }
        }
        else {
            this.questionService.addQuestion('If arriving, what sort of approach would you most likely expect?', "visual", ['instrument', 'ils', 'special vfr', 'standard', 'cannot be determined'], 'no mention is made of specific approaches so probably visual');
        }
        if (this.aerodromesService.getAllowSpecialVFR()) {
            if (!this.weatherService.isVFR()) {
                this.aerodromesService.setNoCircuits(true);
                atis.push('control zone closed for V F R operations');
                this.approach += ' no vfr';
                this.questionService.addQuestion('For fixed wing VFR aircraft, what is the minimum visibilty you should maintain?', "none - you cannot operate VFR", ['800m', '2000m', '5000m', '8km', 'none - you cannot operate VFR'], 'the zone is closed for VFR operations');
            }
        }
        atis.push(',');
        atis.push(this.aerodromesService.getActiveRunways());
        var rwyOptsA = this.aerodromesService.getRunways();
        var rwyOptsD = this.aerodromesService.getRunways();
        var rwyOptsCircuits = this.aerodromesService.getRunways();
        this.questionService.addQuestion('Which runway would you expect for an arrival', this.aerodromesService.getArrivalRunway(), rwyOptsA, '');
        this.questionService.addQuestion('Which runway would you expect for a departure', this.aerodromesService.getDepartureRunway(), rwyOptsD, '');
        rwyOptsCircuits.push('circuits not available');
        if (this.aerodromesService.getCircuitsLikely()) {
            this.questionService.addQuestion('Which runway would you expect for circuits', this.aerodromesService.getCircuitRunway(), rwyOptsCircuits, '');
        }
        else {
            this.questionService.addQuestion('Which runway would you expect for circuits', 'you would be unlikely to be allowed circuits', rwyOptsCircuits, '');
        }
        if (this.weatherService.getGroundCondition() !== '') {
            atis.push(',');
            if (this.aerodromesService.multipleRunways()) {
                atis.push('runways');
            }
            else {
                atis.push('runway');
            }
            atis.push(this.weatherService.getGroundCondition());
        }
        atis.push(',');
        atis.push('wind ');
        atis.push(this.weatherService.windAsString());
        var maxXwind = this.aerodromesService.getMaxXwind();
        if (maxXwind >= 7) {
            atis.push('cross wind maximum ' + this.toNumbers(maxXwind));
            this.questionService.addQuestion('What is the maximum cross wind reported?', maxXwind.toString(), ['0', '5', '7', '10', '12', '15'], '');
        }
        atis.push(',');
        if (!this.weatherService.isCAVOK()) {
            atis.push('visibility');
            atis.push(this.weatherService.visAsString());
            atis.push(',');
        }
        else {
            this.questionService.addQuestion('Is there cloud above 5000 feet?', 'possibly yes', ['definitely yes', 'definitely no'], "CAVOK means no cloud below 5000, there could be cloud above this'");
            this.questionService.addQuestion('What is the visibility?', '10km or greater', ['2000m', '5000m', '8km'], "CAVOK means visibility must be 10km or greater");
            this.questionService.addQuestion('Could there be Towering Cumulus above the aerodrome?', 'no', ['yes'], "there must be no towering Cumulus if CAVOK");
            this.questionService.addQuestion('Could there be Stratocumulus above the aerodrome?', 'yes', ['no'], "providing the cloud is above 5000' it can still be CAVOK");
        }
        atis.push('weather');
        atis.push(this.weatherService.weatherAsString());
        atis.push(',');
        if (!this.weatherService.isFOG()) {
            if (!this.weatherService.isCAVOK()) {
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
            var diff = wx.temp - wx.dewpoint;
            if (diff > 0) {
                this.questionService.addQuestion('Would a drop in temperature by ' + diff + 'degrees matter for visibility?', 'yes', ['no'], 'the dewpoint is within ' + diff + ' degrees of the air temperature - dropping temperature could result in cloud forming');
            }
        }
        atis.push(',');
        atis.push('Q N H');
        atis.push(wx.qnh);
        this.questionService.addQuestion('What is the QNH?', this.weatherService.qnhNumber.toString(), ['1009', '1013', '1015', '1005', '1017'], '');
        atis.push(',');
        var spec = this.aerodromesService.getSpecialities();
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
        var a = atis.join(' ');
        console.log('>', a);
        return a;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRpcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRpcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhEQUE0RDtBQUU1RCwrREFBbUU7QUFDbkUseURBQTZEO0FBQzdELHVFQUFxRTtBQUdyRTtJQU1FLDJCQUFvQixjQUE4QixFQUN6QyxZQUFnQyxFQUNoQyxlQUFzQyxFQUN0QyxpQkFBb0M7UUFIekIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3pDLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBdUI7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVByQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGFBQVEsR0FBVyxFQUFFLENBQUM7SUFNbUIsQ0FBQztJQUUzQywyQ0FBZSxHQUF0QjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFFTyxxQ0FBUyxHQUFqQixVQUFrQixFQUFVO1FBQzNCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFTSw4Q0FBa0IsR0FBekI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLDZDQUFpQixHQUF4QjtRQUNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLElBQUksQ0FBQyxp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QUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBQ0YsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUExTlMsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7eUNBT3lCLGdDQUFjO1lBQzNCLGtDQUFrQjtZQUNmLHdDQUFxQjtZQUNuQixzQ0FBaUI7T0FUbEMsaUJBQWlCLENBNE43QjtJQUFELHdCQUFDO0NBQUEsQUE1TkQsSUE0TkM7QUE1TlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2VhdGhlclNlcnZpY2UgfSBmcm9tICcuLi93ZWF0aGVyL3dlYXRoZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyLCBDbG91ZCB9IGZyb20gJy4uL3dlYXRoZXIvd2VhdGhlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25TcGVha1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFlcm9kcm9tZXNTZXJ2aWNlIH0gZnJvbSBcIi4uL2Flcm9kcm9tZXMvYWVyb2Ryb21lcy5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb21tb25BdGlzU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBpZGVudDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgYXBwcm9hY2g6IHN0cmluZyA9ICcnO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3ZWF0aGVyU2VydmljZTogV2VhdGhlclNlcnZpY2UsXG5cdCAgcHJpdmF0ZSBzcGVha1NlcnZpY2U6IENvbW1vblNwZWFrU2VydmljZSxcblx0ICBwcml2YXRlIHF1ZXN0aW9uU2VydmljZTogQ29tbW9uUXVlc3Rpb25TZXJ2aWNlLFxuXHQgIHByaXZhdGUgYWVyb2Ryb21lc1NlcnZpY2U6IEFlcm9kcm9tZXNTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudElkZW50KCkge1xuXHQgIHJldHVybiB0aGlzLmlkZW50O1xuICB9ICBcblxuICBwcml2YXRlIHNob3J0aGFuZChzdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgXHRzdCA9IHN0LnJlcGxhY2UoL2luc3RydW1lbnQvaWcsICdpbnN0Jyk7XG4gIFx0c3QgPSBzdC5yZXBsYWNlKC9hcHByb2FjaC9pZywgJ2FwcCcpO1xuICBcdHJldHVybiBzdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50QXBwcm9hY2goKSB7XG5cdCAgcmV0dXJuIHRoaXMuc2hvcnRoYW5kKHRoaXMuYXBwcm9hY2gpO1xuICB9ICBcblxuICBwdWJsaWMgZ2V0Q3VycmVudFJ1bndheXMoKSB7XG4gIFx0bGV0IHJ3eXMgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEFycml2YWxSdW53YXkoKTtcblx0aWYgKHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0QXJyaXZhbFJ1bndheSgpICE9PSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldERlcGFydHVyZVJ1bndheSgpKSB7XG5cdFx0cnd5cyArPSAnIGFyciAnICsgdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXREZXBhcnR1cmVSdW53YXkoKSArICcgZGVwICc7XG5cdH0gZWxzZSB7XG5cdFx0cnd5cyArPSAnIGErZCAnO1xuXHR9XG5cdGlmICh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldENpcmN1aXRSdW53YXkoKSAhPT0gJycpIHtcblx0XHRyd3lzICs9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0Q2lyY3VpdFJ1bndheSgpICsgJyBjY3QnO1xuXHR9XG5cdHJldHVybiByd3lzO1xuICB9ICBcblxuICBwdWJsaWMgZ2V0Q3VycmVudFdpbmQoKSB7XG4gIFx0cmV0dXJuIHRoaXMud2VhdGhlclNlcnZpY2Uud2luZEFzU2hvcnRoYW5kKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudFZpcygpIHtcbiAgXHRyZXR1cm4gdGhpcy53ZWF0aGVyU2VydmljZS52aXNBc1Nob3J0aGFuZCgpO1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRXZWF0aGVyKCkge1xuICBcdHJldHVybiB0aGlzLndlYXRoZXJTZXJ2aWNlLnd4QXNTaG9ydGhhbmQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50Q2xvdWQoKSB7XG4gIFx0cmV0dXJuIHRoaXMud2VhdGhlclNlcnZpY2UuY2xvdWRBc1Nob3J0aGFuZCgpO1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRRTkgoKSB7XG4gIFx0cmV0dXJuIHRoaXMud2VhdGhlclNlcnZpY2UucW5oQXNTaG9ydGhhbmQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50T3RoZXIoKSB7XG4gIFx0cmV0dXJuIHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0Q3VycmVudE90aGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVBdGlzKGxldmVsOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgXHRsZXQgd3g6V2VhdGhlciA9IHRoaXMud2VhdGhlclNlcnZpY2UuY3JlYXRlTmV3V2VhdGhlcigpO1xuICBcdGxldCBhZE5hbWUgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldE5hbWUoKTtcbiAgXHR0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLnNldFdpbmQod3gud2luZERpcmVjdGlvbiwgd3gud2luZFN0cmVuZ3RoKTtcbiAgXHRsZXQgaWRlbnQgPSB0aGlzLmdldElkZW50KCk7XG4gIFx0bGV0IGF0aXM6IHN0cmluZ1tdID0gW107XG5cdHRoaXMuYXBwcm9hY2ggPSAnJztcblxuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5jbGVhclF1ZXN0aW9ucygpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignd2hhdCBpbmZvcm1hdGlvbiBoYXZlIHlvdSByZWNlaXZlZD8nLCBpZGVudCwgWydhbHBoYScsICdicmF2bycsICdjaGFybGllJywgJ2RlbHRhJywgJ2VjaG8nLCAnZm94dHJvdCddLCAnJyk7XG5cblx0YXRpcy5wdXNoKGFkTmFtZSk7XHRcblx0YXRpcy5wdXNoKCd0ZXJtaW5hbCBpbmZvcm1hdGlvbicpO1x0XG5cdGF0aXMucHVzaChpZGVudCk7XHRcblx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXROb0NpcmN1aXRzKGZhbHNlKTtcblx0aWYgKHRoaXMud2VhdGhlclNlcnZpY2UuaXNJTUMoKSkge1xuXHRcdHRoaXMuYXBwcm9hY2ggPSAnaW5zdHJ1bWVudCBhcHByb2FjaCc7XG5cdFx0YXRpcy5wdXNoKCdleHBlY3QgaW5zdHJ1bWVudCBhcHByb2FjaCcpO1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdJZiBhcnJpdmluZywgd2hhdCBzb3J0IG9mIGFwcHJvYWNoIHdvdWxkIHlvdSBleHBlY3Q/JywgXCJpbnN0cnVtZW50XCIsIFsndmlzdWFsJywgJ3NwZWNpYWwgdmZyJywgJ3N0YW5kYXJkJywgJ2Nhbm5vdCBiZSBkZXRlcm1pbmVkJ10sICdhdGlzIHNheXMgZXhwZWN0IGluc3RydW1lbnQgYXBwcm9hY2gnKTtcblx0XHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBbGxvd1NwZWNpYWxWRlIoKSkge1xuXHRcdFx0aWYgKHRoaXMud2VhdGhlclNlcnZpY2UuaXNSVkZSKCkpIHtcblx0XHRcdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ0ZvciBmaXhlZCB3aW5nIFZGUiBhaXJjcmFmdCwgd2hhdCBpcyB0aGUgbWluaW11bSB2aXNpYmlsdHkgeW91IHNob3VsZCBtYWludGFpbj8nLCBcIjE2MDBtXCIsIFsnODAwbScsICcyMDAwbScsICc1MDAwbScsICc4a20nLCAnbm9uZSAtIHlvdSBjYW5ub3Qgb3BlcmF0ZSBWRlInXSwgJ3NwZWNpYWwgVkZSIHByb2NlZHVyZXMgLSB5b3UgbXVzdCBtYWludGFpbiAxNjAwbSB2aXNpYmlsaXR5Jyk7XG5cdFx0XHRcdGF0aXMucHVzaCgnc3BlY2lhbCBWIEYgUiBwcm9jZWR1cmVzIGFwcGx5Jylcblx0XHRcdFx0dGhpcy5hcHByb2FjaCArPSAnIHNwZWMgdmZyJztcblx0XHRcdFx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXROb0NpcmN1aXRzKHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignSWYgYXJyaXZpbmcsIHdoYXQgc29ydCBvZiBhcHByb2FjaCB3b3VsZCB5b3UgbW9zdCBsaWtlbHkgZXhwZWN0PycsIFwidmlzdWFsXCIsIFsgJ2luc3RydW1lbnQnLCAnaWxzJywgJ3NwZWNpYWwgdmZyJywgJ3N0YW5kYXJkJywgJ2Nhbm5vdCBiZSBkZXRlcm1pbmVkJ10sICdubyBtZW50aW9uIGlzIG1hZGUgb2Ygc3BlY2lmaWMgYXBwcm9hY2hlcyBzbyBwcm9iYWJseSB2aXN1YWwnKTtcblx0fVxuXHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBbGxvd1NwZWNpYWxWRlIoKSkge1xuXHRcdGlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNWRlIoKSkge1xuXHRcdFx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXROb0NpcmN1aXRzKHRydWUpO1xuXHRcdFx0YXRpcy5wdXNoKCdjb250cm9sIHpvbmUgY2xvc2VkIGZvciBWIEYgUiBvcGVyYXRpb25zJyk7XG5cdFx0XHR0aGlzLmFwcHJvYWNoICs9ICcgbm8gdmZyJztcblx0XHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdGb3IgZml4ZWQgd2luZyBWRlIgYWlyY3JhZnQsIHdoYXQgaXMgdGhlIG1pbmltdW0gdmlzaWJpbHR5IHlvdSBzaG91bGQgbWFpbnRhaW4/JywgXCJub25lIC0geW91IGNhbm5vdCBvcGVyYXRlIFZGUlwiLCBbJzgwMG0nLCAnMjAwMG0nLCAnNTAwMG0nLCAnOGttJywgJ25vbmUgLSB5b3UgY2Fubm90IG9wZXJhdGUgVkZSJ10sICd0aGUgem9uZSBpcyBjbG9zZWQgZm9yIFZGUiBvcGVyYXRpb25zJyk7XG5cdFx0fVxuXHR9XG5cdGF0aXMucHVzaCgnLCcpO1x0XG5cdGF0aXMucHVzaCh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEFjdGl2ZVJ1bndheXMoKSk7XG5cdGxldCByd3lPcHRzQSA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0UnVud2F5cygpO1xuXHRsZXQgcnd5T3B0c0QgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldFJ1bndheXMoKTtcblx0bGV0IHJ3eU9wdHNDaXJjdWl0cyA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0UnVud2F5cygpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hpY2ggcnVud2F5IHdvdWxkIHlvdSBleHBlY3QgZm9yIGFuIGFycml2YWwnLCB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEFycml2YWxSdW53YXkoKSwgcnd5T3B0c0EsICcnKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doaWNoIHJ1bndheSB3b3VsZCB5b3UgZXhwZWN0IGZvciBhIGRlcGFydHVyZScsIHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0RGVwYXJ0dXJlUnVud2F5KCksIHJ3eU9wdHNELCAnJyk7XG5cdHJ3eU9wdHNDaXJjdWl0cy5wdXNoKCdjaXJjdWl0cyBub3QgYXZhaWxhYmxlJyk7XG5cdGlmICh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldENpcmN1aXRzTGlrZWx5KCkpIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hpY2ggcnVud2F5IHdvdWxkIHlvdSBleHBlY3QgZm9yIGNpcmN1aXRzJywgdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRDaXJjdWl0UnVud2F5KCksIHJ3eU9wdHNDaXJjdWl0cywgJycpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdXaGljaCBydW53YXkgd291bGQgeW91IGV4cGVjdCBmb3IgY2lyY3VpdHMnLCAneW91IHdvdWxkIGJlIHVubGlrZWx5IHRvIGJlIGFsbG93ZWQgY2lyY3VpdHMnLCByd3lPcHRzQ2lyY3VpdHMsICcnKTtcblx0fVxuaWYgKHRoaXMud2VhdGhlclNlcnZpY2UuZ2V0R3JvdW5kQ29uZGl0aW9uKCkgIT09ICcnKSB7XG5cdFx0YXRpcy5wdXNoKCcsJyk7XHRcblx0XHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5tdWx0aXBsZVJ1bndheXMoKSkge1xuXHRcdFx0YXRpcy5wdXNoKCdydW53YXlzJylcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXRpcy5wdXNoKCdydW53YXknKVxuXHRcdH1cblx0XHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS5nZXRHcm91bmRDb25kaXRpb24oKSk7XG5cdH1cblx0YXRpcy5wdXNoKCcsJyk7XHRcblx0YXRpcy5wdXNoKCd3aW5kICcpO1xuXHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS53aW5kQXNTdHJpbmcoKSk7XG5cdGxldCBtYXhYd2luZCA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TWF4WHdpbmQoKTtcblx0aWYgKG1heFh3aW5kID49IDcpIHtcblx0XHRhdGlzLnB1c2goJ2Nyb3NzIHdpbmQgbWF4aW11bSAnICsgdGhpcy50b051bWJlcnMobWF4WHdpbmQpKTtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hhdCBpcyB0aGUgbWF4aW11bSBjcm9zcyB3aW5kIHJlcG9ydGVkPycsIG1heFh3aW5kLnRvU3RyaW5nKCksIFsnMCcsICc1JywgJzcnLCAnMTAnLCAnMTInLCAnMTUnXSwgJycpO1xuXHR9XG5cdFx0XG5cdGF0aXMucHVzaCgnLCcpO1x0XG5cdGlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNDQVZPSygpKSB7XG5cdFx0YXRpcy5wdXNoKCd2aXNpYmlsaXR5Jyk7XHRcblx0XHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS52aXNBc1N0cmluZygpKTtcblx0XHRhdGlzLnB1c2goJywnKTtcdFxuXHR9IGVsc2Uge1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdJcyB0aGVyZSBjbG91ZCBhYm92ZSA1MDAwIGZlZXQ/JywgJ3Bvc3NpYmx5IHllcycsIFsnZGVmaW5pdGVseSB5ZXMnLCAnZGVmaW5pdGVseSBubyddLCBcIkNBVk9LIG1lYW5zIG5vIGNsb3VkIGJlbG93IDUwMDAsIHRoZXJlIGNvdWxkIGJlIGNsb3VkIGFib3ZlIHRoaXMnXCIpO1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdXaGF0IGlzIHRoZSB2aXNpYmlsaXR5PycsICcxMGttIG9yIGdyZWF0ZXInLCBbJzIwMDBtJywgJzUwMDBtJywgJzhrbSddLCBcIkNBVk9LIG1lYW5zIHZpc2liaWxpdHkgbXVzdCBiZSAxMGttIG9yIGdyZWF0ZXJcIik7XG5cdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ0NvdWxkIHRoZXJlIGJlIFRvd2VyaW5nIEN1bXVsdXMgYWJvdmUgdGhlIGFlcm9kcm9tZT8nLCAnbm8nLCBbJ3llcyddLCBcInRoZXJlIG11c3QgYmUgbm8gdG93ZXJpbmcgQ3VtdWx1cyBpZiBDQVZPS1wiKTtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignQ291bGQgdGhlcmUgYmUgU3RyYXRvY3VtdWx1cyBhYm92ZSB0aGUgYWVyb2Ryb21lPycsICd5ZXMnLCBbJ25vJ10sIFwicHJvdmlkaW5nIHRoZSBjbG91ZCBpcyBhYm92ZSA1MDAwJyBpdCBjYW4gc3RpbGwgYmUgQ0FWT0tcIik7XG5cdH1cbiAgICAgICBcdGF0aXMucHVzaCgnd2VhdGhlcicpO1x0XG4gICAgICAgXHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS53ZWF0aGVyQXNTdHJpbmcoKSk7XG5cdGF0aXMucHVzaCgnLCcpO1x0XG5cdGlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNGT0coKSkge1xuXHRcdGlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNDQVZPSygpKSB7XG5cdFx0XHRhdGlzLnB1c2goJ2Nsb3VkJyk7XHRcblx0XHRcdGF0aXMucHVzaCh0aGlzLndlYXRoZXJTZXJ2aWNlLmNsb3VkQXNTdHJpbmcoKSk7XG5cdFx0XHRhdGlzLnB1c2goJywnKTtcdFxuXHRcdH1cblx0fVxuICAgICAgIFx0YXRpcy5wdXNoKCd0ZW1wZXJhdHVyZScpO1x0XG5cdGF0aXMucHVzaCh0aGlzLnRvTnVtYmVycyh3eC50ZW1wKSk7XG5cdGlmICgod3gudGVtcCAtIHd4LmRld3BvaW50KSA8IDQpIHtcblx0XHRhdGlzLnB1c2goJ2Rld3BvaW50Jyk7XG5cdFx0YXRpcy5wdXNoKHRoaXMudG9OdW1iZXJzKHd4LmRld3BvaW50KSk7XG5cdFx0bGV0IGRpZmYgPSB3eC50ZW1wIC0gd3guZGV3cG9pbnQ7XG5cdFx0aWYgKGRpZmYgPiAwKSB7XG5cdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1dvdWxkIGEgZHJvcCBpbiB0ZW1wZXJhdHVyZSBieSAnICsgZGlmZiArICdkZWdyZWVzIG1hdHRlciBmb3IgdmlzaWJpbGl0eT8nLCAneWVzJywgWyAnbm8nIF0sICd0aGUgZGV3cG9pbnQgaXMgd2l0aGluICcgKyBkaWZmICsgJyBkZWdyZWVzIG9mIHRoZSBhaXIgdGVtcGVyYXR1cmUgLSBkcm9wcGluZyB0ZW1wZXJhdHVyZSBjb3VsZCByZXN1bHQgaW4gY2xvdWQgZm9ybWluZycpO1xuXHRcdH1cblx0fVxuXHRhdGlzLnB1c2goJywnKTtcdFxuICAgICAgIFx0YXRpcy5wdXNoKCdRIE4gSCcpO1x0XG5cdGF0aXMucHVzaCh3eC5xbmgpO1xuXHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hhdCBpcyB0aGUgUU5IPycsIHRoaXMud2VhdGhlclNlcnZpY2UucW5oTnVtYmVyLnRvU3RyaW5nKCksIFsgJzEwMDknLCAnMTAxMycsICcxMDE1JywgJzEwMDUnLCAnMTAxNycgXSwgJycpO1xuXHRhdGlzLnB1c2goJywnKTtcdFxuXG5cdGxldCBzcGVjOiBzdHJpbmdbXSA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0U3BlY2lhbGl0aWVzKCk7XG5cdGlmIChzcGVjLmxlbmd0aCA+IDApIHtcblx0XHRhdGlzLnB1c2goc3BlYy5qb2luKCcsICcpKTtcblx0XHRhdGlzLnB1c2goJywnKTtcdFxuXHR9XG5cdGF0aXMucHVzaCgnb24gZmlyc3QgY29udGFjdCB3aXRoJyk7XHRcblx0YXRpcy5wdXNoKGFkTmFtZSk7XHRcblx0YXRpcy5wdXNoKHRoaXMuYWVyb2Ryb21lc1NlcnZpY2Uuc2VydmljZXNBc1N0cmluZygpKTtcdFxuXHRhdGlzLnB1c2goJ25vdGlmeSByZWNlaXB0IG9mIGluZm9ybWF0aW9uJyk7XHRcblx0YXRpcy5wdXNoKGlkZW50KTtcdFxuXHRhdGlzLnB1c2goJy4nKTtcdFxuXG5cdGxldCBhID0gYXRpcy5qb2luKCcgJyk7XG5cdGNvbnNvbGUubG9nKCc+JywgYSk7XG5cdHJldHVybiBhO1xuICAgfVxuXG4gICBnZXRJZGVudCgpIHtcbiAgIFx0bGV0IGNoSW5kZXggPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3KTtcblx0bGV0IGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShjaEluZGV4ICsgNjUpO1xuXHR0aGlzLmlkZW50ID0gY2g7XG5cdHJldHVybiB0aGlzLnNwZWFrU2VydmljZS5hbHBoYWJldChjaCk7XG4gICB9XG5cbiAgIHB1YmxpYyB0b051bWJlcnMobjogbnVtYmVyKSA6IHN0cmluZyB7XG4gICBcdGxldCBtYXAgPSB7XG5cdFx0JzAnOiAnemVybycsXG5cdFx0JzEnOiAnd3VuJyxcblx0XHQnMic6ICd0d28nLFxuXHRcdCczJzogJ3RocmVlJyxcblx0XHQnNCc6ICdmb3JlJyxcblx0XHQnNSc6ICdmaWZlJyxcblx0XHQnNic6ICdzaXgnLFxuXHRcdCc3JzogJ3NlZmZlbicsXG5cdFx0JzgnOiAnZWlnaHQnLFxuXHRcdCc5JzogJ25pbmVyJyxcblx0XHR9O1xuICAgXHRsZXQgbnN0ID0gbi50b1N0cmluZygpO1xuXHRsZXQgZCA9IG5zdC5zcGxpdCgnJyk7XG5cdGxldCByZXNwb25zZTogc3RyaW5nW10gPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGRzdCA9IGRbaV07XG5cdFx0bGV0IGRQaG9uID0gbWFwW2RzdF07XG5cdFx0aWYgKGRQaG9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlc3BvbnNlLnB1c2goZFBob24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0cmVzcG9uc2UucHVzaChkc3QpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzcG9uc2Uuam9pbignICcpO1xuICAgfVxuXG59XG4iXX0=