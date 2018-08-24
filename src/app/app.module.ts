import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ImageUploadModule } from "angular2-image-upload";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { ListService } from './list/list.service';
import { UploadComponent } from './upload/upload.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'upload', component: UploadComponent },

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        UploadComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ImageUploadModule.forRoot(),
        RouterModule.forRoot(appRoutes, {
            enableTracing: true
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        ListService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
