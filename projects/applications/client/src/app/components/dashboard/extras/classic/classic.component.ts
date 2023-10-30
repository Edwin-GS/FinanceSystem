import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.css'],
})
export class ClassicComponent {
  showSideBar = false;
  showDropDown = false;
  showDropDownMenu = false;

  constructor(private router: Router, private usr: UserService) {}

  logOut() {
    this.usr.logout();
  }
}
