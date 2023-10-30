import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitString'
})
export class LimitStringPipe implements PipeTransform {

  transform(value: string | undefined = 'No se pudo cargar este recurso', 
  maxLength: number): string | undefined {
    if (value?.length  > maxLength) {
      return value?.substring(0, maxLength) + '...';
    } else {
      return value;
    }
  }

}
