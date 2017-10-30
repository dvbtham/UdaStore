import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { AppErrorHandler } from './components/app/app.error-handler';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ErrorHandler, useClass: AppErrorHandler }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
