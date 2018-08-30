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
        this.rwys = '';
        this.vis = '';
        this.wind = '';
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
        this.answeredQuestions = [];
        var airspace = this.userService.getCurrentAirspace();
        var level = this.userService.getCurrentDifficulty();
        if (getNew || (this.currentAtis === '')) {
            this.currentAtis = this.atisService.generateAtis(level);
        }
        this.ident = this.atisService.getCurrentIdent();
        this.rwys = this.atisService.getCurrentRunways().replace(/ and /g, '+');
        this.wind = this.atisService.getCurrentWind();
        this.vis = this.atisService.getCurrentVis();
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
            dialogs_1.alert("no more questions");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRpcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdGlzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzQ0FBMkM7QUFDM0MsaURBQWdEO0FBR2hELHVEQUEyRDtBQUMzRCwrREFBbUU7QUFDbkUseURBQTZEO0FBQzdELHVEQUEyRDtBQUMzRCx1RUFBcUU7QUFTckU7SUEwQkMsdUJBQW9CLFdBQThCLEVBQ3ZDLGlCQUFvQyxFQUNwQyxlQUFzQyxFQUN0QyxXQUE4QixFQUM5QixZQUFnQyxFQUNoQyxLQUFXO1FBTHRCLGlCQVdDO1FBWG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUN2QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUF1QjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQU07UUExQmQsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFFBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUVqQyxzQkFBaUIsR0FBYTtZQUNyQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVU7U0FDcEMsQ0FBQztRQUNNLGVBQVUsR0FBVyxRQUFRLENBQUM7UUFDOUIsb0JBQWUsR0FBYTtZQUNuQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU07U0FDL0IsQ0FBQztRQUNNLGFBQVEsR0FBVyxHQUFHLENBQUM7UUFDdkIsT0FBRSxHQUFXLE1BQU0sQ0FBQztRQUNwQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6Qixr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Q0E4S3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTlLRCxJQThLQztBQTlLWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBhY3Rpb24sIGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5cblxuaW1wb3J0IHsgQ29tbW9uQXRpc1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2F0aXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25TcGVha1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vblVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBZXJvZHJvbWVzU2VydmljZSB9IGZyb20gJy4uL2Flcm9kcm9tZXMvYWVyb2Ryb21lcy5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhcHAtYXRpcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdGlzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXRpcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF0aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbi8qQFZpZXdDaGlsZChcIkNCMVwiKSBhaXJzcGFjZUNoZWNrYm94OiBFbGVtZW50UmVmOyovXG5cblx0cHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBhbnk7XG5cdHByaXZhdGUgaWRlbnQ6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHJ3eXM6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHZpczogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgd2luZDogc3RyaW5nID0gJyc7XG5cblx0cHJpdmF0ZSBrbm93bkFkczogc3RyaW5nW10gPSBbXTtcblx0cHJpdmF0ZSBhbnN3ZXJlZFF1ZXN0aW9uczogc3RyaW5nW10gPSBbXTtcblxuXHRwcml2YXRlIGRpZmZpY3VsdHlPcHRpb25zOiBzdHJpbmdbXSA9IFtcblx0XHQnc2ltcGxlJywgJ2ludGVybWVkaWF0ZScsICdhZHZhbmNlZCdcblx0XTtcblx0cHJpdmF0ZSBkaWZmaWN1bHR5OiBzdHJpbmcgPSAnc2ltcGxlJztcblx0cHJpdmF0ZSBhaXJzcGFjZU9wdGlvbnM6IHN0cmluZ1tdID0gW1xuXHRcdCdBJywgJ0MnLCAnRCcsICdFJywgJ0cnLCAnQ1RBRidcblx0XTtcblx0cHJpdmF0ZSBhaXJzcGFjZTogc3RyaW5nID0gJ0cnO1xuXHRwcml2YXRlIGFkOiBzdHJpbmcgPSAnWVNDTic7XG5cdHByaXZhdGUgY3VycmVudEF0aXM6IHN0cmluZyA9ICcnO1xuXHRwcml2YXRlIHN0b3BRdWVzdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBzcGVlY2g6IGJvb2xlYW4gPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYXRpc1NlcnZpY2U6IENvbW1vbkF0aXNTZXJ2aWNlLFxuXHRcdFx0IHByaXZhdGUgYWVyb2Ryb21lc1NlcnZpY2U6IEFlcm9kcm9tZXNTZXJ2aWNlLFxuXHRcdFx0IHByaXZhdGUgcXVlc3Rpb25TZXJ2aWNlOiBDb21tb25RdWVzdGlvblNlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSB1c2VyU2VydmljZTogQ29tbW9uVXNlclNlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSBzcGVha1NlcnZpY2U6IENvbW1vblNwZWFrU2VydmljZSxcblx0XHRcdCBwcml2YXRlIF9wYWdlOiBQYWdlKSB7XG5cblx0XHRcdCB0aGlzLnN1YnNjcmlwdGlvbnMgPSB0aGlzLl9wYWdlLm9uKFwibG9hZGVkXCIsICgpID0+IHtcblx0XHRcdFx0dGhpcy5zaG93SGVscCgpO1xuICAgICAgICBcdFx0fSk7XG5cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMua25vd25BZHMgPSB0aGlzLmFlcm9kcm9tZXNTZXJ2aWNlLmdldEtub3duQWRzKCk7XG4gICAgICAgXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG4gICAgXHRcdHRoaXMuX3BhZ2Uub2ZmKHRoaXMuc3Vic2NyaXB0aW9ucyk7XG4gICAgICAgIH1cblxuXHRzaG93SGVscCgpIHtcblx0XHRsZXQgaW5zdHJ1Y3Rpb25zID0gXCJUaGlzIGV4ZXJjaXNlIGlzIHRvIGRldmVsb3AgeW91ciBhYmlsaXR5IHRvIGNvbmZpZGVudGx5IGNvcHkgYW5kIHVuZGVyc3RhbmQgQVRJUyB0cmFuc21pc3Npb25zLlxcblwiICtcblx0XHRcdFx0XCJJbnN0cnVjdGlvbnM6XFxuXCIgK1xuXHRcdFx0XHRcIkdldCB0aGUgQVRJUywgKHJlcGVhdCBpZiBuZWNlc3NhcnkgdW50aWwgeW91IGFyZSBjb25maWRlbnQgeW91IGhhdmUgdW5kZXJzdG9vZCBpdCkuXFxuXCIgK1xuXHRcdFx0XHRcIlRoZW4sIGFuc3dlciB0aGUgcXVlc3Rpb25zLlwiICtcblx0XHRcdFx0XCJUaGUgYWltIGlzIHRvIGJlIGFibGUgdG8gcXVpY2tseSBhbmQgYWNjdXJhdGVseSBleHRyYWN0IHRoZSBpbmZvcm1hdGlvbiB5b3UgbmVlZC5cXG5cIjtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHQgICAgdGl0bGU6ICdJbnN0cnVjdGlvbnMnLFxuXHRcdCAgICBtZXNzYWdlOiBpbnN0cnVjdGlvbnMsXG5cdFx0ICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG5cdFx0fTtcblx0XHRhbGVydChvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHsgfSk7XG5cdH1cblxuXHRnZXRTcGVlY2goKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuc3BlZWNoO1xuXHR9XG5cblx0dG9nZ2xlU3BlZWNoKGV2KSB7XG5cdFx0dGhpcy5zcGVlY2ggPSBldi5vYmplY3QuY2hlY2tlZDtcblx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRTcGVlY2godGhpcy5zcGVlY2gpO1xuXHR9XG5cblx0cHVibGljIGF0aXMoZ2V0TmV3OiBib29sZWFuKSB7XG5cdFx0dGhpcy5hbnN3ZXJlZFF1ZXN0aW9ucyA9IFtdO1xuXHRcdGxldCBhaXJzcGFjZSA9IHRoaXMudXNlclNlcnZpY2UuZ2V0Q3VycmVudEFpcnNwYWNlKCk7XG5cdFx0bGV0IGxldmVsID0gdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50RGlmZmljdWx0eSgpO1xuXHRcdGlmIChnZXROZXcgfHwgKHRoaXMuY3VycmVudEF0aXMgPT09ICcnKSkge1xuXHRcdFx0dGhpcy5jdXJyZW50QXRpcyA9IHRoaXMuYXRpc1NlcnZpY2UuZ2VuZXJhdGVBdGlzKGxldmVsKTtcblx0XHR9XG5cdFx0dGhpcy5pZGVudCA9IHRoaXMuYXRpc1NlcnZpY2UuZ2V0Q3VycmVudElkZW50KCk7XG5cdFx0dGhpcy5yd3lzID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50UnVud2F5cygpLnJlcGxhY2UoLyBhbmQgL2csICcrJyk7XG5cdFx0dGhpcy53aW5kID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50V2luZCgpO1xuXHRcdHRoaXMudmlzID0gdGhpcy5hdGlzU2VydmljZS5nZXRDdXJyZW50VmlzKCk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5yd3lzKTtcblx0XHRzd2l0Y2gobGV2ZWwpIHtcblx0XHRcdGNhc2UgJ2FkdmFuY2VkJzogXG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldExhbmcoJ2VuLUFVJyk7XG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFJhdGUoMS42KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdpbnRlcm1lZGlhdGUnOiBcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0TGFuZygnZW4tQVUnKTtcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0UmF0ZSgxLjMpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3NpbXBsZSc6IFxuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRMYW5nKCdlbi1BVScpO1xuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRSYXRlKDEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldExhbmcoJ2VuLUFVJyk7XG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFJhdGUoMSk7XG5cdFx0fVx0XG5cdFx0dGhpcy5zcGVha1NlcnZpY2Uuc3BlYWsodGhpcy5jdXJyZW50QXRpcyk7XG5cdH1cblxuXHRhaXJzcGFjZUNoYW5nZShlbGVtLCBhaXJzcGFjZSkge1xuXHRcdGlmIChlbGVtLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMudXNlclNlcnZpY2Uuc2V0QWlyc3BhY2UoYWlyc3BhY2UpO1xuXHRcdH1cblx0fVxuXG5cdGRpZmZpY3VsdHlDaGFuZ2UoZWxlbSwgZGlmZmljdWx0eSkge1xuXHRcdGlmIChlbGVtLmNoZWNrZWQpIHtcblx0XHRcdHRoaXMudXNlclNlcnZpY2Uuc2V0RGlmZmljdWx0eShkaWZmaWN1bHR5KTtcblx0XHR9XG5cdH1cblxuXHRnZXRBZCgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmFkO1xuXHR9XG5cblx0YWRDaGFuZ2UoZWxlbSwgYWQpIHtcblx0XHRpZiAoZWxlbS5jaGVja2VkKSB7XG5cdFx0XHR0aGlzLmFkID0gYWQ7XG4gIFx0XHRcdHRoaXMuYWVyb2Ryb21lc1NlcnZpY2Uuc2V0QWQoYWQpO1xuXHRcdH1cblx0fVxuXG5cdGdldEFpcnNwYWNlKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0Q3VycmVudEFpcnNwYWNlKCk7XG5cdH1cblxuXHRnZXREaWZmaWN1bHR5KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0Q3VycmVudERpZmZpY3VsdHkoKTtcblx0fVxuXG5cdHNob3dBbnN3ZXIoYW5zOiBzdHJpbmcpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHQgICAgdGl0bGU6ICdBbnN3ZXInLFxuXHRcdCAgICBtZXNzYWdlOiBhbnMsXG5cdFx0ICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG5cdFx0fTtcblx0XHRhbGVydChvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHsgdGhpcy50ZXN0Q29weSgpOyB9KTtcblx0fVxuXG5cdHRlc3RDb3B5KCkge1xuXHRcdGxldCBxdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25TZXJ2aWNlLmdldE5leHRRdWVzdGlvbigpO1xuXHRcdGlmIChxdWVzdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnN0b3BRdWVzdGlvbnMgPSB0cnVlO1xuXHRcdFx0YWxlcnQoXCJubyBtb3JlIHF1ZXN0aW9uc1wiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5zdG9wUXVlc3Rpb25zID0gZmFsc2U7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0ICAgIHRpdGxlOiBxdWVzdGlvbi5xLFxuXHRcdCAgICBtZXNzYWdlOiAnc2VsZWN0IHRoZSBtb3N0IGNvcnJlY3QgYW5zd2VyJyxcblx0XHQgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcblx0XHQgICAgYWN0aW9uczogT2JqZWN0LmtleXMocXVlc3Rpb24ubGlzdClcblx0XHR9O1xuXHRcdGFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdGlmIChyZXN1bHQgIT09ICdDYW5jZWwnKSB7XG5cdFx0XHRcdGxldCBhbnN3ZXIgPSBxdWVzdGlvbi5xICsgJyB5b3Ugc2FpZDogJyArIHJlc3VsdDtcblx0XHRcdFx0aWYgKHF1ZXN0aW9uLmMudG9Mb3dlckNhc2UoKSA9PT0gcmVzdWx0LnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRhbnN3ZXIgKz0gJyBDT1JSRUNUJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbnN3ZXIgKz0gXCIgLSBpbmNvcnJlY3QsIHNob3VsZCBiZTogXCIgKyBxdWVzdGlvbi5jO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChxdWVzdGlvbi5yICE9PSAnJykge1xuXHRcdFx0XHRcdGFuc3dlciArPSAnICgnICsgcXVlc3Rpb24uciArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmFuc3dlcmVkUXVlc3Rpb25zLnB1c2goYW5zd2VyKTtcblx0XHRcdFx0dGhpcy5zaG93QW5zd2VyKGFuc3dlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnN0b3BRdWVzdGlvbnMgPSB0cnVlO1xuXHRcdFx0fVxuXHQgICAgICAgXHR9KTtcblx0fVxufVxuIl19