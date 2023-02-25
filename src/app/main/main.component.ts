import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../services/web3.service';
import { Subject, ReplaySubject, BehaviorSubject, switchMap, of, tap, Observable, shareReplay, take, map, from, catchError } from 'rxjs';
import { ImageGenerationService } from '../services/image-generation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isLoading: boolean
  tokenID: Subject<string> = new ReplaySubject(1);
  displayedAccount: Subject<string> = new ReplaySubject(1);

  async checkAccounts(){
    let addresses = await this.web3.getAccounts();
    let _displayedAccount = '';
    if (addresses.length > 0) {
      _displayedAccount = addresses[0].slice(0,4).concat('...', addresses[0].slice(-4));
    }
    console.log("account from checkAccounts: ", _displayedAccount)
    this.displayedAccount.next(_displayedAccount)
  }

  showProgressBar() {
    this.isLoading = true
    setTimeout(()=> {
    this.isLoading = false;
    }, 100000)
  }


  constructor(private web3: Web3Service) { 
  }

  title = 'Giftokens';
  ngOnInit() {
    this.isLoading = false
    this.checkAccounts();
    console.log('is loading? ', this.isLoading)
  }

  private readonly httpClient = inject(HttpClient)
  private readonly imageGeneration = inject(ImageGenerationService)

  private readonly prompt$$ = new BehaviorSubject<string>('')
  public readonly prompt$ = this.prompt$$.asObservable()
  
  public readonly images$ = this.prompt$.pipe(
    switchMap((value) => {
      if(!value) {
        return of([])
      }
      const response = this.imageGeneration.getImages(value, 1)
      return response.pipe( 
        tap(value => console.log("url from openAI", value))
      )
    }),
    map(value => value[0]),
    shareReplay({bufferSize: 1, refCount: true})
  )

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null, Validators.required)
  })

  public mintNFT(): void {
    this.showProgressBar()
    console.log('nft min button clicked')
    if (this.form.valid && this.form.value.prompt) {
      // this.web3.mintNFT(this.form.value.prompt, 'smth')
      console.log('address: ', this.form.value.prompt)

      this.images$.pipe(
        take(1),
        tap(value => console.log('sending to backend', value)),
        switchMap((value) => this.httpClient.get<{IpfsHash:string}>(`http://localhost:3000/api/send?imageURL=${encodeURIComponent(value)}`)),
        switchMap((response) => from(this.web3.mintNFT(this.form.value.prompt, response.IpfsHash))),
        tap(id => this.tokenID.next(id)),
        catchError((error) => {
          console.log('error: ', error)
          return []
        })
      ).subscribe()

    }
  }

  public prompted(value: string) {
    this.prompt$$.next(value)
  }

  async openMetaMask(){
    await this.web3.openMetamask()
    this.checkAccounts()
  }

}
