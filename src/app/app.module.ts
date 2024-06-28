import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeRu from '@angular/common/locales/ru';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from "@ionic/storage";
import { RouteReuseStrategy } from '@angular/router';
import { ApiInterceptor } from './services/api.interceptor';
import { MenuPageModule } from './menu/menu.module';
import { ChoicecityPage } from './choicecity/choicecity.page';
import { SelecttypecargoPage } from './selecttypecargo/selecttypecargo.page';

registerLocaleData(localeRu);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ChoicecityPage,
    SelecttypecargoPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot({ mode: 'ios' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__tirgoclient',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    MenuPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
