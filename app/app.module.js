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
var classc_component_1 = require("./classc/classc.component");
var classd_component_1 = require("./classd/classd.component");
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
                choose_component_1.ChooseComponent,
                classc_component_1.ClassCComponent,
                classd_component_1.ClassDComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHlEQUFrRTtBQUNsRSx1RUFBOEQ7QUFDOUQsNkNBQWlEO0FBRWpELGlEQUErQztBQUMvQyx3REFBc0Q7QUFDdEQsOERBQTREO0FBQzVELDhEQUE0RDtBQUM1RCw4REFBNEQ7QUFFNUQsc0VBQW9FO0FBQ3BFLHdEQUE0RDtBQUM1RCxzREFBMEQ7QUFDMUQsc0RBQTBEO0FBQzFELDhEQUFrRTtBQUNsRSw2REFBMkQ7QUFLM0Qsa0ZBQWtGO0FBQ2xGLG1GQUFtRjtBQWtDbkY7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBaENyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ3pCLDJCQUFpQjtnQkFDViw2Q0FBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztnQkFDakUsOEJBQWdCO2FBQ25CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNuQiw4QkFBYTtnQkFDYixrQ0FBZTtnQkFDZixrQ0FBZTtnQkFDZixrQ0FBZTthQUNYO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLHNDQUFpQjtnQkFDakIsa0NBQWtCO2dCQUNsQixnQ0FBaUI7Z0JBQ2pCLHdDQUFxQjtnQkFDNUIsZ0NBQWlCO2dCQUNqQixnQ0FBYzthQUNWO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcbmltcG9ydCB7IFROU0ZvbnRJY29uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nMi1mb250aWNvbic7XG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQXRpc0NvbXBvbmVudCB9IGZyb20gXCIuL2F0aXMvYXRpcy5jb21wb25lbnRcIjtcbmltcG9ydCB7IENob29zZUNvbXBvbmVudCB9IGZyb20gXCIuL2Nob29zZS9jaG9vc2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDbGFzc0NDb21wb25lbnQgfSBmcm9tIFwiLi9jbGFzc2MvY2xhc3NjLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2xhc3NEQ29tcG9uZW50IH0gZnJvbSBcIi4vY2xhc3NkL2NsYXNzZC5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgQWVyb2Ryb21lc1NlcnZpY2UgfSBmcm9tIFwiLi9hZXJvZHJvbWVzL2Flcm9kcm9tZXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uU3BlYWtTZXJ2aWNlIH0gZnJvbSBcIi4vY29tbW9uL3NwZWFrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbW1vbkF0aXNTZXJ2aWNlIH0gZnJvbSBcIi4vY29tbW9uL2F0aXMuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tbW9uVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9jb21tb24vdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21tb25RdWVzdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9jb21tb24vcXVlc3Rpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgV2VhdGhlclNlcnZpY2UgfSBmcm9tIFwiLi93ZWF0aGVyL3dlYXRoZXIuc2VydmljZVwiO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzIGlmIHlvdSBuZWVkIHRvIHVzZSB0d28td2F5IGJpbmRpbmdcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHRoZSBIdHRwQ2xpZW50IHdyYXBwZXJcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcblx0VE5TQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgIFROU0ZvbnRJY29uTW9kdWxlLmZvclJvb3QoeyAnbWRpJzogJ21hdGVyaWFsLWRlc2lnbi1pY29ucy5jc3MnIH0pLFxuICAgICAgIFx0QXBwUm91dGluZ01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcblx0QXRpc0NvbXBvbmVudCxcblx0Q2hvb3NlQ29tcG9uZW50LFxuXHRDbGFzc0NDb21wb25lbnQsXG5cdENsYXNzRENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFlcm9kcm9tZXNTZXJ2aWNlLFxuICAgICAgICBDb21tb25TcGVha1NlcnZpY2UsXG4gICAgICAgIENvbW1vbkF0aXNTZXJ2aWNlLFxuICAgICAgICBDb21tb25RdWVzdGlvblNlcnZpY2UsXG5cdENvbW1vblVzZXJTZXJ2aWNlLFxuXHRXZWF0aGVyU2VydmljZVxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==