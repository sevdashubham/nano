import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, TokenPayload} from "../authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  lForm: FormGroup;
  rForm: FormGroup;
  registerCredentials: TokenPayload = {
    name: '',
    email: '',
    password: ''
  };
  signinCredentials: TokenPayload = {
    email: '',
    password: ''
  };
  constructor(private authentication: AuthenticationService, private router: Router, public snackBar: MatSnackBar,
              private fb: FormBuilder) {

    this.lForm = fb.group({
      email: [null],
      password: ['', Validators.required]
    });
    this.rForm = fb.group({
      name: [null],
      email: [null],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  register(form: any) {
    this.authentication.register(this.registerCredentials).subscribe(
      res => {
        console.log(JSON.stringify(res));
        this.router.navigateByUrl('/note');
      }, (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, ' OK ', {
      duration: 2500
    });
  }
  login(form: any) {
    this.authentication.login(this.signinCredentials).subscribe(() => {
      this.router.navigateByUrl('/note');
    }, (err) => {
      console.error(err);
      this.openSnackBar(err.message);
    });
  }
}

