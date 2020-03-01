import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Import the components so they can be referenced in routes
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomPreloadingService } from './custom-preloading.service';

// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'employees',
    // set the preload property to true, using the route data property
    // If you do not want the module to be preloaded set it to false
    data: { preload: true },
    loadChildren: './employee/employee.module#EmployeeModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

// Pass the configured routes to the forRoot() method
// to let the angular router know about our routes
// Export the imported RouterModule so router directives
// are available to the module that imports this AppRoutingModule
@NgModule({
  imports: [ 
    RouterModule.forRoot(appRoutes, { preloadingStrategy: CustomPreloadingService }) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }