import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiAuthModule } from '@nimb3s/ui/auth';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
