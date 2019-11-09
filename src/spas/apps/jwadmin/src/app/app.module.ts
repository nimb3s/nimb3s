import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FeatureAuthModule } from '@nimb3s/feature/auth';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FeatureAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
