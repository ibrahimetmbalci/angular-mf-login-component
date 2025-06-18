import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { LoginFormComponent } from './app/login-form.component';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);
  
  const loginElement = createCustomElement(LoginFormComponent, { injector: app.injector });
  customElements.define('angular-login-form', loginElement);
})();
