import { Injectable } from '@angular/core';
import Web3 from "web3";
import { contractAddress, contractAbi } from '../../abis.js'

declare const window: any
let _contractAbi = contractAbi

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    window: any
    private _provider: any
    private _web3js: any
    private _contract: any
    private _contractAddress: string = contractAddress

    constructor() { 
    }

    

    public getAccounts = async () => {
        try {
            return await window.ethereum.request({ method: 'eth_accounts' });
        } catch (e) {
            return [];
        }
    }

    public openMetamask = async () => {
        window.web3 = new Web3(window.ethereum);
        let addresses = await this.getAccounts();
        console.log("service", addresses)
        if (!addresses.length) {
            try {
                addresses = await window.ethereum.enable();
            } catch (e) {
                return false;
            }
        }
        return addresses.length ? addresses[0] : null;
    };

    public mintNFT = async (beneficiary, ipfsHash) => {
        this._provider = window.ethereum
        this._web3js = new Web3(this._provider)
        let accountArray = await this.getAccounts()

        this._contract = new this._web3js.eth.Contract(_contractAbi, this._contractAddress)
        let tokenID = Math.floor(Math.random() * 1000000)

        const mint = await this._contract
          .methods.mint(
            beneficiary, 
            tokenID,
            `https://ipfs.io/ipfs/${ipfsHash}?filename=nft.json`)
          .send({ from: accountArray[0] })
        
        console.log('nft mint tx: ', mint)  
        return tokenID.toString()

    }

    public async readNFT(id): Promise<string> {

        this._provider = window.ethereum
        this._web3js = new Web3(this._provider)
        let accountArray = await this.getAccounts()

        this._contract = new this._web3js.eth.Contract(_contractAbi, this._contractAddress)
        const nft = await this._contract
            .methods.tokenURI(id)
            .call({ from: accountArray[0] })
        
        return nft
    }

    public async addFunds(amount, tokenId) {

        this._provider = window.ethereum
        this._web3js = new Web3(this._provider)
        let accountArray = await this.getAccounts()
        let updatedAmount = amount * 1e18

        this._contract = new this._web3js.eth.Contract(_contractAbi, this._contractAddress)
        const payment = await this._contract
            .methods.acceptPayment(tokenId)
            .send({ from: accountArray[0], value: updatedAmount })
        
        return payment
    }

    public async getContributors(id): Promise<string> {

        this._provider = window.ethereum
        this._web3js = new Web3(this._provider)
        let accountArray = await this.getAccounts()

        this._contract = new this._web3js.eth.Contract(_contractAbi, this._contractAddress)
        const contributors = await this._contract
            .methods.getAllContributors(id)
            .call({ from: accountArray[0] })
        
        return contributors
    }

    public async getBeneficiary(id): Promise<string> {

        this._provider = window.ethereum
        this._web3js = new Web3(this._provider)
        let accountArray = await this.getAccounts()

        this._contract = new this._web3js.eth.Contract(_contractAbi, this._contractAddress)
        const beneficiary = await this._contract
            .methods.getBeneficiary(id)
            .call({ from: accountArray[0] })    
        return beneficiary
    }

    public async claimGifts(id) {

        this._provider = window.ethereum
        this._web3js = new Web3(this._provider)
        let accountArray = await this.getAccounts()

        this._contract = new this._web3js.eth.Contract(_contractAbi, this._contractAddress)
        await this._contract
            .methods.claimFunds(id)
            .send({ from: accountArray[0] })

    }
    
}