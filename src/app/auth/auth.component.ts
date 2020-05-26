import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("header-wrapper").style.display = "none";
    document.getElementById("footer-wrapper").style.display = "none";
  }
}
