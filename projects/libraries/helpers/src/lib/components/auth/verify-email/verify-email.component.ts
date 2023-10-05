import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HandlerService} from "../../../services/handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user.doc";


@Component({
  selector: 'lib-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit, AfterViewInit {

  confirm = '';

  user: User = new User();

  constructor(private hs: HandlerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      this.confirm = params['confirm'];
    });
  }

  ngAfterViewInit(): void {

    this.hs.post({token: this.confirm}, `notifier/user/decode`)
      .subscribe(resp => {

          if (resp['success'] === false) {

            console.log('E80400: Email verification error')

          } else {

            this.user = resp['data'];
          }
        }, () => {

          console.log('E80423: Email verification error')
        }
      )
  }

  createUser() {

    this.hs.post(JSON.stringify(this.user), `users/create`)
      .subscribe(async resp => {

        if (resp['status'] === 'Error') {

          console.log('E80476: Email verification error');

        } else {

          await this.router.navigate(['/']);
        }
      }, () => {

        console.log('E80476: Email verification error');
      });
  }

}
