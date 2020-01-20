import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MemberManagementFeatureModule } from '@nimb3s/member-management/feature'

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'dev-jwadmin'),
    MemberManagementFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
