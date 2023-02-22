import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../services/web3.service';


@Component({
  selector: 'app-contract-caller',
  templateUrl: './contract-caller.component.html',
  styleUrls: ['./contract-caller.component.scss']
})
export class ContractCallerComponent implements OnInit {

  constructor(private web3: Web3Service) { }

  ngOnInit(): void {
  }

  public readonly form = new FormGroup({
    prompt: new FormControl<string | null>(null, [Validators.required])
  })

  public mintNFT(): void {
    console.log('nft min button clicked')
    if (this.form.valid && this.form.value.prompt) {
      this.web3.mintNFT(this.form.value.prompt, 'smth')
      this.form.reset()
    }
  }


}
