import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'jw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jwadmin';

  private isTopNavigation$$ = new BehaviorSubject(false);
  isTopNavigation$ = this.isTopNavigation$$.asObservable();
  
}
