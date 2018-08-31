"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-checkbox/angular");
var nativescript_ng2_fonticon_1 = require("nativescript-ng2-fonticon");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var atis_component_1 = require("./atis/atis.component");
var choose_component_1 = require("./choose/choose.component");
var aerodromes_service_1 = require("./aerodromes/aerodromes.service");
var speak_service_1 = require("./common/speak.service");
var atis_service_1 = require("./common/atis.service");
var user_service_1 = require("./common/user.service");
var question_service_1 = require("./common/question.service");
var weather_service_1 = require("./weather/weather.service");
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                angular_1.TNSCheckBoxModule,
                nativescript_ng2_fonticon_1.TNSFontIconModule.forRoot({ 'mdi': 'material-design-icons.css' }),
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                atis_component_1.AtisComponent,
                choose_component_1.ChooseComponent
            ],
            providers: [
                aerodromes_service_1.AerodromesService,
                speak_service_1.CommonSpeakService,
                atis_service_1.CommonAtisService,
                question_service_1.CommonQuestionService,
                user_service_1.CommonUserService,
                weather_service_1.WeatherService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHlEQUFrRTtBQUNsRSx1RUFBOEQ7QUFDOUQsNkNBQWlEO0FBRWpELGlEQUErQztBQUMvQyx3REFBc0Q7QUFDdEQsOERBQTREO0FBRTVELHNFQUFvRTtBQUNwRSx3REFBNEQ7QUFDNUQsc0RBQTBEO0FBQzFELHNEQUEwRDtBQUMxRCw4REFBa0U7QUFDbEUsNkRBQTJEO0FBSzNELGtGQUFrRjtBQUNsRixtRkFBbUY7QUFnQ25GO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQTlCckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUN6QiwyQkFBaUI7Z0JBQ1YsNkNBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUM7Z0JBQ2pFLDhCQUFnQjthQUNuQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDbkIsOEJBQWE7Z0JBQ2Isa0NBQWU7YUFDWDtZQUNELFNBQVMsRUFBRTtnQkFDUCxzQ0FBaUI7Z0JBQ2pCLGtDQUFrQjtnQkFDbEIsZ0NBQWlCO2dCQUNqQix3Q0FBcUI7Z0JBQzVCLGdDQUFpQjtnQkFDakIsZ0NBQWM7YUFDVjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBUTlNGb250SWNvbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZzItZm9udGljb24nO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEF0aXNDb21wb25lbnQgfSBmcm9tIFwiLi9hdGlzL2F0aXMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaG9vc2VDb21wb25lbnQgfSBmcm9tIFwiLi9jaG9vc2UvY2hvb3NlLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBBZXJvZHJvbWVzU2VydmljZSB9IGZyb20gXCIuL2Flcm9kcm9tZXMvYWVyb2Ryb21lcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25TcGVha1NlcnZpY2UgfSBmcm9tIFwiLi9jb21tb24vc3BlYWsuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uQXRpc1NlcnZpY2UgfSBmcm9tIFwiLi9jb21tb24vYXRpcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25Vc2VyU2VydmljZSB9IGZyb20gXCIuL2NvbW1vbi91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vblF1ZXN0aW9uU2VydmljZSB9IGZyb20gXCIuL2NvbW1vbi9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBXZWF0aGVyU2VydmljZSB9IGZyb20gXCIuL3dlYXRoZXIvd2VhdGhlci5zZXJ2aWNlXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHR3by13YXkgYmluZGluZ1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdGhlIEh0dHBDbGllbnQgd3JhcHBlclxuLy8gaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuXHRUTlNDaGVja0JveE1vZHVsZSxcbiAgICAgICAgVE5TRm9udEljb25Nb2R1bGUuZm9yUm9vdCh7ICdtZGknOiAnbWF0ZXJpYWwtZGVzaWduLWljb25zLmNzcycgfSksXG4gICAgICAgXHRBcHBSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuXHRBdGlzQ29tcG9uZW50LFxuXHRDaG9vc2VDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBZXJvZHJvbWVzU2VydmljZSxcbiAgICAgICAgQ29tbW9uU3BlYWtTZXJ2aWNlLFxuICAgICAgICBDb21tb25BdGlzU2VydmljZSxcbiAgICAgICAgQ29tbW9uUXVlc3Rpb25TZXJ2aWNlLFxuXHRDb21tb25Vc2VyU2VydmljZSxcblx0V2VhdGhlclNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=