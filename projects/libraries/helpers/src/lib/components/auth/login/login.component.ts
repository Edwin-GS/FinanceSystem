import {Component, Input, OnInit} from '@angular/core';
import {HandlerService} from "../../../services/handler.service";

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Login with admin only by email
   * **/

  @Input() isAdmin = false;

  constructor(private hs: HandlerService) {
  }

  ngOnInit(): void {

    this.login()
  }

  login() {

    localStorage.setItem('LEGOFT_SID_SITE', '')

    let user = {userOrEmail: "andres25", password: "Andres25."}

    this.hs.post(user, `users/login`)
      .subscribe((resp) => {

        if (resp['success'] === false) {

          console.log('Error creating user')

        } else {

          console.log(resp)

        }
      }, (err) => {

        console.error('Error creating user: ' + err);
      }

    )
  }
}
