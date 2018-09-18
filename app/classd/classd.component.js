"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var dialogs_1 = require("ui/dialogs");
var aerodromes_service_1 = require("../aerodromes/aerodromes.service");
var atis_service_1 = require("../common/atis.service");
var question_service_1 = require("../common/question.service");
var speak_service_1 = require("../common/speak.service");
var user_service_1 = require("../common/user.service");
var ClassDComponent = /** @class */ (function () {
    function ClassDComponent(atisService, aerodromesService, questionService, userService, speakService, _page) {
        this.atisService = atisService;
        this.aerodromesService = aerodromesService;
        this.questionService = questionService;
        this.userService = userService;
        this.speakService = speakService;
        this._page = _page;
        this.cheat = false;
        this.currentAtis = '';
        this.ident = '';
        this.speech = true;
        this.shorthand = '';
    }
    ClassDComponent.prototype.ngOnInit = function () {
        //  	this.doArrival();
        this.aerodromesService.setAd('YSCN');
    };
    ClassDComponent.prototype.atis = function (getNew) {
        this.cheat = false;
        var level = this.userService.getCurrentDifficulty();
        if (getNew || (this.currentAtis === '')) {
            this.currentAtis = this.atisService.generateAtis(level);
        }
        this.ident = this.atisService.getCurrentIdent();
        this.shorthand = this.atisService.getShorthandAtis();
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
    ClassDComponent.prototype.getSpeech = function () {
        return this.speech;
    };
    ClassDComponent.prototype.toggleSpeech = function (ev) {
        this.speech = ev.object.checked;
        this.speakService.setSpeech(this.speech);
    };
    ClassDComponent.prototype.doArrival = function () {
        var instructions = "You are planning to arrive at Camden via The Oaks inbound reporting point.\n" +
            "You will need to obtain ATIS and contact Camden Tower\n";
        var options = {
            title: 'Scenario',
            message: instructions,
            okButtonText: "OK"
        };
        dialogs_1.alert(options).then(function (result) { });
    };
    ClassDComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-classd',
            templateUrl: './classd.component.html',
            styleUrls: ['./classd.component.scss']
        }),
        __metadata("design:paramtypes", [atis_service_1.CommonAtisService,
            aerodromes_service_1.AerodromesService,
            question_service_1.CommonQuestionService,
            user_service_1.CommonUserService,
            speak_service_1.CommonSpeakService,
            page_1.Page])
    ], ClassDComponent);
    return ClassDComponent;
}());
exports.ClassDComponent = ClassDComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsaURBQWdEO0FBQ2hELHNDQUEyQztBQUUzQyx1RUFBcUU7QUFDckUsdURBQTJEO0FBQzNELCtEQUFtRTtBQUNuRSx5REFBNkQ7QUFDN0QsdURBQTJEO0FBUTNEO0lBT0MseUJBQW9CLFdBQThCLEVBQ3ZDLGlCQUFvQyxFQUNwQyxlQUFzQyxFQUN0QyxXQUE4QixFQUM5QixZQUFnQyxFQUNoQyxLQUFXO1FBTEYsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQXVCO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQVhkLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFRL0IsQ0FBQztJQUVBLGtDQUFRLEdBQVI7UUFDQSxzQkFBc0I7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sOEJBQUksR0FBWCxVQUFZLE1BQWU7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNyRCxNQUFNLENBQUEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxVQUFVO2dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDO1lBQ1AsS0FBSyxjQUFjO2dCQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUNQLEtBQUssUUFBUTtnQkFDWixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUssQ0FBQztZQUNQO2dCQUNDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxtQ0FBUyxHQUFUO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYSxFQUFFO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVBLG1DQUFTLEdBQVQ7UUFDRSxJQUFJLFlBQVksR0FBRyw4RUFBOEU7WUFDbEcseURBQXlELENBQUM7UUFFM0QsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsVUFBVTtZQUNqQixPQUFPLEVBQUUsWUFBWTtZQUNyQixZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDO1FBQ0YsZUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU0sSUFBTyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBbkVVLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBUWdDLGdDQUFpQjtZQUNwQixzQ0FBaUI7WUFDbkIsd0NBQXFCO1lBQ3pCLGdDQUFpQjtZQUNoQixrQ0FBa0I7WUFDekIsV0FBSTtPQVpWLGVBQWUsQ0FxRTNCO0lBQUQsc0JBQUM7Q0FBQSxBQXJFRCxJQXFFQztBQXJFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgYWN0aW9uLCBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbmltcG9ydCB7IEFlcm9kcm9tZXNTZXJ2aWNlIH0gZnJvbSAnLi4vYWVyb2Ryb21lcy9hZXJvZHJvbWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uQXRpc1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL2F0aXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25TcGVha1NlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vblVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29tbW9uL3VzZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1jbGFzc2QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2xhc3NkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2xhc3NkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2xhc3NEQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0cHJpdmF0ZSBjaGVhdDogYm9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIGN1cnJlbnRBdGlzOiBzdHJpbmcgPSAnJztcblx0cHJpdmF0ZSBpZGVudDogc3RyaW5nID0gJyc7XG5cdHByaXZhdGUgc3BlZWNoOiBib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBzaG9ydGhhbmQ6IHN0cmluZyA9ICcnO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYXRpc1NlcnZpY2U6IENvbW1vbkF0aXNTZXJ2aWNlLFxuXHRcdFx0IHByaXZhdGUgYWVyb2Ryb21lc1NlcnZpY2U6IEFlcm9kcm9tZXNTZXJ2aWNlLFxuXHRcdFx0IHByaXZhdGUgcXVlc3Rpb25TZXJ2aWNlOiBDb21tb25RdWVzdGlvblNlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSB1c2VyU2VydmljZTogQ29tbW9uVXNlclNlcnZpY2UsXG5cdFx0XHQgcHJpdmF0ZSBzcGVha1NlcnZpY2U6IENvbW1vblNwZWFrU2VydmljZSxcblx0XHRcdCBwcml2YXRlIF9wYWdlOiBQYWdlKSB7XG5cdH1cblxuICBuZ09uSW5pdCgpIHsgXG4gIC8vICBcdHRoaXMuZG9BcnJpdmFsKCk7XG4gIFx0dGhpcy5hZXJvZHJvbWVzU2VydmljZS5zZXRBZCgnWVNDTicpO1xuICB9XG5cbiAgcHVibGljIGF0aXMoZ2V0TmV3OiBib29sZWFuKSB7XG5cdFx0dGhpcy5jaGVhdCA9IGZhbHNlO1xuXHRcdGxldCBsZXZlbCA9IHRoaXMudXNlclNlcnZpY2UuZ2V0Q3VycmVudERpZmZpY3VsdHkoKTtcblx0XHRpZiAoZ2V0TmV3IHx8ICh0aGlzLmN1cnJlbnRBdGlzID09PSAnJykpIHtcblx0XHRcdHRoaXMuY3VycmVudEF0aXMgPSB0aGlzLmF0aXNTZXJ2aWNlLmdlbmVyYXRlQXRpcyhsZXZlbCk7XG5cdFx0fVxuXHRcdHRoaXMuaWRlbnQgPSB0aGlzLmF0aXNTZXJ2aWNlLmdldEN1cnJlbnRJZGVudCgpO1xuXHRcdHRoaXMuc2hvcnRoYW5kID0gdGhpcy5hdGlzU2VydmljZS5nZXRTaG9ydGhhbmRBdGlzKCk7XG5cdFx0c3dpdGNoKGxldmVsKSB7XG5cdFx0XHRjYXNlICdhZHZhbmNlZCc6IFxuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRMYW5nKCdlbi1BVScpO1xuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRSYXRlKDEuNik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnaW50ZXJtZWRpYXRlJzogXG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldExhbmcoJ2VuLUFVJyk7XG5cdFx0XHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNldFJhdGUoMS4zKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdzaW1wbGUnOiBcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0TGFuZygnZW4tQVUnKTtcblx0XHRcdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0UmF0ZSgxKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRMYW5nKCdlbi1BVScpO1xuXHRcdFx0XHR0aGlzLnNwZWFrU2VydmljZS5zZXRSYXRlKDEpO1xuXHRcdH1cdFxuXHRcdHRoaXMuc3BlYWtTZXJ2aWNlLnNwZWFrKHRoaXMuY3VycmVudEF0aXMpO1xuXHR9XG5cblx0Z2V0U3BlZWNoKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnNwZWVjaDtcblx0fVxuXG5cdHRvZ2dsZVNwZWVjaChldikge1xuXHRcdHRoaXMuc3BlZWNoID0gZXYub2JqZWN0LmNoZWNrZWQ7XG5cdFx0dGhpcy5zcGVha1NlcnZpY2Uuc2V0U3BlZWNoKHRoaXMuc3BlZWNoKTtcblx0fVxuXG4gIGRvQXJyaXZhbCgpIHtcbiAgXHRcdGxldCBpbnN0cnVjdGlvbnMgPSBcIllvdSBhcmUgcGxhbm5pbmcgdG8gYXJyaXZlIGF0IENhbWRlbiB2aWEgVGhlIE9ha3MgaW5ib3VuZCByZXBvcnRpbmcgcG9pbnQuXFxuXCIgK1xuXHRcdFx0XCJZb3Ugd2lsbCBuZWVkIHRvIG9idGFpbiBBVElTIGFuZCBjb250YWN0IENhbWRlbiBUb3dlclxcblwiO1xuXG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0ICAgIHRpdGxlOiAnU2NlbmFyaW8nLFxuXHRcdCAgICBtZXNzYWdlOiBpbnN0cnVjdGlvbnMsXG5cdFx0ICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG5cdFx0fTtcblx0XHRhbGVydChvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHsgfSk7XG4gIH1cblxufVxuIl19