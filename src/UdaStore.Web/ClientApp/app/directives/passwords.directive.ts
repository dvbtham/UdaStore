import { Directive, Attribute, forwardRef } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[validPassword][formControlName],[validPassword][formControl],[validPassword][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidPassword), multi: true }
    ]
})
export class ValidPassword implements Validator {

    constructor( @Attribute('password') public password: string) {
    }

    regexStr = '/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/';

    validate(c: AbstractControl): ValidationErrors | null {
        let value: string = c.value;
        let e = c.root.get(this.password);
        if (value != null) {
            
            if (!value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)) {
                return { inValidPassword: true };
            }
            return null;
        }
    }
}