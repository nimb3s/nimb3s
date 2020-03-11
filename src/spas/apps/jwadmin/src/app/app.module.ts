import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { LayoutFeatureModule } from '@nimb3s/layout/feature';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberManagementFeatureModule } from '@nimb3s/member-management/feature';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'dev-jwadmin'),
    LayoutFeatureModule,
    AppRoutingModule,
    MemberManagementFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
