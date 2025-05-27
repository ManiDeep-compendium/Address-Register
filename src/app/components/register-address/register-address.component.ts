import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { AddressesService } from '../../services/addresses.service';
import { IAddress, IEaddress } from '../../services/Models/IAddress';
import { IAddressForm, IRegisterForm } from '../../services/Models/IRegisterForm';
@Component({
  selector: 'app-register-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-address.component.html',
  styleUrl: './register-address.component.less',
})
/*
obj = {
 FirstName:'',
 LastName: '',
 Email: '',
 phoneNumber: '',
 addresses: [{
  stateName: '',
  cityName: '',
  pinCode:'',
  doorNumber: '',
  street:'',
  landmark:''
 }]
} 
 */
export class RegisterAddressComponent implements OnInit {
  registerAddress!: FormGroup;
  defaultAddresses!: IAddress;
  constructor(private fb: FormBuilder, private addService: AddressesService) {}

  ngOnInit() {
    this.initializeForms();

    // console.log(this.registerAddress.value,'after initializing');
    this.addService.getAddresses().subscribe({
      next: (data) => {
        this.defaultAddresses = data;
        this.defaultAddresses.addresses?.forEach(()=>{
          this.addAddress();
        });
        this.registerAddress.patchValue(this.defaultAddresses);
      },
    });
  }

  initializeForms(): void {
    this.registerAddress = this.fb.group<IRegisterForm>({
      firstName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
      lastName: this.fb.nonNullable.control(''),
      email: this.fb.nonNullable.control(
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ),
      phoneNumber: this.fb.nonNullable.control(0, [Validators.required, Validators.pattern('^[0-9]*$')]),
      addresses: this.fb.nonNullable.array<FormGroup<IAddressForm>>([]),
    });
  }

  addressesGroup(): FormGroup {
    return this.fb.group<IAddressForm>({
      stateName: this.fb.nonNullable.control('', [Validators.required]),
      cityName: this.fb.nonNullable.control('', [Validators.required]),
      pinCode: this.fb.nonNullable.control('', [Validators.required]),
      doorNumber: this.fb.nonNullable.control('', [Validators.required]),
      street: this.fb.nonNullable.control(''),
      landMark: this.fb.nonNullable.control(''),
    });
  }

  get addresses(): FormArray {
    return <FormArray>this.registerAddress.get('addresses');
  }

  addAddress(): void {
    this.addresses.push(this.addressesGroup());
  }

  onFormSubmit(): void {
    if (this.registerAddress.invalid) {
      debugger;
      this.registerAddress.markAllAsTouched();
      return;
    }
    console.log(this.registerAddress.value, 'values on submit');
  }

  deleteAddress(index: number): void {
    this.addresses.removeAt(index);
  }
  getFormFieldValidation(fromGroup: any, formControlName: string): boolean {
    return (
      fromGroup.get(formControlName)?.invalid &&
      (fromGroup.get(formControlName)?.touched ||
        fromGroup.get(formControlName)?.dirty)
    );
  }
  formFieldErrorByType(formGroup: any, formControlName: string, type: string) {
    return formGroup.get(formControlName)?.errors?.[type];
  }
}
