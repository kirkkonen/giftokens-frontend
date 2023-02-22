import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageGeneratorComponent } from './image-generator/image-generator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContractCallerComponent } from './contract-caller/contract-caller.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GiftokenOverviewComponent } from './giftoken-overview/giftoken-overview.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MainComponent } from './main/main.component';
import { OverviewGalleryComponent } from './overview-gallery/overview-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageGeneratorComponent,
    ContractCallerComponent,
    GalleryComponent,
    GiftokenOverviewComponent,
    NotfoundComponent,
    MainComponent,
    OverviewGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }