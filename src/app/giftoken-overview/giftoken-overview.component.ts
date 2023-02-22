import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../services/web3.service';
import { Observable, ReplaySubject, Subject, combineLatest, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-giftoken-overview',
  templateUrl: './giftoken-overview.component.html',
  styleUrls: ['./giftoken-overview.component.scss']
})
export class GiftokenOverviewComponent implements OnInit {

  tokenID: number
  nftMetadata: any
  nftImage: any
  displayedAccount: Subject<string> = new ReplaySubject(1)
  contributors: any
  beneficiary: Subject<string> = new ReplaySubject(1)
  connectedAccount: Subject<string> = new ReplaySubject(1)
  isBeneficiary: Observable<boolean> = combineLatest([this.beneficiary, this.connectedAccount]).pipe(
    map(([beneficiary, account]) => beneficiary.toLowerCase() === account.toLowerCase())
  )

  async checkAccounts(){
    let addresses = await this.web3.getAccounts()
    let _displayedAccount = ''
    if (addresses.length > 0) {
      _displayedAccount = addresses[0].slice(0,4).concat('...', addresses[0].slice(-4));
    }
    console.log("account from checkAccounts: ", _displayedAccount)
    this.displayedAccount.next(_displayedAccount)
    this.connectedAccount.next(addresses[0])
  }

  async openMetaMask(){
    await this.web3.openMetamask()
    this.checkAccounts()
  }

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null)
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

    this.http.get(tokenURI).subscribe((response) => {
      this.nftMetadata = response;
      console.log('metadata: ', this.nftMetadata)
      this.nftImage = this.nftMetadata.image
    })

    this.contributors = await this.web3.getContributors(this.tokenID)
    console.log('contributors: ', this.contributors)

    let _beneficiary = await this.web3.getBeneficiary(this.tokenID)
    this.beneficiary.next(_beneficiary)
    console.log('beneficiary in overview component: ', this.beneficiary)
    console.log('connected account in ovewview component: ', this.connectedAccount)

  }

  async addFunds() {
    if (this.form.valid && this.form.value.prompt) {
      this.web3.addFunds(this.form.value.prompt, this.tokenID)
      console.log('amount sent: ', this.form.value.prompt)
    }
  }

  async claimGifts() {
    await this.web3.claimGifts(this.tokenID)
    console.log('gift claimed')
  }

}
