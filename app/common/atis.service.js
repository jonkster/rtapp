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
    }
    CommonAtisService.prototype.getCurrentIdent = function () {
        return this.ident;
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
    CommonAtisService.prototype.generateAtis = function (level) {
        var wx = this.weatherService.createNewWeather();
        var adName = this.aerodromesService.getName();
        this.aerodromesService.setWind(wx.windDirection, wx.windStrength);
        var ident = this.getIdent();
        var atis = [];
        this.questionService.clearQuestions();
        this.questionService.addQuestion('what information have you received?', ident, ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'], '');
        atis.push(adName);
        atis.push('terminal information');
        atis.push(ident);
        if (this.weatherService.isIMC()) {
            atis.push('expect instrument approach');
            this.questionService.addQuestion('If arriving, what sort of approach would you expect?', "instrument", ['visual', 'special vfr', 'standard', 'cannot be determined'], 'atis says expect instrument approach');
            if (this.aerodromesService.getAllowSpecialVFR()) {
                if (this.weatherService.isRVFR()) {
                    this.questionService.addQuestion('For fixed wing VFR aircraft, what is the minimum visibilty you should maintain?', "1600m", ['800m', '2000m', '5000m', '8km', 'none - you cannot operate VFR'], 'special VFR procedures - you must maintain 1600m visibility');
                    atis.push('special V F R procedures apply');
                }
            }
        }
        else {
            this.questionService.addQuestion('If arriving, what sort of approach would you most likely expect?', "visual", ['instrument', 'ils', 'special vfr', 'standard', 'cannot be determined'], 'no mention is made of specific approaches so probably visual');
        }
        if (this.aerodromesService.getAllowSpecialVFR()) {
            if (!this.weatherService.isVFR()) {
                atis.push('control zone closed for V F R operations');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRpcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRpcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhEQUE0RDtBQUU1RCwrREFBbUU7QUFDbkUseURBQTZEO0FBQzdELHVFQUFxRTtBQUdyRTtJQUtFLDJCQUFvQixjQUE4QixFQUN6QyxZQUFnQyxFQUNoQyxlQUFzQyxFQUN0QyxpQkFBb0M7UUFIekIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3pDLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBdUI7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQU5yQyxVQUFLLEdBQVcsRUFBRSxDQUFDO0lBTXNCLENBQUM7SUFFM0MsMkNBQWUsR0FBdEI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNuQixDQUFDO0lBRU0sNkNBQWlCLEdBQXhCO1FBQ0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9GLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3pFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksSUFBSSxPQUFPLENBQUM7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFB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RSxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBQ0YsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUF4TFMsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7eUNBTXlCLGdDQUFjO1lBQzNCLGtDQUFrQjtZQUNmLHdDQUFxQjtZQUNuQixzQ0FBaUI7T0FSbEMsaUJBQWlCLENBMEw3QjtJQUFELHdCQUFDO0NBQUEsQUExTEQsSUEwTEM7QUExTFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2VhdGhlclNlcnZpY2UgfSBmcm9tICcuLi93ZWF0aGVyL3dlYXRoZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXZWF0aGVyLCBDbG91ZCB9IGZyb20gJy4uL3dlYXRoZXIvd2VhdGhlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25TcGVha1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFlcm9kcm9tZXNTZXJ2aWNlIH0gZnJvbSBcIi4uL2Flcm9kcm9tZXMvYWVyb2Ryb21lcy5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb21tb25BdGlzU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBpZGVudDogc3RyaW5nID0gJyc7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdlYXRoZXJTZXJ2aWNlOiBXZWF0aGVyU2VydmljZSxcblx0ICBwcml2YXRlIHNwZWFrU2VydmljZTogQ29tbW9uU3BlYWtTZXJ2aWNlLFxuXHQgIHByaXZhdGUgcXVlc3Rpb25TZXJ2aWNlOiBDb21tb25RdWVzdGlvblNlcnZpY2UsXG5cdCAgcHJpdmF0ZSBhZXJvZHJvbWVzU2VydmljZTogQWVyb2Ryb21lc1NlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50SWRlbnQoKSB7XG5cdCAgcmV0dXJuIHRoaXMuaWRlbnQ7XG4gIH0gIFxuXG4gIHB1YmxpYyBnZXRDdXJyZW50UnVud2F5cygpIHtcbiAgXHRsZXQgcnd5cyA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0QXJyaXZhbFJ1bndheSgpO1xuXHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBcnJpdmFsUnVud2F5KCkgIT09IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0RGVwYXJ0dXJlUnVud2F5KCkpIHtcblx0XHRyd3lzICs9ICcgYXJyICcgKyB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldERlcGFydHVyZVJ1bndheSgpICsgJyBkZXAgJztcblx0fSBlbHNlIHtcblx0XHRyd3lzICs9ICcgYStkICc7XG5cdH1cblx0aWYgKHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0Q2lyY3VpdFJ1bndheSgpICE9PSAnJykge1xuXHRcdHJ3eXMgKz0gdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRDaXJjdWl0UnVud2F5KCkgKyAnIGNjdCc7XG5cdH1cblx0cmV0dXJuIHJ3eXM7XG4gIH0gIFxuXG4gIHB1YmxpYyBnZXRDdXJyZW50V2luZCgpIHtcbiAgXHRyZXR1cm4gdGhpcy53ZWF0aGVyU2VydmljZS53aW5kQXNTaG9ydGhhbmQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50VmlzKCkge1xuICBcdHJldHVybiB0aGlzLndlYXRoZXJTZXJ2aWNlLnZpc0FzU2hvcnRoYW5kKCk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVBdGlzKGxldmVsOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgXHRsZXQgd3g6V2VhdGhlciA9IHRoaXMud2VhdGhlclNlcnZpY2UuY3JlYXRlTmV3V2VhdGhlcigpO1xuICBcdGxldCBhZE5hbWUgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldE5hbWUoKTtcbiAgXHR0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLnNldFdpbmQod3gud2luZERpcmVjdGlvbiwgd3gud2luZFN0cmVuZ3RoKTtcbiAgXHRsZXQgaWRlbnQgPSB0aGlzLmdldElkZW50KCk7XG4gIFx0bGV0IGF0aXM6IHN0cmluZ1tdID0gW107XG5cblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuY2xlYXJRdWVzdGlvbnMoKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ3doYXQgaW5mb3JtYXRpb24gaGF2ZSB5b3UgcmVjZWl2ZWQ/JywgaWRlbnQsIFsnYWxwaGEnLCAnYnJhdm8nLCAnY2hhcmxpZScsICdkZWx0YScsICdlY2hvJywgJ2ZveHRyb3QnXSwgJycpO1xuXG5cdGF0aXMucHVzaChhZE5hbWUpO1x0XG5cdGF0aXMucHVzaCgndGVybWluYWwgaW5mb3JtYXRpb24nKTtcdFxuXHRhdGlzLnB1c2goaWRlbnQpO1x0XG5cdGlmICh0aGlzLndlYXRoZXJTZXJ2aWNlLmlzSU1DKCkpIHtcblx0XHRhdGlzLnB1c2goJ2V4cGVjdCBpbnN0cnVtZW50IGFwcHJvYWNoJyk7XG5cdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ0lmIGFycml2aW5nLCB3aGF0IHNvcnQgb2YgYXBwcm9hY2ggd291bGQgeW91IGV4cGVjdD8nLCBcImluc3RydW1lbnRcIiwgWyd2aXN1YWwnLCAnc3BlY2lhbCB2ZnInLCAnc3RhbmRhcmQnLCAnY2Fubm90IGJlIGRldGVybWluZWQnXSwgJ2F0aXMgc2F5cyBleHBlY3QgaW5zdHJ1bWVudCBhcHByb2FjaCcpO1xuXHRcdGlmICh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEFsbG93U3BlY2lhbFZGUigpKSB7XG5cdFx0XHRpZiAodGhpcy53ZWF0aGVyU2VydmljZS5pc1JWRlIoKSkge1xuXHRcdFx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignRm9yIGZpeGVkIHdpbmcgVkZSIGFpcmNyYWZ0LCB3aGF0IGlzIHRoZSBtaW5pbXVtIHZpc2liaWx0eSB5b3Ugc2hvdWxkIG1haW50YWluPycsIFwiMTYwMG1cIiwgWyc4MDBtJywgJzIwMDBtJywgJzUwMDBtJywgJzhrbScsICdub25lIC0geW91IGNhbm5vdCBvcGVyYXRlIFZGUiddLCAnc3BlY2lhbCBWRlIgcHJvY2VkdXJlcyAtIHlvdSBtdXN0IG1haW50YWluIDE2MDBtIHZpc2liaWxpdHknKTtcblx0XHRcdFx0YXRpcy5wdXNoKCdzcGVjaWFsIFYgRiBSIHByb2NlZHVyZXMgYXBwbHknKVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignSWYgYXJyaXZpbmcsIHdoYXQgc29ydCBvZiBhcHByb2FjaCB3b3VsZCB5b3UgbW9zdCBsaWtlbHkgZXhwZWN0PycsIFwidmlzdWFsXCIsIFsgJ2luc3RydW1lbnQnLCAnaWxzJywgJ3NwZWNpYWwgdmZyJywgJ3N0YW5kYXJkJywgJ2Nhbm5vdCBiZSBkZXRlcm1pbmVkJ10sICdubyBtZW50aW9uIGlzIG1hZGUgb2Ygc3BlY2lmaWMgYXBwcm9hY2hlcyBzbyBwcm9iYWJseSB2aXN1YWwnKTtcblx0fVxuXHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBbGxvd1NwZWNpYWxWRlIoKSkge1xuXHRcdGlmICghIHRoaXMud2VhdGhlclNlcnZpY2UuaXNWRlIoKSkge1xuXHRcdFx0YXRpcy5wdXNoKCdjb250cm9sIHpvbmUgY2xvc2VkIGZvciBWIEYgUiBvcGVyYXRpb25zJyk7XG5cdFx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignRm9yIGZpeGVkIHdpbmcgVkZSIGFpcmNyYWZ0LCB3aGF0IGlzIHRoZSBtaW5pbXVtIHZpc2liaWx0eSB5b3Ugc2hvdWxkIG1haW50YWluPycsIFwibm9uZSAtIHlvdSBjYW5ub3Qgb3BlcmF0ZSBWRlJcIiwgWyc4MDBtJywgJzIwMDBtJywgJzUwMDBtJywgJzhrbScsICdub25lIC0geW91IGNhbm5vdCBvcGVyYXRlIFZGUiddLCAndGhlIHpvbmUgaXMgY2xvc2VkIGZvciBWRlIgb3BlcmF0aW9ucycpO1xuXHRcdH1cblx0fVxuXHRhdGlzLnB1c2goJywnKTtcdFxuXHRhdGlzLnB1c2godGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBY3RpdmVSdW53YXlzKCkpO1xuXHRsZXQgcnd5T3B0c0EgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldFJ1bndheXMoKTtcblx0bGV0IHJ3eU9wdHNEID0gdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRSdW53YXlzKCk7XG5cdGxldCByd3lPcHRzQ2lyY3VpdHMgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldFJ1bndheXMoKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doaWNoIHJ1bndheSB3b3VsZCB5b3UgZXhwZWN0IGZvciBhbiBhcnJpdmFsJywgdGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRBcnJpdmFsUnVud2F5KCksIHJ3eU9wdHNBLCAnJyk7XG5cdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdXaGljaCBydW53YXkgd291bGQgeW91IGV4cGVjdCBmb3IgYSBkZXBhcnR1cmUnLCB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldERlcGFydHVyZVJ1bndheSgpLCByd3lPcHRzRCwgJycpO1xuXHRyd3lPcHRzQ2lyY3VpdHMucHVzaCgnY2lyY3VpdHMgbm90IGF2YWlsYWJsZScpO1xuXHRpZiAodGhpcy5hZXJvZHJvbWVzU2VydmljZS5nZXRDaXJjdWl0c0xpa2VseSgpKSB7XG5cdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doaWNoIHJ1bndheSB3b3VsZCB5b3UgZXhwZWN0IGZvciBjaXJjdWl0cycsIHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0Q2lyY3VpdFJ1bndheSgpLCByd3lPcHRzQ2lyY3VpdHMsICcnKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hpY2ggcnVud2F5IHdvdWxkIHlvdSBleHBlY3QgZm9yIGNpcmN1aXRzJywgJ3lvdSB3b3VsZCBiZSB1bmxpa2VseSB0byBiZSBhbGxvd2VkIGNpcmN1aXRzJywgcnd5T3B0c0NpcmN1aXRzLCAnJyk7XG5cdH1cbmlmICh0aGlzLndlYXRoZXJTZXJ2aWNlLmdldEdyb3VuZENvbmRpdGlvbigpICE9PSAnJykge1xuXHRcdGF0aXMucHVzaCgnLCcpO1x0XG5cdFx0aWYgKHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UubXVsdGlwbGVSdW53YXlzKCkpIHtcblx0XHRcdGF0aXMucHVzaCgncnVud2F5cycpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGF0aXMucHVzaCgncnVud2F5Jylcblx0XHR9XG5cdFx0YXRpcy5wdXNoKHRoaXMud2VhdGhlclNlcnZpY2UuZ2V0R3JvdW5kQ29uZGl0aW9uKCkpO1xuXHR9XG5cdGF0aXMucHVzaCgnLCcpO1x0XG5cdGF0aXMucHVzaCgnd2luZCAnKTtcblx0YXRpcy5wdXNoKHRoaXMud2VhdGhlclNlcnZpY2Uud2luZEFzU3RyaW5nKCkpO1xuXHRsZXQgbWF4WHdpbmQgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldE1heFh3aW5kKCk7XG5cdGlmIChtYXhYd2luZCA+PSA3KSB7XG5cdFx0YXRpcy5wdXNoKCdjcm9zcyB3aW5kIG1heGltdW0gJyArIHRoaXMudG9OdW1iZXJzKG1heFh3aW5kKSk7XG5cdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doYXQgaXMgdGhlIG1heGltdW0gY3Jvc3Mgd2luZCByZXBvcnRlZD8nLCBtYXhYd2luZC50b1N0cmluZygpLCBbJzAnLCAnNScsICc3JywgJzEwJywgJzEyJywgJzE1J10sICcnKTtcblx0fVxuXHRcdFxuXHRhdGlzLnB1c2goJywnKTtcdFxuXHRpZiAoISB0aGlzLndlYXRoZXJTZXJ2aWNlLmlzQ0FWT0soKSkge1xuXHRcdGF0aXMucHVzaCgndmlzaWJpbGl0eScpO1x0XG5cdFx0YXRpcy5wdXNoKHRoaXMud2VhdGhlclNlcnZpY2UudmlzQXNTdHJpbmcoKSk7XG5cdFx0YXRpcy5wdXNoKCcsJyk7XHRcblx0fSBlbHNlIHtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignSXMgdGhlcmUgY2xvdWQgYWJvdmUgNTAwMCBmZWV0PycsICdwb3NzaWJseSB5ZXMnLCBbJ2RlZmluaXRlbHkgeWVzJywgJ2RlZmluaXRlbHkgbm8nXSwgXCJDQVZPSyBtZWFucyBubyBjbG91ZCBiZWxvdyA1MDAwLCB0aGVyZSBjb3VsZCBiZSBjbG91ZCBhYm92ZSB0aGlzJ1wiKTtcblx0XHR0aGlzLnF1ZXN0aW9uU2VydmljZS5hZGRRdWVzdGlvbignV2hhdCBpcyB0aGUgdmlzaWJpbGl0eT8nLCAnMTBrbSBvciBncmVhdGVyJywgWycyMDAwbScsICc1MDAwbScsICc4a20nXSwgXCJDQVZPSyBtZWFucyB2aXNpYmlsaXR5IG11c3QgYmUgMTBrbSBvciBncmVhdGVyXCIpO1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdDb3VsZCB0aGVyZSBiZSBUb3dlcmluZyBDdW11bHVzIGFib3ZlIHRoZSBhZXJvZHJvbWU/JywgJ25vJywgWyd5ZXMnXSwgXCJ0aGVyZSBtdXN0IGJlIG5vIHRvd2VyaW5nIEN1bXVsdXMgaWYgQ0FWT0tcIik7XG5cdFx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ0NvdWxkIHRoZXJlIGJlIFN0cmF0b2N1bXVsdXMgYWJvdmUgdGhlIGFlcm9kcm9tZT8nLCAneWVzJywgWydubyddLCBcInByb3ZpZGluZyB0aGUgY2xvdWQgaXMgYWJvdmUgNTAwMCcgaXQgY2FuIHN0aWxsIGJlIENBVk9LXCIpO1xuXHR9XG4gICAgICAgXHRhdGlzLnB1c2goJ3dlYXRoZXInKTtcdFxuICAgICAgIFx0YXRpcy5wdXNoKHRoaXMud2VhdGhlclNlcnZpY2Uud2VhdGhlckFzU3RyaW5nKCkpO1xuXHRhdGlzLnB1c2goJywnKTtcdFxuXHRpZiAoISB0aGlzLndlYXRoZXJTZXJ2aWNlLmlzRk9HKCkpIHtcblx0XHRpZiAoISB0aGlzLndlYXRoZXJTZXJ2aWNlLmlzQ0FWT0soKSkge1xuXHRcdFx0YXRpcy5wdXNoKCdjbG91ZCcpO1x0XG5cdFx0XHRhdGlzLnB1c2godGhpcy53ZWF0aGVyU2VydmljZS5jbG91ZEFzU3RyaW5nKCkpO1xuXHRcdFx0YXRpcy5wdXNoKCcsJyk7XHRcblx0XHR9XG5cdH1cbiAgICAgICBcdGF0aXMucHVzaCgndGVtcGVyYXR1cmUnKTtcdFxuXHRhdGlzLnB1c2godGhpcy50b051bWJlcnMod3gudGVtcCkpO1xuXHRpZiAoKHd4LnRlbXAgLSB3eC5kZXdwb2ludCkgPCA0KSB7XG5cdFx0YXRpcy5wdXNoKCdkZXdwb2ludCcpO1xuXHRcdGF0aXMucHVzaCh0aGlzLnRvTnVtYmVycyh3eC5kZXdwb2ludCkpO1xuXHRcdGxldCBkaWZmID0gd3gudGVtcCAtIHd4LmRld3BvaW50O1xuXHRcdGlmIChkaWZmID4gMCkge1xuXHRcdHRoaXMucXVlc3Rpb25TZXJ2aWNlLmFkZFF1ZXN0aW9uKCdXb3VsZCBhIGRyb3AgaW4gdGVtcGVyYXR1cmUgYnkgJyArIGRpZmYgKyAnZGVncmVlcyBtYXR0ZXIgZm9yIHZpc2liaWxpdHk/JywgJ3llcycsIFsgJ25vJyBdLCAndGhlIGRld3BvaW50IGlzIHdpdGhpbiAnICsgZGlmZiArICcgZGVncmVlcyBvZiB0aGUgYWlyIHRlbXBlcmF0dXJlIC0gZHJvcHBpbmcgdGVtcGVyYXR1cmUgY291bGQgcmVzdWx0IGluIGNsb3VkIGZvcm1pbmcnKTtcblx0XHR9XG5cdH1cblx0YXRpcy5wdXNoKCcsJyk7XHRcbiAgICAgICBcdGF0aXMucHVzaCgnUSBOIEgnKTtcdFxuXHRhdGlzLnB1c2god3gucW5oKTtcblx0dGhpcy5xdWVzdGlvblNlcnZpY2UuYWRkUXVlc3Rpb24oJ1doYXQgaXMgdGhlIFFOSD8nLCB0aGlzLndlYXRoZXJTZXJ2aWNlLnFuaE51bWJlci50b1N0cmluZygpLCBbICcxMDA5JywgJzEwMTMnLCAnMTAxNScsICcxMDA1JywgJzEwMTcnIF0sICcnKTtcblx0YXRpcy5wdXNoKCcsJyk7XHRcblxuXHRsZXQgc3BlYzogc3RyaW5nW10gPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldFNwZWNpYWxpdGllcygpO1xuXHRpZiAoc3BlYy5sZW5ndGggPiAwKSB7XG5cdFx0YXRpcy5wdXNoKHNwZWMuam9pbignLCAnKSk7XG5cdFx0YXRpcy5wdXNoKCcsJyk7XHRcblx0fVxuXHRhdGlzLnB1c2goJ29uIGZpcnN0IGNvbnRhY3Qgd2l0aCcpO1x0XG5cdGF0aXMucHVzaChhZE5hbWUpO1x0XG5cdGF0aXMucHVzaCh0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLnNlcnZpY2VzQXNTdHJpbmcoKSk7XHRcblx0YXRpcy5wdXNoKCdub3RpZnkgcmVjZWlwdCBvZiBpbmZvcm1hdGlvbicpO1x0XG5cdGF0aXMucHVzaChpZGVudCk7XHRcblx0YXRpcy5wdXNoKCcuJyk7XHRcblxuXHRsZXQgYSA9IGF0aXMuam9pbignICcpO1xuXHRjb25zb2xlLmxvZygnPicsIGEpO1xuXHRyZXR1cm4gYTtcbiAgIH1cblxuICAgZ2V0SWRlbnQoKSB7XG4gICBcdGxldCBjaEluZGV4ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNyk7XG5cdGxldCBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hJbmRleCArIDY1KTtcblx0dGhpcy5pZGVudCA9IGNoO1xuXHRyZXR1cm4gdGhpcy5zcGVha1NlcnZpY2UuYWxwaGFiZXQoY2gpO1xuICAgfVxuXG4gICBwdWJsaWMgdG9OdW1iZXJzKG46IG51bWJlcikgOiBzdHJpbmcge1xuICAgXHRsZXQgbWFwID0ge1xuXHRcdCcwJzogJ3plcm8nLFxuXHRcdCcxJzogJ3d1bicsXG5cdFx0JzInOiAndHdvJyxcblx0XHQnMyc6ICd0aHJlZScsXG5cdFx0JzQnOiAnZm9yZScsXG5cdFx0JzUnOiAnZmlmZScsXG5cdFx0JzYnOiAnc2l4Jyxcblx0XHQnNyc6ICdzZWZmZW4nLFxuXHRcdCc4JzogJ2VpZ2h0Jyxcblx0XHQnOSc6ICduaW5lcicsXG5cdFx0fTtcbiAgIFx0bGV0IG5zdCA9IG4udG9TdHJpbmcoKTtcblx0bGV0IGQgPSBuc3Quc3BsaXQoJycpO1xuXHRsZXQgcmVzcG9uc2U6IHN0cmluZ1tdID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBkc3QgPSBkW2ldO1xuXHRcdGxldCBkUGhvbiA9IG1hcFtkc3RdO1xuXHRcdGlmIChkUGhvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXNwb25zZS5wdXNoKGRQaG9uKTtcblx0XHR9IGVsc2Uge1xuXHRcdHJlc3BvbnNlLnB1c2goZHN0KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3BvbnNlLmpvaW4oJyAnKTtcbiAgIH1cblxufVxuIl19