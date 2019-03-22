import { Component, Input, EventEmitter, Output, HostListener,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { Intervention } from '../../model/intervention';
import * as openpgp from 'openpgp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PGP App';
  pgpdetails={
  email:'',
  name:'',
  bitness:'2048',
  passphrase:''
  };

  genprivkey:string='';
  armouredgenprivkey:string=''
  genpubkey:string='';
  armouredpubprivkey:string='';
  revocationCertificate:string='';
  armouredrovCert:string='';
  completed:boolean=false;

  ngOnInit() {
    // console.log ("email",this.email);
  }

//   myFunction() {
// console.log (this.pgpdetails);
// console.log ("email :",this.pgpdetails.email);
// console.log ("name :",this.pgpdetails.name)
//   }

  async myFunction(){

     console.log (this.pgpdetails);

        let genoptions = {
      userIds: [{ name:this.pgpdetails.name, email:this.pgpdetails.email }], // multiple user IDs
      numBits: parseInt(this.pgpdetails.bitness),                                            // RSA key size
      passphrase: this.pgpdetails.passphrase         // protects the private key
  };
  //        let genoptions = {
  //     userIds: [{ name:'Credit Culture', email:'email_admin@creditculture.sg' }], // multiple user IDs
  //     numBits: 2048,                                            // RSA key size
  //     passphrase: 'Cr3d1t Cultur3 - Cr3d1t M@d3 E@sY for U@T'         // protects the private key
  // };

  // console.log (genoptions);
  //   await openpgp.generateKey(genoptions).then(function(key) {
  //    this.genprivkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
  //    this.genpubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  //    this.revocationCertificate = key.revocationCertificate; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  //    console.log ("generated pubkey:",this.genpubkey);
  //    console.log ("generated privatekey:",this.genprivkey);
  //    console.log ("generated revocation cert:",this.revocationCertificate);
  //    this.completed=true;
  //   });
  


  //       let genoptions1 = {
  //     userIds: [{ name:'Credit Culture', email:'email_admin@creditculture.sg' }], // multiple user IDs
  //     numBits: 2048,                                            // RSA key size
  //     passphrase: 'Cr3d1t Cultur3 - Cr3d1t M@d3 E@sY for U@T'         // protects the private key
  // };

  await openpgp.generateKey(genoptions).then((key) =>{
    this.genprivkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    this.armouredgenprivkey=this.genprivkey.replace(/\r\n/g, '<br />')
    this.genpubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    this.armouredpubprivkey=this.genpubkey.replace(/\r\n/g, '<br />')
    this.revocationCertificate = key.revocationCertificate; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    this.armouredrovCert=this.revocationCertificate.replace(/\r\n/g, '<br />')

    //  this.genprivkey=genprivkey;
    //  this.genpubkey=genpubkey;
    //  this.revocationCertificate=revocationCertificate;

     
     console.log ("generated privatekey:",this.genprivkey);
     console.log ("generated pubkey:",this.genpubkey);
     console.log ("generated revocation cert:",this.revocationCertificate);
     this.completed=true;
    //  let completed=true;

    });

  }

}
