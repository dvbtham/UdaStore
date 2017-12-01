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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { AppsettingComponent } from './components/core/appsetting/appsetting.component';
import { AppSettingService } from './services/core/app-setting.service';
import { ProductWidgetComponent } from './components/catalog/product-widget/product-widget.component';
import { HtmlWidgetComponent } from './components/cms/html-widget/html-widget.component';
import { CarouselWidgetComponent } from './components/cms/carousel-widget/carousel-widget.component';
import { WidgetComponent } from './components/core/widget/widget.component';
import { WidgetService } from './services/core/widget.service';
import { PageComponent } from './components/cms/page/page.component';
import { PageFormComponent } from './components/cms/page/page-form/page-form.component';
import { PageService } from './services/cms/page.service';
import { LoginComponent } from './components/core/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/core/auth.service';

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
        LoadingComponent,
        AppsettingComponent,
        ProductWidgetComponent,
        HtmlWidgetComponent,
        CarouselWidgetComponent,
        WidgetComponent,
        PageComponent,
        PageFormComponent,
        LoginComponent
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        DataTableModule,
        NgUploaderModule,
        DateTimePickerModule,
        TagInputModule,    
        LoadingBarHttpModule,
        ToastyModule.forRoot(),
        NgbModule.forRoot(),
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

            { path: 'brands', component: BrandComponent, canActivate: [AuthGuard] },
            { path: 'brands/new', component: BrandFormComponent, canActivate: [AuthGuard] },
            { path: 'brands/:id', component: BrandFormComponent, canActivate: [AuthGuard] },

            { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
            { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard] },
            { path: 'users/:id', component: UserFormComponent, canActivate: [AuthGuard] },

            { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
            { path: 'categories/new', component: CategoryFormComponent, canActivate: [AuthGuard] },
            { path: 'categories/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },

            { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
            { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard] },
            { path: 'products/:id', component: ProductFormComponent, canActivate: [AuthGuard] },

            { path: 'product-options', component: ProductOptionsComponent, canActivate: [AuthGuard] },
            { path: 'product-options/new', component: ProductOptionsFormComponent, canActivate: [AuthGuard] },
            { path: 'product-options/:id', component: ProductOptionsFormComponent, canActivate: [AuthGuard] },

            { path: 'product-attributes', component: ProductAttributesComponent, canActivate: [AuthGuard] },
            { path: 'product-attributes/new', component: ProductAttributeFormComponent, canActivate: [AuthGuard] },
            { path: 'product-attributes/:id', component: ProductAttributeFormComponent, canActivate: [AuthGuard] },

            { path: 'product-attribute-group', component: ProductAttributeGroupComponent, canActivate: [AuthGuard] },
            { path: 'product-attribute-group/new', component: ProductAttributeGroupFormComponent, canActivate: [AuthGuard] },
            { path: 'product-attribute-group/:id', component: ProductAttributeGroupFormComponent, canActivate: [AuthGuard] },

            { path: 'product-templates', component: ProductTemplatesComponent , canActivate: [AuthGuard]},
            { path: 'product-templates/new', component: ProductTemplatesFormComponent , canActivate: [AuthGuard]},
            { path: 'product-templates/:id', component: ProductTemplatesFormComponent , canActivate: [AuthGuard]},

            { path: 'settings', component:  AppsettingComponent, canActivate: [AuthGuard]},
            { path: 'widgets', component:  WidgetComponent, canActivate: [AuthGuard]},

            { path: 'widget-carousel-create', component:  CarouselWidgetComponent, canActivate: [AuthGuard]},
            { path: 'widget-carousel-edit/:id', component:  CarouselWidgetComponent, canActivate: [AuthGuard]},            
            { path: 'widget-html-create', component:  HtmlWidgetComponent, canActivate: [AuthGuard]},
            { path: 'widget-html-edit/:id', component:  HtmlWidgetComponent, canActivate: [AuthGuard]},
            { path: 'widget-product-create', component:  ProductWidgetComponent, canActivate: [AuthGuard]},
            { path: 'widget-product-edit/:id', component:  ProductWidgetComponent, canActivate: [AuthGuard]},

            { path: 'pages', component:  PageComponent, canActivate: [AuthGuard]},
            { path: 'pages/new', component:  PageFormComponent, canActivate: [AuthGuard]},
            { path: 'pages/:id', component:  PageFormComponent, canActivate: [AuthGuard]},

            { path: 'login', component:  LoginComponent},

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
        RoleService,
        AppSettingService,
        WidgetService,
        PageService,
        AuthService,
        AuthGuard
    ]
})
export class AppModuleShared {
}
