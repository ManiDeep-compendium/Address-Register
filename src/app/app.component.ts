import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterAddressComponent } from './components/register-address/register-address.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterAddressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'Address-Register-Form';
}
