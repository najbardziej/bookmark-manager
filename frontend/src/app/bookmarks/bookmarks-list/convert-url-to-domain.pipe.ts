import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUrlToDomain'
})
export class ConvertUrlToDomainPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value?.match(/(?<=https:\/\/|http:\/\/)\w*\.\w*/)[0];
  }

}
