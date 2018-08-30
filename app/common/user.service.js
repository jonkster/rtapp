"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CommonUserService = /** @class */ (function () {
    function CommonUserService() {
        this.difficultyOptions = [
            'simple', 'intermediate', 'advanced'
        ];
        this.difficulty = this.difficultyOptions[0];
        this.airspaceOptions = [
            'A', 'C', 'D', 'E', 'G', 'CTAF'
        ];
        this.airspace = this.airspaceOptions[0];
    }
    CommonUserService.prototype.getCurrentAirspace = function () {
        return this.airspace;
    };
    CommonUserService.prototype.getCurrentDifficulty = function () {
        return this.difficulty;
    };
    CommonUserService.prototype.getKnownAirspace = function () {
        return this.airspaceOptions;
    };
    CommonUserService.prototype.getKnownDifficulty = function () {
        return this.difficultyOptions;
    };
    CommonUserService.prototype.setAirspace = function (airspace) {
        this.airspace = airspace;
    };
    CommonUserService.prototype.setDifficulty = function (difficulty) {
        this.difficulty = difficulty;
    };
    CommonUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CommonUserService);
    return CommonUserService;
}());
exports.CommonUserService = CommonUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDO0lBVUU7UUFUTyxzQkFBaUIsR0FBYTtZQUNyQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVU7U0FDcEMsQ0FBQztRQUNNLGVBQVUsR0FBVyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0Msb0JBQWUsR0FBYTtZQUNuQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU07U0FDL0IsQ0FBQztRQUNNLGFBQVEsR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxDLENBQUM7SUFFbEIsOENBQWtCLEdBQWxCO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUdELGdEQUFvQixHQUFwQjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw0Q0FBZ0IsR0FBaEI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM3QixDQUFDO0lBRUQsOENBQWtCLEdBQWxCO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQixDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLFFBQWdCO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsVUFBa0I7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDOUIsQ0FBQztJQW5DVyxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0FxQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb21tb25Vc2VyU2VydmljZSB7XG5cdHByaXZhdGUgZGlmZmljdWx0eU9wdGlvbnM6IHN0cmluZ1tdID0gW1xuXHRcdCdzaW1wbGUnLCAnaW50ZXJtZWRpYXRlJywgJ2FkdmFuY2VkJ1xuXHRdO1xuXHRwcml2YXRlIGRpZmZpY3VsdHk6IHN0cmluZyA9IHRoaXMuZGlmZmljdWx0eU9wdGlvbnNbMF07XG5cdHByaXZhdGUgYWlyc3BhY2VPcHRpb25zOiBzdHJpbmdbXSA9IFtcblx0XHQnQScsICdDJywgJ0QnLCAnRScsICdHJywgJ0NUQUYnXG5cdF07XG5cdHByaXZhdGUgYWlyc3BhY2U6IHN0cmluZyA9IHRoaXMuYWlyc3BhY2VPcHRpb25zWzBdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cblx0Z2V0Q3VycmVudEFpcnNwYWNlKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuYWlyc3BhY2U7XG5cdH1cblxuXG5cdGdldEN1cnJlbnREaWZmaWN1bHR5KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuZGlmZmljdWx0eTtcblx0fVxuXG5cdGdldEtub3duQWlyc3BhY2UoKSA6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gdGhpcy5haXJzcGFjZU9wdGlvbnM7XG5cdH1cblxuXHRnZXRLbm93bkRpZmZpY3VsdHkoKSA6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gdGhpcy5kaWZmaWN1bHR5T3B0aW9ucztcblx0fVxuXG5cdHNldEFpcnNwYWNlKGFpcnNwYWNlOiBzdHJpbmcpIHtcblx0XHR0aGlzLmFpcnNwYWNlID0gYWlyc3BhY2U7XG5cdH1cblxuXHRzZXREaWZmaWN1bHR5KGRpZmZpY3VsdHk6IHN0cmluZykge1xuXHRcdHRoaXMuZGlmZmljdWx0eSA9IGRpZmZpY3VsdHk7XG5cdH1cblxufVxuIl19