import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AtisComponent } from "./atis/atis.component";
import { ChooseComponent } from "./choose/choose.component";

const routes: Routes = [
    { path: "", redirectTo: "/choose", pathMatch: "full" },
    { path: "atis", component: AtisComponent },
    { path: "choose", component: ChooseComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
