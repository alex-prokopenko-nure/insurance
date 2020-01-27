import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'insurance',
    loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule),
  },
  {
    path: '**',
    redirectTo: '/insurance'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/insurance'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
