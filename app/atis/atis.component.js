"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("ui/dialogs");
var page_1 = require("tns-core-modules/ui/page");
var atis_service_1 = require("../common/atis.service");
var question_service_1 = require("../common/question.service");
var speak_service_1 = require("../common/speak.service");
var user_service_1 = require("../common/user.service");
var aerodromes_service_1 = require("../aerodromes/aerodromes.service");
var AtisComponent = /** @class */ (function () {
    function AtisComponent(atisService, aerodromesService, questionService, userService, speakService, _page) {
        var _this = this;
        this.atisService = atisService;
        this.aerodromesService = aerodromesService;
        this.questionService = questionService;
        this.userService = userService;
        this.speakService = speakService;
        this._page = _page;
        this.ident = '';
        this.approach = '';
        this.rwys = '';
        this.vis = '';
        this.wind = '';
        this.weather = '';
        this.temp = '';
        this.qnh = '';
        this.other = '';
        this.knownAds = [];
        this.answeredQuestions = [];
        this.difficultyOptions = [
            'simple', 'intermediate', 'advanced'
        ];
        this.difficulty = 'simple';
        this.airspaceOptions = [
            'A', 'C', 'D', 'E', 'G', 'CTAF'
        ];
        this.airspace = 'G';
        this.ad = 'YSCN';
        this.currentAtis = '';
        this.stopQuestions = false;
        this.speech = true;
        this.cheat = false;
        this.shorthand = '';
        this.subscriptions = this._page.on("loaded", function () {
            _this.showHelp();
        });
    }
    AtisComponent.prototype.ngOnInit = function () {
        this.knownAds = this.aerodromesService.getKnownAds();
    };
    AtisComponent.prototype.ngOnDestroy = function () {
        this._page.off(this.subscriptions);
    };
    AtisComponent.prototype.showHelp = function () {
        var instructions = "This exercise is to develop your ability to confidently copy and understand ATIS transmissions.\n" +
            "Instructions:\n" +
            "Get the ATIS, (repeat if necessary until you are confident you have understood it).\n" +
            "Then, answer the questions." +
            "The aim is to be able to quickly and accurately extract the information you need.\n";
        var options = {
            title: 'Instructions',
            message: instructions,
            okButtonText: "OK"
        };
        dialogs_1.alert(options).then(function (result) { });
    };
    AtisComponent.prototype.getSpeech = function () {
        return this.speech;
    };
    AtisComponent.prototype.toggleSpeech = function (ev) {
        this.speech = ev.object.checked;
        this.speakService.setSpeech(this.speech);
    };
    AtisComponent.prototype.atis = function (getNew) {
        this.cheat = false;
        this.answeredQuestions = [];
        var airspace = this.userService.getCurrentAirspace();
        var level = this.userService.getCurrentDifficulty();
        if (getNew || (this.currentAtis === '')) {
            this.currentAtis = this.atisService.generateAtis(level);
        }
        this.shorthand = this.atisService.getShorthandAtis();
        this.ident = this.atisService.getCurrentIdent();
        this.approach = this.atisService.getCurrentApproach();
        this.rwys = this.atisService.getCurrentRunways().replace(/rwy/g, '');
        this.wind = this.atisService.getCurrentWind();
        this.wind += ' ' + this.aerodromesService.getMaxXwindAsShorthand();
        this.vis = this.atisService.getCurrentVis();
        this.weather = this.atisService.getCurrentWeather();
        this.weather += ' ' + this.atisService.getCurrentCloud();
        this.temp = 'T' + this.atisService.getCurrentTemp();
        this.qnh = this.atisService.getCurrentQNH();
        this.other = this.atisService.getCurrentOther();
        switch (level) {
            case 'advanced':
                this.speakService.setLang('en-AU');
                this.speakService.setRate(1.6);
                break;
            case 'intermediate':
                this.speakService.setLang('en-AU');
                this.speakService.setRate(1.3);
                break;
            case 'simple':
                this.speakService.setLang('en-AU');
                this.speakService.setRate(1);
                break;
            default:
                this.speakService.setLang('en-AU');
                this.speakService.setRate(1);
        }
        this.speakService.speak(this.currentAtis);
    };
    AtisComponent.prototype.airspaceChange = function (elem, airspace) {
        if (elem.checked) {
            this.userService.setAirspace(airspace);
        }
    };
    AtisComponent.prototype.difficultyChange = function (elem, difficulty) {
        if (elem.checked) {
            this.userService.setDifficulty(difficulty);
        }
    };
    AtisComponent.prototype.getAd = function () {
        return this.ad;
    };
    AtisComponent.prototype.adChange = function (elem, ad) {
        if (elem.checked) {
            this.ad = ad;
            this.aerodromesService.setAd(ad);
        }
    };
    AtisComponent.prototype.getAirspace = function () {
        return this.userService.getCurrentAirspace();
    };
    AtisComponent.prototype.getDifficulty = function () {
        return this.userService.getCurrentDifficulty();
    };
    AtisComponent.prototype.showAnswer = function (ans) {
        var _this = this;
        var options = {
            title: 'Answer',
            message: ans,
            okButtonText: "OK"
        };
        dialogs_1.alert(options).then(function (result) { _this.testCopy(); });
    };
    AtisComponent.prototype.testCopy = function () {
        var _this = this;
        var question = this.questionService.getNextQuestion();
        if (question === undefined) {
            this.stopQuestions = true;
            this.cheat = true;
            return;
        }
        this.stopQuestions = false;
        var options = {
            title: question.q,
            message: 'select the most correct answer',
            cancelButtonText: "Cancel",
            actions: Object.keys(question.list)
        };
        dialogs_1.action(options).then(function (result) {
            if (result !== 'Cancel') {
                var answer = question.q + "\nyou said: " + result + "\n";
                if (question.c.toLowerCase() === result.toLowerCase()) {
                    answer += "\nCORRECT!\n";
                }
                else {
                    answer += "\nincorrect, should be: " + question.c;
                }
                if (question.r !== '') {
                    answer += "\n(" + question.r + ')';
                }
                _this.answeredQuestions.push(answer);
                _this.showAnswer(answer);
            }
            else {
                _this.stopQuestions = true;
            }
        });
    };
    AtisComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-atis',
            templateUrl: './atis.component.html',
            styleUrls: ['./atis.component.scss']
        }),
        __metadata("design:paramtypes", [atis_service_1.CommonAtisService,
            aerodromes_service_1.AerodromesService,
            question_service_1.CommonQuestionService,
            user_service_1.CommonUserService,
            speak_service_1.CommonSpeakService,
            page_1.Page])
    ], AtisComponent);
    return AtisComponent;
}());
exports.AtisComponent = AtisComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzQ0FBMkM7QUFDM0MsaURBQWdEO0FBR2hELHVEQUEyRDtBQUMzRCwrREFBbUU7QUFDbkUseURBQTZEO0FBQzdELHVEQUEyRDtBQUMzRCx1RUFBcUU7QUFTckU7SUFpQ0MsdUJBQW9CLFdBQThCLEVBQ3ZDLGlCQUFvQyxFQUNwQyxlQUFzQyxFQUN0QyxXQUE4QixFQUM5QixZQUFnQyxFQUNoQyxLQUFXO1FBTHRCLGlCQVdDO1FBWG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUN2QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUF1QjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQU07UUFqQ2QsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFFakMsc0JBQWlCLEdBQWE7WUFDckMsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVO1NBQ3BDLENBQUM7UUFDTSxlQUFVLEdBQVcsUUFBUSxDQUFDO1FBQzlCLG9CQUFlLEdBQWE7WUFDbkMsR0FBRyxFQUFFLEdBQUcsRUFBRSxH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RUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxJQUFJLGNBQWMsQ0FBQztnQkFDMUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDUCxNQUFNLElBQUksMEJBQTBCLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3BDLENBQUM7Z0JBQ0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDM0IsQ0FBQztRQUNLLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQTVMVyxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQWtDZ0MsZ0NBQWlCO1lBQ3BCLHNDQUFpQjtZQUNuQix3Q0FBcUI7WUFDekIsZ0NBQWlCO1lBQ2hCLGtDQUFrQjtZQUN6QixXQUFJO09BdENWLGFBQWEsQ0E2THpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdMRCxJQTZMQztBQTdMWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBhY3Rpb24sIGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5cblxuaW1wb3J0IHsgQ29tbW9uQXRpc1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2F0aXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25TcGVha1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vblVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBZXJvZHJvbWVzU2VydmljZSB9IGZyb20gJy4uL2Flcm9kcm9tZXMvYWVyb2Ryb21lcy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhcHAtYXRpcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdGlzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXRpcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF0aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbi8qQFZpZXdDaGlsZChcIkNCMVwiKSBhaXJzcGFjZUNoZWNrYm94OiBFbGVtZW50UmVmOyovXG5cblx0cHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBhbnk7XG5cdHByaXZhdGUgaWRlbnQ6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIGFwcHJvYWNoOiBzdHJpbmcgPSAnJztcblx0cHJpdmF0ZSByd3lzOiBzdHJpbmcgPSAnJztcblx0cHJpdmF0ZSB2aXM6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHdpbmQ6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHdlYXRoZXI6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHRlbXA6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHFuaDogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgb3RoZXI6IHN0cmluZyA9ICcnO1xuXG5cdHByaXZhdGUga25vd25BZHM6IHN0cmluZ1tdID0gW107XG5cdHByaXZhdGUgYW5zd2VyZWRRdWVzdGlvbnM6IHN0cmluZ1tdID0gW107XG5cblx0cHJpdmF0ZSBkaWZmaWN1bHR5T3B0aW9uczogc3RyaW5nW10gPSBbXG5cdFx0J3NpbXBsZScsICdpbnRlcm1lZGlhdGUnLCAnYWR2YW5jZWQnXG5cdF07XG5cdHByaXZhdGUgZGlmZmljdWx0eTogc3RyaW5nID0gJ3NpbXBsZSc7XG5cdHByaXZhdGUgYWlyc3BhY2VPcHRpb25zOiBzdHJpbmdbXSA9IFtcblx0XHQnQScsICdDJywgJ0QnLCAnRScsICdHJywgJ0NUQUYnXG5cdF07XG5cdHByaXZhdGUgYWlyc3BhY2U6IHN0cmluZyA9ICdHJztcblx0cHJpdmF0ZSBhZDogc3RyaW5nID0gJ1lTQ04nO1xuXHRwcml2YXRlIGN1cnJlbnRBdGlzOiBzdHJpbmcgPSAnJztcblx0cHJpdmF0ZSBzdG9wUXVlc3Rpb25zOiBib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgc3BlZWNoOiBib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBjaGVhdDogYm9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIHNob3J0aGFuZDogc3RyaW5nID0gJyc7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBhdGlzU2VydmljZTogQ29tbW9uQXRpc1NlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSBhZXJvZHJvbWVzU2VydmljZTogQWVyb2Ryb21lc1NlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSBxdWVzdGlvblNlcnZpY2U6IENvbW1vblF1ZXN0aW9uU2VydmljZSxcblx0XHRcdCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBDb21tb25Vc2VyU2VydmljZSxcblx0XHRcdCBwcml2YXRlIHNwZWFrU2VydmljZTogQ29tbW9uU3BlYWtTZXJ2aWNlLFxuXHRcdFx0IHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHtcblxuXHRcdFx0IHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3BhZ2Uub24oXCJsb2FkZWRcIiwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNob3dIZWxwKCk7XG4gICAgICAgIFx0XHR9KTtcblxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5rbm93bkFkcyA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0S25vd25BZHMoKTtcbiAgICAgICBcdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcbiAgICBcdFx0dGhpcy5fcGFnZS5vZmYodGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICAgICAgfVxuXG5cdHNob3dIZWxwKCkge1xuXHRcdGxldCBpbnN0cnVjdGlvbnMgPSBcIlRoaXMgZXhlcmNpc2UgaXMgdG8gZGV2ZWxvcCB5b3VyIGFiaWxpdHkgdG8gY29uZmlkZW50bHkgY29weSBhbmQgdW5kZXJzdGFuZCBBVElTIHRyYW5zbWlzc2lvbnMuXFxuXCIgK1xuXHRcdFx0XHRcIkluc3RydWN0aW9uczpcXG5cIiArXG5cdFx0XHRcdFwiR2V0IHRoZSBBVElTLCAocmVwZWF0IGlmIG5lY2Vzc2FyeSB1bnRpbCB5b3UgYXJlIGNvbmZpZGVudCB5b3UgaGF2ZSB1bmRlcnN0b29kIGl0KS5cXG5cIiArXG5cdFx0XHRcdFwiVGhlbiwgYW5zd2VyIHRoZSBxdWVzdGlvbnMuXCIgK1xuXHRcdFx0XHRcIlRoZSBhaW0gaXMgdG8gYmUgYWJsZSB0byBxdWlja2x5IGFuZCBhY2N1cmF0ZWx5IGV4dHJhY3QgdGhlIGluZm9ybWF0aW9uIHlvdSBuZWVkLlxcblwiO1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdCAgICB0aXRsZTogJ0luc3RydWN0aW9ucycsXG5cdFx0ICAgIG1lc3NhZ2U6IGluc3RydWN0aW9ucyxcblx0XHQgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcblx0XHR9O1xuXHRcdGFsZXJ0KG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4geyB9KTtcblx0fVxuXG5cdGdldFNwZWVjaCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5zcGVlY2g7XG5cdH1cblxuXHR0b2dnbGVTcGVlY2goZXYpIHtcblx0XHR0aGlzLnNwZWVjaCA9IGV2Lm9iamVjdC5jaGVja2VkO1xuXHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFNwZWVjaCh0aGlzLnNwZWVjaCk7XG5cdH1cblxuXHRwdWJsaWMgYXRpcyhnZXROZXc6IGJvb2xlYW4pIHtcblx0XHR0aGlzLmNoZWF0ID0gZmFsc2U7XG5cdFx0dGhpcy5hbnN3ZXJlZFF1ZXN0aW9ucyA9IFtdO1xuXHRcdGxldCBhaXJzcGFjZSA9IHRoaXMudXNlclNlcnZpY2UuZ2V0Q3VycmVudEFpcnNwYWNlKCk7XG5cdFx0bGV0IGxldmVsID0gdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50RGlmZmljdWx0eSgpO1xuXHRcdGlmIChnZXROZXcgfHwgKHRoaXMuY3VycmVudEF0aXMgPT09ICcnKSkge1xuXHRcdFx0dGhpcy5jdXJyZW50QXRpcyA9IHRoaXMuYXRpc1NlcnZpY2UuZ2VuZXJhdGVBdGlzKGxldmVsKTtcblx0XHR9XG5cdFx0dGhpcy5zaG9ydGhhbmQgPSB0aGlzLmF0aXNTZXJ2aWNlLmdldFNob3J0aGFuZEF0aXMoKTtcblx0XHR0aGlzLmlkZW50ID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50SWRlbnQoKTtcblx0XHR0aGlzLmFwcHJvYWNoID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50QXBwcm9hY2goKTtcblx0XHR0aGlzLnJ3eXMgPSB0aGlzLmF0aXNTZXJ2aWNlLmdldEN1cnJlbnRSdW53YXlzKCkucmVwbGFjZSgvcnd5L2csICcnKTtcblx0XHR0aGlzLndpbmQgPSB0aGlzLmF0aXNTZXJ2aWNlLmdldEN1cnJlbnRXaW5kKCk7XG5cdFx0dGhpcy53aW5kICs9ICcgJyArIHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0TWF4WHdpbmRBc1Nob3J0aGFuZCgpO1xuXHRcdHRoaXMudmlzID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50VmlzKCk7XG5cdFx0dGhpcy53ZWF0aGVyID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50V2VhdGhlcigpO1xuXHRcdHRoaXMud2VhdGhlciArPSAnICcgKyB0aGlzLmF0aXNTZXJ2aWNlLmdldEN1cnJlbnRDbG91ZCgpO1xuXHRcdHRoaXMudGVtcCA9ICdUJyArIHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudFRlbXAoKTtcblx0XHR0aGlzLnFuaCA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudFFOSCgpO1xuXHRcdHRoaXMub3RoZXIgPSB0aGlzLmF0aXNTZXJ2aWNlLmdldEN1cnJlbnRPdGhlcigpO1xuXHRcdHN3aXRjaChsZXZlbCkge1xuXHRcdFx0Y2FzZSAnYWR2YW5jZWQnOiBcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0TGFuZygnZW4tQVUnKTtcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0UmF0ZSgxLjYpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2ludGVybWVkaWF0ZSc6IFxuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRMYW5nKCdlbi1BVScpO1xuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRSYXRlKDEuMyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc2ltcGxlJzogXG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldExhbmcoJ2VuLUFVJyk7XG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFJhdGUoMSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0TGFuZygnZW4tQVUnKTtcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0UmF0ZSgxKTtcblx0XHR9XHRcblx0XHR0aGlzLnNwZWFrU2VydmljZS5zcGVhayh0aGlzLmN1cnJlbnRBdGlzKTtcblx0fVxuXG5cdGFpcnNwYWNlQ2hhbmdlKGVsZW0sIGFpcnNwYWNlKSB7XG5cdFx0aWYgKGVsZW0uY2hlY2tlZCkge1xuXHRcdFx0dGhpcy51c2VyU2VydmljZS5zZXRBaXJzcGFjZShhaXJzcGFjZSk7XG5cdFx0fVxuXHR9XG5cblx0ZGlmZmljdWx0eUNoYW5nZShlbGVtLCBkaWZmaWN1bHR5KSB7XG5cdFx0aWYgKGVsZW0uY2hlY2tlZCkge1xuXHRcdFx0dGhpcy51c2VyU2VydmljZS5zZXREaWZmaWN1bHR5KGRpZmZpY3VsdHkpO1xuXHRcdH1cblx0fVxuXG5cdGdldEFkKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuYWQ7XG5cdH1cblxuXHRhZENoYW5nZShlbGVtLCBhZCkge1xuXHRcdGlmIChlbGVtLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMuYWQgPSBhZDtcbiAgXHRcdFx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXRBZChhZCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0QWlyc3BhY2UoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50QWlyc3BhY2UoKTtcblx0fVxuXG5cdGdldERpZmZpY3VsdHkoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50RGlmZmljdWx0eSgpO1xuXHR9XG5cblx0c2hvd0Fuc3dlcihhbnM6IHN0cmluZykge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdCAgICB0aXRsZTogJ0Fuc3dlcicsXG5cdFx0ICAgIG1lc3NhZ2U6IGFucyxcblx0XHQgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcblx0XHR9O1xuXHRcdGFsZXJ0KG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4geyB0aGlzLnRlc3RDb3B5KCk7IH0pO1xuXHR9XG5cblx0dGVzdENvcHkoKSB7XG5cdFx0bGV0IHF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvblNlcnZpY2UuZ2V0TmV4dFF1ZXN0aW9uKCk7XG5cdFx0aWYgKHF1ZXN0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuc3RvcFF1ZXN0aW9ucyA9IHRydWU7XG5cdFx0XHR0aGlzLmNoZWF0ID0gdHJ1ZTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5zdG9wUXVlc3Rpb25zID0gZmFsc2U7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0ICAgIHRpdGxlOiBxdWVzdGlvbi5xLFxuXHRcdCAgICBtZXNzYWdlOiAnc2VsZWN0IHRoZSBtb3N0IGNvcnJlY3QgYW5zd2VyJyxcblx0XHQgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcblx0XHQgICAgYWN0aW9uczogT2JqZWN0LmtleXMocXVlc3Rpb24ubGlzdClcblx0XHR9O1xuXHRcdGFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdGlmIChyZXN1bHQgIT09ICdDYW5jZWwnKSB7XG5cdFx0XHRcdGxldCBhbnN3ZXIgPSBxdWVzdGlvbi5xICsgXCJcXG55b3Ugc2FpZDogXCIgKyByZXN1bHQgK1wiXFxuXCI7XG5cdFx0XHRcdGlmIChxdWVzdGlvbi5jLnRvTG93ZXJDYXNlKCkgPT09IHJlc3VsdC50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0YW5zd2VyICs9IFwiXFxuQ09SUkVDVCFcXG5cIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbnN3ZXIgKz0gXCJcXG5pbmNvcnJlY3QsIHNob3VsZCBiZTogXCIgKyBxdWVzdGlvbi5jO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChxdWVzdGlvbi5yICE9PSAnJykge1xuXHRcdFx0XHRcdGFuc3dlciArPSBcIlxcbihcIiArIHF1ZXN0aW9uLnIgKyAnKSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5hbnN3ZXJlZFF1ZXN0aW9ucy5wdXNoKGFuc3dlcik7XG5cdFx0XHRcdHRoaXMuc2hvd0Fuc3dlcihhbnN3ZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zdG9wUXVlc3Rpb25zID0gdHJ1ZTtcblx0XHRcdH1cblx0ICAgICAgIFx0fSk7XG5cdH1cbn1cbiJdfQ==