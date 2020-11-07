import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService implements Resolve<any>
{
  private _currentPage: number;
  private _itemLimit: number;
  private _businessAddresses: BusinessAddress[];

  onAddressesChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._currentPage = 0;
    this._itemLimit = 30;

    this.onAddressesChanged = new BehaviorSubject([]);
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
              new Promise((resolve2, reject2) => {
                this.getNextBusinessAddressPage(0)          
                    .subscribe((response: any) => {
                        this._businessAddresses = response;
                        this.onAddressesChanged.next(response);
                        resolve2(response);
                    }, reject2);
              })
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Curate busines address
     *
     * @param businessAddress
     */
    curateBusinessAddress(businessAddress: BusinessAddress): void
    {
      this.updateBusinessAddress(businessAddress);

      const contactIndex = this._businessAddresses.indexOf(businessAddress);
      this._businessAddresses.splice(contactIndex, 1);
      this.onAddressesChanged.next(this._businessAddresses);

      if (this._businessAddresses.length === 0) {
        this.rehydrateList();
      }
    }

    /**
     * Reloads list of addresses
     *
     * @param page
     * @returns {Promise<any>}
     */
    private rehydrateList(): void {
      this.getNextBusinessAddressPage(0).subscribe(i => {
        this._businessAddresses = i;
        this.onAddressesChanged.next(i);
      });
    }

    /**
     * Get next business address page
     *
     * @param page
     * @returns {Promise<any>}
     */
    private getNextBusinessAddressPage(page: number): Observable<BusinessAddress[]> {
      return this._httpClient.get<BusinessAddress[]>(`${environment.gaiaBaseAddress}/odata/BusinessAddress?$skip=${page}&$top=${this._itemLimit}&$filter=IsVerified eq false and ZipCode eq '91950'&orderby=Id`)
      .pipe(
        map(data => {
          let items: any;
          items = data;
          const newlyMapped = items.value.map(i => {
            return new BusinessAddress(
                i.Id,
                i.Name,
                i.BusinessType,
                i.PhoneNumber,
                `${i.StreetAddress} ${i.Locality} ${i.Region} ${i.ZipCode}`,
                `${environment.googleMapsBaseAddress}${i.StreetAddress} ${i.Locality} ${i.Region} ${i.ZipCode}`.replace(' ', '+'),
                i.Tags,
                i.ListingUrl,
                i.Language,
                i.IsVerified
              );
          });

          return newlyMapped;
        })
      );
    }

    /**
     * Update address
     *
     * @param address
     * @returns {Promise<any>}
     */
    private updateBusinessAddress(businessAddress: BusinessAddress): Promise<any>
    {
        return new Promise((resolve, reject) => {
          this._httpClient.patch<BusinessAddress>(`${environment.gaiaBaseAddress}/odata/BusinessAddress/${businessAddress.id}`, {
            Id: businessAddress.id,
            Language: businessAddress.language,
            IsVerified: businessAddress.isVerified
          }).subscribe(response => {
            resolve(response);
          });
        });
    }
}

export class BusinessAddress {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public phoneNumber: string,
    public fullAddress: string,
    public googleMapLink: string,
    public tags: string,
    public listingUrl: string,
    public language: string,
    public isVerified: boolean
    ) {

    }
}

