import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Observable } from 'rxjs';

import { AddressService, BusinessAddress } from 'app/main/field-service/address.service';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'field-service',
    templateUrl: './field-service.component.html',
    styleUrls  : ['./field-service.component.scss'],
    animations: fuseAnimations
})
export class FieldServiceComponent
{
    businessAddresses$: Observable<BusinessAddress[]>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _addressService: AddressService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish, turkish);
        this.businessAddresses$ = this._addressService.onAddressesChanged.asObservable();
    }

    setLanguage(item: BusinessAddress): void {
        item.language = this._fuseTranslationLoaderService.instant('FIELDSERVICE.LANGUAGE');
        item.isVerified = true;
        this._addressService.curateBusinessAddress(item);
    }

    remove(item: BusinessAddress): void {
        item.isVerified = true;

        this._addressService.curateBusinessAddress(item);
    }
}
