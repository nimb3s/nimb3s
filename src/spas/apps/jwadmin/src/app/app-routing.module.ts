import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LayoutFeatureComponent } from '@nimb3s/layout/feature';

const routes: Routes = [
  {
    path: '',
    component: LayoutFeatureComponent,
    children: [
      // TODO: load this feature into th erouter outlet of the layout feature
      // in the meantime, update app.component.html by replacing <router-outlet></router-outlet>
      // with <member-management-feature></member-management-feature>
      {
        path: '',
        loadChildren: () => import('@nimb3s/member-management/feature').then(i => i.MemberManagementFeatureModule),
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    // LayoutFeatureModule,
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
