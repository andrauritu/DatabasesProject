import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Import
import { ReactiveFormsModule } from '@angular/forms'; // Make sure to import this


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlantListComponent } from './plants/list/list.component';
import { PlantCreateComponent } from './plants/create/create.component';
import { PlantShowComponent } from './plants/show/show.component';
import { PlantEditComponent } from './plants/edit/edit.component';
import { GreenhouseListComponent } from './greenhouses/list/list.component';
import { GreenhouseCreateComponent } from './greenhouses/create/create.component';
import { GreenhouseShowComponent } from './greenhouses/show/show.component';
import { GreenhouseEditComponent } from './greenhouses/edit/edit.component';
import { EcosystemCreateComponent } from './ecosystems/create/create.component';
import { EcosystemListComponent } from './ecosystems/list/list.component';
import { EcosystemShowComponent } from './ecosystems/show/show.component';
import { EcosystemEditComponent } from './ecosystems/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlantListComponent,
    PlantCreateComponent,
    PlantShowComponent,
    PlantEditComponent,
    GreenhouseListComponent,
    GreenhouseCreateComponent,
    GreenhouseEditComponent,
    GreenhouseShowComponent,
    EcosystemCreateComponent,
    EcosystemListComponent,
    EcosystemShowComponent,
    EcosystemEditComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // <-- Include module in our AppModules
    ReactiveFormsModule, // Add ReactiveFormsModule here

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
