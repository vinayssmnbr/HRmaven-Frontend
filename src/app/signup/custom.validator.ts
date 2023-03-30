import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpassword:ValidatorFn=(control:AbstractControl):ValidationErrors|null => {
    let password =control.get('password');
    let confirm = control.get('confirm');
    if(password && confirm && password?.value!=confirm?.value) {
        return { passwordmatcherror:true}
    }
    return null;
}