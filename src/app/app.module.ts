import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { ImageUploadModule } from "angular2-image-upload";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ListComponent } from "./list/list.component";
import { ListService } from "./list/list.service";
import { UploadComponent } from "./upload/upload.component";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CanActivateGuard } from "./guards/can-activate.guard";
import { FormsModule } from "@angular/forms";
import { LocationComponent } from "./location/location.component";
import { ScheduleComponent } from "./schedule/schedule.component";

const appRoutes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "location", component: LocationComponent },
    { path: "schedule", component: ScheduleComponent },
    { path: "list", component: ListComponent, canActivate: [CanActivateGuard] },
    { path: "upload", component: UploadComponent },

    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },

    { path: "**", component: HomeComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LocationComponent,
        ListComponent,
        ScheduleComponent,
        UploadComponent,
        HomeComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ImageUploadModule.forRoot(),
        RouterModule.forRoot(appRoutes, {
            enableTracing: true
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "de" },
        ListService,
        CanActivateGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
