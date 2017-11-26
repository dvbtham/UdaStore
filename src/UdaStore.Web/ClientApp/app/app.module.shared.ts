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
import { NgUploaderModule } from 'ngx-uploader';
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
import { ProductAttributeFormComponent } from './components/catalog/product-attributes/product-attribute-form/product-attribute-form.component';
import { ProductTemplatesFormComponent } from './components/catalog/product-templates/product-templates-form/product-templates-form.component';
import { AppService } from './services/app-service';
import { FormSelectComponent } from './directives/select.component';
import { CategoryComponent } from './components/catalog/category/category.component';
import { CategoryFormComponent } from './components/catalog/category/category-form/category-form.component';
import { CategoryService } from './services/catalog/category.service';
import { ProductComponent } from './components/catalog/product/product.component';
import { ProductFormComponent } from './components/catalog/product/product-form/product-form.component';
import { ProductService } from './services/catalog/product.service';
import { UserComponent } from './components/core/user/user.component';
import { UserFormComponent } from './components/core/user/user-form/user-form.component';
import { UserService } from './services/core/user.service';
import { RoleService } from './services/core/role.service';
import { NumberInput } from './directives/number-input.directive';
import { ValidPassword } from './directives/passwords.directive';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    declarations: [
        AppComponent,
        NumberInput,
        ValidPassword,
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
        ProductOptionsFormComponent,
        ProductAttributeFormComponent,
        ProductTemplatesFormComponent,
        FormSelectComponent,
        CategoryComponent,
        CategoryFormComponent,
        ProductComponent,
        ProductFormComponent,
        UserComponent,
        UserFormComponent,
        LoadingComponent
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        DataTableModule,
        NgUploaderModule,
        DateTimePickerModule,
        TagInputModule,
        ToastyModule.forRoot(),
        NgbModule.forRoot(),
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },

            { path: 'brands', component: BrandComponent },
            { path: 'brands/new', component: BrandFormComponent },
            { path: 'brands/:id', component: BrandFormComponent },

            { path: 'users', component: UserComponent },
            { path: 'users/new', component: UserFormComponent },
            { path: 'users/:id', component: UserFormComponent },

            { path: 'categories', component: CategoryComponent },
            { path: 'categories/new', component: CategoryFormComponent },
            { path: 'categories/:id', component: CategoryFormComponent },

            { path: 'products', component: ProductComponent },
            { path: 'products/new', component: ProductFormComponent },
            { path: 'products/:id', component: ProductFormComponent },


            { path: 'product-options', component: ProductOptionsComponent },
            { path: 'product-options/new', component: ProductOptionsFormComponent },
            { path: 'product-options/:id', component: ProductOptionsFormComponent },

            { path: 'product-attributes', component: ProductAttributesComponent },
            { path: 'product-attributes/new', component: ProductAttributeFormComponent },
            { path: 'product-attributes/:id', component: ProductAttributeFormComponent },

            { path: 'product-attribute-group', component: ProductAttributeGroupComponent },
            { path: 'product-attribute-group/new', component: ProductAttributeGroupFormComponent },
            { path: 'product-attribute-group/:id', component: ProductAttributeGroupFormComponent },

            { path: 'product-templates', component: ProductTemplatesComponent },
            { path: 'product-templates/new', component: ProductTemplatesFormComponent },
            { path: 'product-templates/:id', component: ProductTemplatesFormComponent },


            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        AppService,
        BrandService,
        CategoryService,
        ProductTemplatesService,
        ProductOptionsService,
        ProductService,
        ProductAttributesService,
        ProductAttributeGroupService,
        UserService,
        RoleService
    ]
})
export class AppModuleShared {
}
