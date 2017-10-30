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
import { DataTableModule } from 'data-table-angular-4-bootstrap-3/src/index';
import { ToastyModule } from 'ng2-toasty';
import { ProductOptionsComponent } from './components/catalog/product-options/product-options.component';
import { ProductAttributeGroupComponent } from './components/catalog/product-attribute-group/product-attribute-group.component';
import { ProductAttributesComponent } from './components/catalog/product-attributes/product-attributes.component';
import { ProductTemplatesComponent } from './components/catalog/product-templates/product-templates.component';
import { ProductTemplatesService } from './services/catalog/product-templates.service';
import { ProductOptionsService } from './services/catalog/product-options.service';
import { ProductAttributesService } from './services/catalog/product-attributes.service';
import { ProductAttributeGroupService } from './services/catalog/product-attribute-group.service';
import { BrandComponent } from './components/catalog/brand/brand.component';
import { BrandFormComponent } from './components/catalog/brand/brand-form/brand-form.component';
import { BrandService } from './services/catalog/brand.service';
import { ProductAttributeGroupFormComponent } from './components/catalog/product-attribute-group/product-attribute-group-form/product-attribute-group-form.component';
import { ProductOptionsFormComponent } from './components/catalog/product-options/product-options-form/product-options-form.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        BrandComponent,
        BrandFormComponent,
        ProductOptionsComponent,
        ProductAttributeGroupComponent,
        ProductAttributesComponent,
        ProductTemplatesComponent,
        ProductAttributeGroupFormComponent,
        ProductOptionsFormComponent
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

            
            { path: 'product-options', component: ProductOptionsComponent },
            { path: 'product-options/new', component: ProductOptionsFormComponent },
            { path: 'product-options/:id', component: ProductOptionsFormComponent },

            { path: 'product-attribute-group', component: ProductAttributeGroupComponent },
            { path: 'product-attribute-group/new', component: ProductAttributeGroupFormComponent },
            { path: 'product-attribute-group/:id', component: ProductAttributeGroupFormComponent },

            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        BrandService,
        ProductTemplatesService,
        ProductOptionsService,
        ProductAttributesService,
        ProductAttributeGroupService
    ]
})
export class AppModuleShared {
}
