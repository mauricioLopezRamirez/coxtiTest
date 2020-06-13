import { FormControl, AbstractControl } from "@angular/forms";
export class EmailValidatorEquals {
  static validEmail(c: AbstractControl) {
    if (c.root.value.email !== c.value) {
      return { validEmail: true };
    } else {
      return null;
    }
  }
}
