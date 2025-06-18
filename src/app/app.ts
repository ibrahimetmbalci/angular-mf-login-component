import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'app-root',
  imports: [LoginFormComponent],
  template: '<app-login-form></app-login-form>',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-login-component';
}
