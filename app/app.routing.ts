import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AtisComponent } from "./atis/atis.component";

const routes: Routes = [
    { path: "", redirectTo: "/atis", pathMatch: "full" },
    { path: "atis", component: AtisComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
