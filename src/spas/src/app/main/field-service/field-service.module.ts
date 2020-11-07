import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '@fuse/components';

import { FieldServiceComponent } from './field-service.component';
import { AddressService } from './address.service';
import { HttpClientModule } from '@angular/common/http';

const routes = [
    {
        path     : 'field-service',
        component: FieldServiceComponent,
        resolve: {
            address: AddressService
           }
    }
];

@NgModule({
    declarations: [
        FieldServiceComponent,
    ],
    providers: [
        AddressService
    ],
    imports     : [
        RouterModule.forChild(routes),

        HttpClientModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatListModule,
        MatIconModule,
        MatChipsModule,
        TranslateModule,

        FuseSharedModule,

        FuseHighlightModule,
        FuseWidgetModule
    ],
    exports     : [
        FieldServiceComponent
    ]
})

export class FieldServiceModule
{
}
