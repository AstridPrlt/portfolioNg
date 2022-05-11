import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjetComponent } from './projects/projet/projet.component';

const routes: Routes = [
  {path: 'portfolio/:name', component: ProjetComponent},
  {path: 'portfolio', component: ProjectsComponent},
  {path: 'about', component: AboutComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
