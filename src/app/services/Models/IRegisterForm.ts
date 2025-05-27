import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IRegisterForm {
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  email: FormControl<string>,
  phoneNumber: FormControl<number>,
  addresses: FormArray<FormGroup<IAddressForm>>,
  
}


export interface IAddressForm {
  stateName: FormControl<string>;
  cityName: FormControl<string>;
  pinCode: FormControl<string>;
  doorNumber: FormControl<string>;
  street: FormControl<string>;
  landMark: FormControl<string>;
}