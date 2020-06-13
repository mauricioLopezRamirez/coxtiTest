import { FormControl, AbstractControl } from '@angular/forms';
export class PasswordValidator {
  static validPassword(c: AbstractControl){
    if(c.root.value.password !== c.value){
      return ({validPassword: true});
    } else {
      return (null);
    }
  }
}