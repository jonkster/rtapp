import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AtisComponent } from "./atis/atis.component";
import { ChooseComponent } from "./choose/choose.component";
import { ClassCComponent } from "./classc/classc.component";
import { ClassDComponent } from "./classd/classd.component";

const routes: Routes = [
    { path: "", redirectTo: "/choose", pathMatch: "full" },
    { path: "atis", component: AtisComponent },
    { path: "choose", component: ChooseComponent },
    { path: "classd", component: ClassDComponent },
    { path: "classc", component: ClassCComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
