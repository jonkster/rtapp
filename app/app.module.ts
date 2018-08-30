import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { AtisComponent } from "./atis/atis.component";

import { AerodromesService } from "./aerodromes/aerodromes.service";
import { CommonSpeakService } from "./common/speak.service";
import { CommonAtisService } from "./common/atis.service";
import { CommonUserService } from "./common/user.service";
import { CommonQuestionService } from "./common/question.service";
import { WeatherService } from "./weather/weather.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
	TNSCheckBoxModule,
       	AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AtisComponent
    ],
    providers: [
        AerodromesService,
        CommonSpeakService,
        CommonAtisService,
        CommonQuestionService,
	CommonUserService,
	WeatherService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
