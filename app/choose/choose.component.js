"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var speak_service_1 = require("../common/speak.service");
var user_service_1 = require("../common/user.service");
var ChooseComponent = /** @class */ (function () {
    function ChooseComponent(userService, speakService) {
        this.userService = userService;
        this.speakService = speakService;
        this.speech = true;
    }
    ChooseComponent.prototype.ngOnInit = function () { };
    ChooseComponent.prototype.getDifficulty = function () {
        return this.userService.getCurrentDifficulty();
    };
    ChooseComponent.prototype.difficultyChange = function (elem, difficulty) {
        if (elem.checked) {
            this.userService.setDifficulty(difficulty);
        }
    };
    ChooseComponent.prototype.toggleSpeech = function (ev) {
        this.speech = ev.object.checked;
        this.speakService.setSpeech(this.speech);
    };
    ChooseComponent.prototype.getSpeech = function () {
        return this.speech;
    };
    ChooseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-choose',
            templateUrl: './choose.component.html',
            styleUrls: ['./choose.component.scss']
        }),
        __metadata("design:paramtypes", [user_service_1.CommonUserService,
            speak_service_1.CommonSpeakService])
    ], ChooseComponent);
    return ChooseComponent;
}());
exports.ChooseComponent = ChooseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3NlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNob29zZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFNcEYseURBQTZEO0FBQzdELHVEQUEyRDtBQVEzRDtJQUlFLHlCQUFvQixXQUE4QixFQUNuQyxZQUFnQztRQUQzQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBSHZDLFdBQU0sR0FBWSxJQUFJLENBQUM7SUFJL0IsQ0FBQztJQUVELGtDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsdUNBQWEsR0FBYjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELDBDQUFnQixHQUFoQixVQUFpQixJQUFJLEVBQUUsVUFBVTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0YsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYSxFQUFFO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVGLG1DQUFTLEdBQVQ7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixDQUFDO0lBM0JXLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBS2lDLGdDQUFpQjtZQUNyQixrQ0FBa0I7T0FMcEMsZUFBZSxDQTZCM0I7SUFBRCxzQkFBQztDQUFBLEFBN0JELElBNkJDO0FBN0JZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBhY3Rpb24sIGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5cbmltcG9ydCB7IENvbW1vblNwZWFrU2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vc3BlYWsuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uVXNlclNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vdXNlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwLWNob29zZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaG9vc2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaG9vc2UuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaG9vc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHByaXZhdGUgc3BlZWNoOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBDb21tb25Vc2VyU2VydmljZSxcbiAgXHQgICAgICBwcml2YXRlIHNwZWFrU2VydmljZTogQ29tbW9uU3BlYWtTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHsgfVxuXG4gIGdldERpZmZpY3VsdHkoKTogc3RyaW5nIHtcblx0ICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50RGlmZmljdWx0eSgpO1xuICB9XG5cbiAgZGlmZmljdWx0eUNoYW5nZShlbGVtLCBkaWZmaWN1bHR5KSB7XG5cdCAgaWYgKGVsZW0uY2hlY2tlZCkge1xuXHQgIFx0dGhpcy51c2VyU2VydmljZS5zZXREaWZmaWN1bHR5KGRpZmZpY3VsdHkpO1xuXHQgIH1cbiAgfVxuXG4gIHRvZ2dsZVNwZWVjaChldikge1xuXHQgIHRoaXMuc3BlZWNoID0gZXYub2JqZWN0LmNoZWNrZWQ7XG5cdCAgdGhpcy5zcGVha1NlcnZpY2Uuc2V0U3BlZWNoKHRoaXMuc3BlZWNoKTtcbiAgfVxuXG5cdGdldFNwZWVjaCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5zcGVlY2g7XG5cdH1cblxufVxuIl19