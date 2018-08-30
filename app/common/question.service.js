"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CommonQuestionService = /** @class */ (function () {
    function CommonQuestionService() {
        this.questions = [];
    }
    CommonQuestionService.prototype.getNextQuestion = function () {
        if (this.questions.length > 0) {
            var q = this.questions.pop();
            var answers = {};
            for (var i = 0; i < q.b.length; i++) {
                answers[q.b[i].toUpperCase()] = 'false';
            }
            answers[q.c.toUpperCase()] = true;
            q.list = answers;
            return q;
        }
        return undefined;
    };
    CommonQuestionService.prototype.addQuestion = function (question, correct, bogus, reason) {
        this.questions.push({
            q: question,
            c: correct,
            b: bogus,
            r: reason,
            list: []
        });
    };
    CommonQuestionService.prototype.clearQuestions = function () {
        this.questions = [];
    };
    CommonQuestionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CommonQuestionService);
    return CommonQuestionService;
}());
exports.CommonQuestionService = CommonQuestionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFHM0M7SUFJRTtRQUZRLGNBQVMsR0FBUSxFQUFFLENBQUM7SUFFWixDQUFDO0lBRWpCLCtDQUFlLEdBQWY7UUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0IsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFFckMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDekMsQ0FBQztZQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDVixDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLFFBQWdCLEVBQUUsT0FBZSxFQUFFLEtBQWUsRUFBRSxNQUFjO1FBQzdFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3JCLENBQUMsRUFBRSxRQUFRO1lBQ1gsQ0FBQyxFQUFFLE9BQU87WUFDVixDQUFDLEVBQUUsS0FBSztZQUNSLENBQUMsRUFBRSxNQUFNO1lBQ1QsSUFBSSxFQUFFLEVBQUU7U0FDUixDQUFDLENBQUM7SUFDRixDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFqQ1UscUJBQXFCO1FBRGpDLGlCQUFVLEVBQUU7O09BQ0EscUJBQXFCLENBbUNqQztJQUFELDRCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlIHtcblxuICBwcml2YXRlIHF1ZXN0aW9uczogYW55ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBnZXROZXh0UXVlc3Rpb24oKSB7XG4gIFx0aWYgKHRoaXMucXVlc3Rpb25zLmxlbmd0aCA+IDApIHtcblx0XHRsZXQgcSA9IHRoaXMucXVlc3Rpb25zLnBvcCgpO1xuXHRcdGxldCBhbnN3ZXJzOiBhbnkgPSB7fTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHEuYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XG5cdFx0XHRhbnN3ZXJzW3EuYltpXS50b1VwcGVyQ2FzZSgpXSA9ICdmYWxzZSc7XG5cdFx0fVxuXHRcdGFuc3dlcnNbcS5jLnRvVXBwZXJDYXNlKCldID0gdHJ1ZTtcblx0XHRxLmxpc3QgPSBhbnN3ZXJzO1xuXHRcdHJldHVybiBxO1xuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBhZGRRdWVzdGlvbihxdWVzdGlvbjogc3RyaW5nLCBjb3JyZWN0OiBzdHJpbmcsIGJvZ3VzOiBzdHJpbmdbXSwgcmVhc29uOiBzdHJpbmcpIHtcbiAgXHR0aGlzLnF1ZXN0aW9ucy5wdXNoKHtcblx0XHRxOiBxdWVzdGlvbixcblx0XHRjOiBjb3JyZWN0LFxuXHRcdGI6IGJvZ3VzLFxuXHRcdHI6IHJlYXNvbixcblx0XHRsaXN0OiBbXVxuXHR9KTtcbiAgfVxuXG4gIGNsZWFyUXVlc3Rpb25zKCkge1xuICBcdHRoaXMucXVlc3Rpb25zID0gW107XG4gIH1cblxufVxuIl19