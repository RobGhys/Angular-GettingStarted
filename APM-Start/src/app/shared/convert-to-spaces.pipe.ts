import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements  PipeTransform {

  /**
   * Replaces the given 'character' by an empty space
   * @param the object that you want to display
   * @param character
   */
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }

}
