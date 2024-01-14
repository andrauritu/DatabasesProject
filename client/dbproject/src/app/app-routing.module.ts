import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantListComponent } from './plants/list/list.component';
import { PlantCreateComponent } from './plants/create/create.component';
import { PlantShowComponent } from './plants/show/show.component';
import { PlantEditComponent } from './plants/edit/edit.component';
import { GreenhouseListComponent } from './greenhouses/list/list.component';
import { GreenhouseCreateComponent } from './greenhouses/create/create.component';
import { GreenhouseShowComponent } from './greenhouses/show/show.component';
import { GreenhouseEditComponent } from './greenhouses/edit/edit.component';
import { EcosystemListComponent } from './ecosystems/list/list.component'; // Import Ecosystem list component
import { EcosystemCreateComponent } from './ecosystems/create/create.component'; // Import Ecosystem create component
import { EcosystemShowComponent } from './ecosystems/show/show.component'; // Import Ecosystem show component
import { EcosystemEditComponent } from './ecosystems/edit/edit.component'; // Import Ecosystem edit component

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plants', component: PlantListComponent },
  { path: 'plants/add', component: PlantCreateComponent },
  { path: 'plants/:id', component: PlantShowComponent },
  { path: 'plants/edit/:id', component: PlantEditComponent },
  { path: 'greenhouses', component: GreenhouseListComponent },
  { path: 'greenhouses/add', component: GreenhouseCreateComponent },
  { path: 'greenhouses/:id', component: GreenhouseShowComponent },
  { path: 'greenhouses/edit/:id', component: GreenhouseEditComponent },
  { path: 'ecosystems', component: EcosystemListComponent }, // Ecosystem list route
  { path: 'ecosystems/add', component: EcosystemCreateComponent }, // Ecosystem create route
  { path: 'ecosystems/:id', component: EcosystemShowComponent }, // Ecosystem show route
  { path: 'ecosystems/edit/:id', component: EcosystemEditComponent }, // Ecosystem edit route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
