export interface IAddress {
  id?: number;
  FirstName: string;
  LastName: string;
  Email: string;
  phoneNumber: number;
  addresses: Array<IEaddress>;
}

export interface IEaddress {
  stateName: string;
  cityName: string;
  pinCode: string;
  doorNumber: string;
  street: string;
  landmark: string;
}
