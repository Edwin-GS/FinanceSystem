import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  template: ` <h1 class="pagetitle">{{ title }}</h1> `,
  styles: [
    '.pagetitle {color:#012970; font-size: 24px; font-weight: 600; margin:0;}',
  ],
})
export class PageTitleComponent {
  @Input() title = 'Page';
}
