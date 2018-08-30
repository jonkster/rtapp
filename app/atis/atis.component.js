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
        this.ident = this.atisService.getCurrentIdent();
        this.approach = this.atisService.getCurrentApproach();
        this.rwys = this.atisService.getCurrentRunways().replace(/ and /g, '+');
        this.wind = this.atisService.getCurrentWind();
        this.wind += ' ' + this.aerodromesService.getMaxXwindAsShorthand();
        this.vis = this.atisService.getCurrentVis();
        this.weather = this.atisService.getCurrentWeather();
        this.weather += ' ' + this.atisService.getCurrentCloud();
        this.qnh = this.atisService.getCurrentQNH();
        this.other = this.atisService.getCurrentOther();
        console.log(this.rwys);
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
                var answer = question.q + ' you said: ' + result;
                if (question.c.toLowerCase() === result.toLowerCase()) {
                    answer += ' CORRECT';
                }
                else {
                    answer += " - incorrect, should be: " + question.c;
                }
                if (question.r !== '') {
                    answer += ' (' + question.r + ')';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzQ0FBMkM7QUFDM0MsaURBQWdEO0FBR2hELHVEQUEyRDtBQUMzRCwrREFBbUU7QUFDbkUseURBQTZEO0FBQzdELHVEQUEyRDtBQUMzRCx1RUFBcUU7QUFTckU7SUErQkMsdUJBQW9CLFdBQThCLEVBQ3ZDLGlCQUFvQyxFQUNwQyxlQUFzQyxFQUN0QyxXQUE4QixFQUM5QixZQUFnQyxFQUNoQyxLQUFXO1FBTHRCLGlCQVdDO1FBWG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUN2QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUF1QjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQU07UUEvQmQsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBRWpDLHNCQUFpQixHQUFhO1lBQ3JDLFFBQVEsRUFBRSxjQUFjLEVBQUUsVUFBVTtTQUNwQyxDQUFDO1FBQ00sZUFBVSxHQUFXLFFBQVEsQ0FBQztRQUM5QixvQkFBZSxHQUFhO1lBQ25DLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVB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LEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMzQixDQUFDO1FBQ0ssQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBekxXLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7eUNBZ0NnQyxnQ0FBaUI7WUFDcEIsc0NBQWlCO1lBQ25CLHdDQUFxQjtZQUN6QixnQ0FBaUI7WUFDaEIsa0NBQWtCO1lBQ3pCLFdBQUk7T0FwQ1YsYUFBYSxDQTBMekI7SUFBRCxvQkFBQztDQUFBLEFBMUxELElBMExDO0FBMUxZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcbmltcG9ydCB7IGFjdGlvbiwgYWxlcnQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcblxuXG5pbXBvcnQgeyBDb21tb25BdGlzU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vYXRpcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25RdWVzdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL3F1ZXN0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vblNwZWFrU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vc3BlYWsuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uVXNlclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFlcm9kcm9tZXNTZXJ2aWNlIH0gZnJvbSAnLi4vYWVyb2Ryb21lcy9hZXJvZHJvbWVzLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1hdGlzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F0aXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hdGlzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXRpc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuLypAVmlld0NoaWxkKFwiQ0IxXCIpIGFpcnNwYWNlQ2hlY2tib3g6IEVsZW1lbnRSZWY7Ki9cblxuXHRwcml2YXRlIHN1YnNjcmlwdGlvbnM6IGFueTtcblx0cHJpdmF0ZSBpZGVudDogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgYXBwcm9hY2g6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHJ3eXM6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHZpczogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgd2luZDogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgd2VhdGhlcjogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgcW5oOiBzdHJpbmcgPSAnJztcblx0cHJpdmF0ZSBvdGhlcjogc3RyaW5nID0gJyc7XG5cblx0cHJpdmF0ZSBrbm93bkFkczogc3RyaW5nW10gPSBbXTtcblx0cHJpdmF0ZSBhbnN3ZXJlZFF1ZXN0aW9uczogc3RyaW5nW10gPSBbXTtcblxuXHRwcml2YXRlIGRpZmZpY3VsdHlPcHRpb25zOiBzdHJpbmdbXSA9IFtcblx0XHQnc2ltcGxlJywgJ2ludGVybWVkaWF0ZScsICdhZHZhbmNlZCdcblx0XTtcblx0cHJpdmF0ZSBkaWZmaWN1bHR5OiBzdHJpbmcgPSAnc2ltcGxlJztcblx0cHJpdmF0ZSBhaXJzcGFjZU9wdGlvbnM6IHN0cmluZ1tdID0gW1xuXHRcdCdBJywgJ0MnLCAnRCcsICdFJywgJ0cnLCAnQ1RBRidcblx0XTtcblx0cHJpdmF0ZSBhaXJzcGFjZTogc3RyaW5nID0gJ0cnO1xuXHRwcml2YXRlIGFkOiBzdHJpbmcgPSAnWVNDTic7XG5cdHByaXZhdGUgY3VycmVudEF0aXM6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHN0b3BRdWVzdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBzcGVlY2g6IGJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIGNoZWF0OiBib29sZWFuID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBhdGlzU2VydmljZTogQ29tbW9uQXRpc1NlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSBhZXJvZHJvbWVzU2VydmljZTogQWVyb2Ryb21lc1NlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSBxdWVzdGlvblNlcnZpY2U6IENvbW1vblF1ZXN0aW9uU2VydmljZSxcblx0XHRcdCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBDb21tb25Vc2VyU2VydmljZSxcblx0XHRcdCBwcml2YXRlIHNwZWFrU2VydmljZTogQ29tbW9uU3BlYWtTZXJ2aWNlLFxuXHRcdFx0IHByaXZhdGUgX3BhZ2U6IFBhZ2UpIHtcblxuXHRcdFx0IHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3BhZ2Uub24oXCJsb2FkZWRcIiwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNob3dIZWxwKCk7XG4gICAgICAgIFx0XHR9KTtcblxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5rbm93bkFkcyA9IHRoaXMuYWVyb2Ryb21lc1NlcnZpY2UuZ2V0S25vd25BZHMoKTtcbiAgICAgICBcdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcbiAgICBcdFx0dGhpcy5fcGFnZS5vZmYodGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICAgICAgfVxuXG5cdHNob3dIZWxwKCkge1xuXHRcdGxldCBpbnN0cnVjdGlvbnMgPSBcIlRoaXMgZXhlcmNpc2UgaXMgdG8gZGV2ZWxvcCB5b3VyIGFiaWxpdHkgdG8gY29uZmlkZW50bHkgY29weSBhbmQgdW5kZXJzdGFuZCBBVElTIHRyYW5zbWlzc2lvbnMuXFxuXCIgK1xuXHRcdFx0XHRcIkluc3RydWN0aW9uczpcXG5cIiArXG5cdFx0XHRcdFwiR2V0IHRoZSBBVElTLCAocmVwZWF0IGlmIG5lY2Vzc2FyeSB1bnRpbCB5b3UgYXJlIGNvbmZpZGVudCB5b3UgaGF2ZSB1bmRlcnN0b29kIGl0KS5cXG5cIiArXG5cdFx0XHRcdFwiVGhlbiwgYW5zd2VyIHRoZSBxdWVzdGlvbnMuXCIgK1xuXHRcdFx0XHRcIlRoZSBhaW0gaXMgdG8gYmUgYWJsZSB0byBxdWlja2x5IGFuZCBhY2N1cmF0ZWx5IGV4dHJhY3QgdGhlIGluZm9ybWF0aW9uIHlvdSBuZWVkLlxcblwiO1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdCAgICB0aXRsZTogJ0luc3RydWN0aW9ucycsXG5cdFx0ICAgIG1lc3NhZ2U6IGluc3RydWN0aW9ucyxcblx0XHQgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcblx0XHR9O1xuXHRcdGFsZXJ0KG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4geyB9KTtcblx0fVxuXG5cdGdldFNwZWVjaCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5zcGVlY2g7XG5cdH1cblxuXHR0b2dnbGVTcGVlY2goZXYpIHtcblx0XHR0aGlzLnNwZWVjaCA9IGV2Lm9iamVjdC5jaGVja2VkO1xuXHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFNwZWVjaCh0aGlzLnNwZWVjaCk7XG5cdH1cblxuXHRwdWJsaWMgYXRpcyhnZXROZXc6IGJvb2xlYW4pIHtcblx0XHR0aGlzLmNoZWF0ID0gZmFsc2U7XG5cdFx0dGhpcy5hbnN3ZXJlZFF1ZXN0aW9ucyA9IFtdO1xuXHRcdGxldCBhaXJzcGFjZSA9IHRoaXMudXNlclNlcnZpY2UuZ2V0Q3VycmVudEFpcnNwYWNlKCk7XG5cdFx0bGV0IGxldmVsID0gdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50RGlmZmljdWx0eSgpO1xuXHRcdGlmIChnZXROZXcgfHwgKHRoaXMuY3VycmVudEF0aXMgPT09ICcnKSkge1xuXHRcdFx0dGhpcy5jdXJyZW50QXRpcyA9IHRoaXMuYXRpc1NlcnZpY2UuZ2VuZXJhdGVBdGlzKGxldmVsKTtcblx0XHR9XG5cdFx0dGhpcy5pZGVudCA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudElkZW50KCk7XG5cdFx0dGhpcy5hcHByb2FjaCA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudEFwcHJvYWNoKCk7XG5cdFx0dGhpcy5yd3lzID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50UnVud2F5cygpLnJlcGxhY2UoLyBhbmQgL2csICcrJyk7XG5cdFx0dGhpcy53aW5kID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50V2luZCgpO1xuXHRcdHRoaXMud2luZCArPSAnICcgKyB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldE1heFh3aW5kQXNTaG9ydGhhbmQoKTtcblx0XHR0aGlzLnZpcyA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudFZpcygpO1xuXHRcdHRoaXMud2VhdGhlciA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudFdlYXRoZXIoKTtcblx0XHR0aGlzLndlYXRoZXIgKz0gJyAnICsgdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50Q2xvdWQoKTtcblx0XHR0aGlzLnFuaCA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudFFOSCgpO1xuXHRcdHRoaXMub3RoZXIgPSB0aGlzLmF0aXNTZXJ2aWNlLmdldEN1cnJlbnRPdGhlcigpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMucnd5cyk7XG5cdFx0c3dpdGNoKGxldmVsKSB7XG5cdFx0XHRjYXNlICdhZHZhbmNlZCc6IFxuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRMYW5nKCdlbi1BVScpO1xuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRSYXRlKDEuNik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnaW50ZXJtZWRpYXRlJzogXG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldExhbmcoJ2VuLUFVJyk7XG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFJhdGUoMS4zKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzaW1wbGUnOiBcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0TGFuZygnZW4tQVUnKTtcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0UmF0ZSgxKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRMYW5nKCdlbi1BVScpO1xuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRSYXRlKDEpO1xuXHRcdH1cdFxuXHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNwZWFrKHRoaXMuY3VycmVudEF0aXMpO1xuXHR9XG5cblx0YWlyc3BhY2VDaGFuZ2UoZWxlbSwgYWlyc3BhY2UpIHtcblx0XHRpZiAoZWxlbS5jaGVja2VkKSB7XG5cdFx0XHR0aGlzLnVzZXJTZXJ2aWNlLnNldEFpcnNwYWNlKGFpcnNwYWNlKTtcblx0XHR9XG5cdH1cblxuXHRkaWZmaWN1bHR5Q2hhbmdlKGVsZW0sIGRpZmZpY3VsdHkpIHtcblx0XHRpZiAoZWxlbS5jaGVja2VkKSB7XG5cdFx0XHR0aGlzLnVzZXJTZXJ2aWNlLnNldERpZmZpY3VsdHkoZGlmZmljdWx0eSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0QWQoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5hZDtcblx0fVxuXG5cdGFkQ2hhbmdlKGVsZW0sIGFkKSB7XG5cdFx0aWYgKGVsZW0uY2hlY2tlZCkge1xuXHRcdFx0dGhpcy5hZCA9IGFkO1xuICBcdFx0XHR0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLnNldEFkKGFkKTtcblx0XHR9XG5cdH1cblxuXHRnZXRBaXJzcGFjZSgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldEN1cnJlbnRBaXJzcGFjZSgpO1xuXHR9XG5cblx0Z2V0RGlmZmljdWx0eSgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldEN1cnJlbnREaWZmaWN1bHR5KCk7XG5cdH1cblxuXHRzaG93QW5zd2VyKGFuczogc3RyaW5nKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0ICAgIHRpdGxlOiAnQW5zd2VyJyxcblx0XHQgICAgbWVzc2FnZTogYW5zLFxuXHRcdCAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuXHRcdH07XG5cdFx0YWxlcnQob3B0aW9ucykudGhlbigocmVzdWx0KSA9PiB7IHRoaXMudGVzdENvcHkoKTsgfSk7XG5cdH1cblxuXHR0ZXN0Q29weSgpIHtcblx0XHRsZXQgcXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uU2VydmljZS5nZXROZXh0UXVlc3Rpb24oKTtcblx0XHRpZiAocXVlc3Rpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zdG9wUXVlc3Rpb25zID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2hlYXQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnN0b3BRdWVzdGlvbnMgPSBmYWxzZTtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHQgICAgdGl0bGU6IHF1ZXN0aW9uLnEsXG5cdFx0ICAgIG1lc3NhZ2U6ICdzZWxlY3QgdGhlIG1vc3QgY29ycmVjdCBhbnN3ZXInLFxuXHRcdCAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxuXHRcdCAgICBhY3Rpb25zOiBPYmplY3Qua2V5cyhxdWVzdGlvbi5saXN0KVxuXHRcdH07XG5cdFx0YWN0aW9uKG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0aWYgKHJlc3VsdCAhPT0gJ0NhbmNlbCcpIHtcblx0XHRcdFx0bGV0IGFuc3dlciA9IHF1ZXN0aW9uLnEgKyAnIHlvdSBzYWlkOiAnICsgcmVzdWx0O1xuXHRcdFx0XHRpZiAocXVlc3Rpb24uYy50b0xvd2VyQ2FzZSgpID09PSByZXN1bHQudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdGFuc3dlciArPSAnIENPUlJFQ1QnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFuc3dlciArPSBcIiAtIGluY29ycmVjdCwgc2hvdWxkIGJlOiBcIiArIHF1ZXN0aW9uLmM7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHF1ZXN0aW9uLnIgIT09ICcnKSB7XG5cdFx0XHRcdFx0YW5zd2VyICs9ICcgKCcgKyBxdWVzdGlvbi5yICsgJyknO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYW5zd2VyZWRRdWVzdGlvbnMucHVzaChhbnN3ZXIpO1xuXHRcdFx0XHR0aGlzLnNob3dBbnN3ZXIoYW5zd2VyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc3RvcFF1ZXN0aW9ucyA9IHRydWU7XG5cdFx0XHR9XG5cdCAgICAgICBcdH0pO1xuXHR9XG59XG4iXX0=