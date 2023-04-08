import { Component, OnInit } from '@angular/core';

import { Categories } from 'src/app/models/product.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  // profile: User | null = null;
   categories: Categories[] = []


  constructor() {}
  ngOnInit(): void {

  }


}
