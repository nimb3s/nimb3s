import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { SharedUiLayoutModule } from '@nimb3s/shared/ui/layout';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'dev-jwadmin'),
    SharedUiLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
