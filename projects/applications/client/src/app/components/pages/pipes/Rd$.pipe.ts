import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rd$',
})
export class Rd$Pipe implements PipeTransform {
  transform(value: number): string {
    return `RD$${value}`;
  }
}
