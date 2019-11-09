import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FeatureAuthModule } from '@nimb3s/feature/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'dev-jwadmin'),
    FeatureAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
