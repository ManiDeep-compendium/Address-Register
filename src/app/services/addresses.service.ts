import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IAddress} from './Models/IAddress'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<IAddress> {
    return this.http.get<IAddress>('http://localhost:3002/RegisteredAddresses').pipe();
  }
}
