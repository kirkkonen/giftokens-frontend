import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from './services/web3.service';
import { Subject, ReplaySubject, BehaviorSubject, switchMap, of, tap, Observable, shareReplay, take, map, from, catchError } from 'rxjs';
import { ImageGenerationService } from './services/image-generation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'web3gifts';
  ngOnInit() {
    //this.checkAccounts();
  }


  

}