import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateorderPageRoutingModule } from './createorder-routing.module';

import { CreateorderPage } from './createorder.page';
import {HeaderPageModule} from "../header/header.module";
import {MainPipeModule} from "../pipes/main-pipe.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateorderPageRoutingModule,
        HeaderPageModule,
        MainPipeModule,
        TranslateModule
    ],
  declarations: [CreateorderPage]
})
export class CreateorderPageModule {}
