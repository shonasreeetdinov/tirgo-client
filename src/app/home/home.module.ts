import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import {TranslateModule} from "@ngx-translate/core";
import { HeaderPageModule } from '../header/header.module';
import { MainPipeModule } from '../pipes/main-pipe.module';
import { HomePage } from './home.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        HeaderPageModule,
        MainPipeModule,
        TranslateModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
