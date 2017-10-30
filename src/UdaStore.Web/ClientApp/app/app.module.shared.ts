import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandService } from './services/brand.service';
import { DataTableModule } from 'data-table-angular-4-bootstrap-3/src/index';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        BrandComponent,
        BrandFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        DataTableModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },

            { path: 'brands', component: BrandComponent },
            { path: 'brands/new', component: BrandFormComponent },
            { path: 'brands/:id', component: BrandFormComponent },

            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        BrandService
    ]
})
export class AppModuleShared {
}
