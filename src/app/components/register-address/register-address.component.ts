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
import { IAddress } from '../../services/Models/IAddress';
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
    this.registerAddress = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      addresses: this.fb.array([]),
    });
  }

  addressesGroup(): FormGroup {
    return this.fb.group({
      stateName: ['', [Validators.required]],
      cityName: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      doorNumber: ['', [Validators.required]],
      street: [''],
      landMark: [''],
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
