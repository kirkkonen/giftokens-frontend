import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../services/web3.service';
import { Observable, ReplaySubject, Subject, combineLatest, map, of, shareReplay, switchMap, tap, throwIfEmpty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contribution } from '../models/contribution';
import { contractAddress } from '../../abis.js'

@Component({
  selector: 'app-giftoken-overview',
  templateUrl: './giftoken-overview.component.html',
  styleUrls: ['./giftoken-overview.component.scss']
})

export class GiftokenOverviewComponent implements OnInit {

  contractAddress: string = contractAddress
  shortAddress: string = contractAddress.slice(0,4).concat('...', contractAddress.slice(-4))
  tokenID: number
  nftMetadata: any
  nftImage: any
  displayedAccount: Subject<string> = new ReplaySubject(1)
  contributors: any
  beneficiary: Subject<string> = new ReplaySubject(1)
  shortBeneficiary: Subject<string> = new ReplaySubject(1)
  beneficiaryString: string
  connectedAccount: Subject<string> = new ReplaySubject(1)
  accountTokens: any
  accountTokensArray: any
  isBeneficiary: Observable<boolean> = combineLatest([this.beneficiary, this.connectedAccount]).pipe(
    map(([beneficiary, account]) => beneficiary.toLowerCase() === account.toLowerCase())
  )
  contributions: Contribution[] = []
  isNativeBalanceEmpty: boolean = true
  isTokenBalanceEmpty: boolean = true
  isLoading: boolean = false

  showProgressBar() {
    this.isLoading = true
    setTimeout(()=> {
    this.isLoading = false;
    }, 20000)
  }

  async checkAccounts(){
    let addresses = await this.web3.getAccounts()
    let _displayedAccount = ''
    if (addresses.length > 0) {
      _displayedAccount = addresses[0].slice(0,4).concat('...', addresses[0].slice(-4));
    }
    console.log("account from checkAccounts: ", _displayedAccount)
    this.displayedAccount.next(_displayedAccount)
    this.connectedAccount.next(addresses[0])

    this.http.get(`http://localhost:3000/api/tokens?address=${addresses[0]}`).subscribe((response) => {
      this.accountTokens = response
      this.accountTokensArray = this.accountTokens.tokenAddressArray
      console.log('tokens array: ', this.accountTokensArray)
    })
  }

  async openMetaMask(){
    await this.web3.openMetamask()
    this.checkAccounts()
  }

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null, Validators.required)
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private web3: Web3Service,
    private http: HttpClient
    ) {
    this.tokenID = this.activatedRoute.snapshot.params['tokenID']
   }

  async ngOnInit() {

    this.checkAccounts()
    var tokenURI = await this.web3.readNFT(this.tokenID)

    console.log(tokenURI)

    // public getImages(prompt: string, numberOfImages: number): Observable<string[]> {
    //   console.log('arguments: ', prompt, numberOfImages)
    //   return this.httpClient.get<string[]>(`http://localhost:3000/api/images?prompt=${prompt}&n=${numberOfImages}`)
    // }
    
    this.http.get(tokenURI).subscribe((response) => {
      this.nftMetadata = response;
      console.log('metadata: ', this.nftMetadata)
      this.nftImage = this.nftMetadata.image
    })

    this.contributors = await this.web3.getContributors(this.tokenID)
    console.log('contributors: ', this.contributors)

    for (const c of this.contributors) {
      var contrObj = {contributor: '', contribution: '', shortContributor: ''}
      contrObj.contributor = c
      contrObj.shortContributor = c.slice(0,4).concat('...', c.slice(-4))
      let contr = await this.web3.getContribution(this.tokenID, c)
      let convertedContr = parseInt(contr)/1e18
      contrObj.contribution = convertedContr.toString()
      this.contributions.push(contrObj)
      console.log(`contribution of ${c}: `, contr)
    }

    console.log('contributions: ', this.contributions)

    let _beneficiary = await this.web3.getBeneficiary(this.tokenID)
    this.beneficiaryString = _beneficiary
    let _shortBeneficiary = _beneficiary.slice(0,6).concat('...', _beneficiary.slice(-6))
    this.beneficiary.next(_beneficiary)
    this.shortBeneficiary.next(_shortBeneficiary)
    console.log('beneficiary in overview component: ', this.beneficiary)
    console.log('connected account in ovewview component: ', this.connectedAccount)

    this.web3.getNativeBalance(this.tokenID)
      .then((value) => {
        console.log('native balance: ', value)
        if(value == 0) {
          this.isNativeBalanceEmpty = true
        } else {
          this.isNativeBalanceEmpty = false
        }
        console.log('isNativeBalanceEmpty: ', this.isNativeBalanceEmpty)
    })

  }

  async addFunds() {
    this.showProgressBar()
    if (this.form.valid && this.form.value.prompt) {
      await this.web3.addFunds(this.form.value.prompt, this.tokenID)
      console.log('amount sent: ', this.form.value.prompt)
    }
    this.contributors = await this.web3.getContributors(this.tokenID)
    console.log('contributors after adding funds: ', this.contributors)
  }

  async claimGifts() {
    this.showProgressBar()
    await this.web3.claimGifts(this.tokenID)
    console.log('gift claimed')
    this.isNativeBalanceEmpty = true
    console.log('is native balance empty after claim: ', this.isNativeBalanceEmpty)
  }

}
