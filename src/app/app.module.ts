import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
