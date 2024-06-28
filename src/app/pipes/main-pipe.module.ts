import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NtobrPipe } from './ntobr.pipe';

@NgModule({
    declarations: [
        NtobrPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NtobrPipe
    ]
})
export class MainPipeModule {
}
