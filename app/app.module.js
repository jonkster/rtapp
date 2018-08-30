"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-checkbox/angular");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var atis_component_1 = require("./atis/atis.component");
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
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                atis_component_1.AtisComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHlEQUFrRTtBQUNsRSw2Q0FBaUQ7QUFFakQsaURBQStDO0FBQy9DLHdEQUFzRDtBQUV0RCxzRUFBb0U7QUFDcEUsd0RBQTREO0FBQzVELHNEQUEwRDtBQUMxRCxzREFBMEQ7QUFDMUQsOERBQWtFO0FBQ2xFLDZEQUEyRDtBQUszRCxrRkFBa0Y7QUFDbEYsbUZBQW1GO0FBOEJuRjtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUE1QnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDekIsMkJBQWlCO2dCQUNWLDhCQUFnQjthQUNuQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWiw4QkFBYTthQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxzQ0FBaUI7Z0JBQ2pCLGtDQUFrQjtnQkFDbEIsZ0NBQWlCO2dCQUNqQix3Q0FBcUI7Z0JBQzVCLGdDQUFpQjtnQkFDakIsZ0NBQWM7YUFDVjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQXRpc0NvbXBvbmVudCB9IGZyb20gXCIuL2F0aXMvYXRpcy5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgQWVyb2Ryb21lc1NlcnZpY2UgfSBmcm9tIFwiLi9hZXJvZHJvbWVzL2Flcm9kcm9tZXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uU3BlYWtTZXJ2aWNlIH0gZnJvbSBcIi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vbkF0aXNTZXJ2aWNlIH0gZnJvbSBcIi4vY29tbW9uL2F0aXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9jb21tb24vdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25RdWVzdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9jb21tb24vcXVlc3Rpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgV2VhdGhlclNlcnZpY2UgfSBmcm9tIFwiLi93ZWF0aGVyL3dlYXRoZXIuc2VydmljZVwiO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzIGlmIHlvdSBuZWVkIHRvIHVzZSB0d28td2F5IGJpbmRpbmdcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHRoZSBIdHRwQ2xpZW50IHdyYXBwZXJcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcblx0VE5TQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgXHRBcHBSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBBdGlzQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQWVyb2Ryb21lc1NlcnZpY2UsXG4gICAgICAgIENvbW1vblNwZWFrU2VydmljZSxcbiAgICAgICAgQ29tbW9uQXRpc1NlcnZpY2UsXG4gICAgICAgIENvbW1vblF1ZXN0aW9uU2VydmljZSxcblx0Q29tbW9uVXNlclNlcnZpY2UsXG5cdFdlYXRoZXJTZXJ2aWNlXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuLypcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcbiovXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19