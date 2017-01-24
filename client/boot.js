import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { routes } from './app/core/app.routes';
import { CORE_PROVIDERS, CORE_DECLARATIONS, AppComponent } from './app/core';
import { AUTH_PROVIDERS, AUTH_DECLARATIONS } from './app/auth';

// Feature Modules
import { TimesheetsModule } from './app/feature_modules/timesheets';
import { DashboardModule } from './app/feature_modules/dashboard';
import { AdminModule } from './app/feature_modules/admin';
import { TaskModule } from './app/feature_modules/task';
import { EmployeeModule } from './app/feature_modules/employee';
import { ProjectModule } from './app/feature_modules/project';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [CORE_DECLARATIONS, AUTH_DECLARATIONS],
  imports: [
    HttpModule, BrowserModule, FormsModule, ReactiveFormsModule, TimesheetsModule, DashboardModule,
    AdminModule, TaskModule, EmployeeModule, ProjectModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    CORE_PROVIDERS, AUTH_PROVIDERS,
    { provide: 'ENVIRONMENT', useValue: ENVIRONMENT }
  ],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
