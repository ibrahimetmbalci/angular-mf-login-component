import 'zone.js';
import '@angular/compiler';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app.config';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ant-card login-container">
      <div class="ant-card-body">
        <h2 class="login-title">Giriş Formu</h2>
        <div class="info-section" *ngIf="currentTime || lastMessage">
          <p *ngIf="currentTime" class="info-text">Başlangıç Saati: {{ currentTime }}</p>
          <p *ngIf="lastMessage" class="info-text">React'tan Mesaj: {{ lastMessage }}</p>
        </div>
        <form (ngSubmit)="onSubmit()" class="ant-form ant-form-vertical">
          <div class="ant-form-item">
            <label class="ant-form-item-label" for="username">
              <span class="ant-form-item-required" title="required">*</span>
              Kullanıcı Adı
            </label>
            <div class="ant-form-item-control">
              <input 
                type="text" 
                id="username" 
                name="username" 
                [(ngModel)]="username" 
                required
                class="ant-input"
                placeholder="Kullanıcı adınızı girin"
              />
            </div>
          </div>
          <div class="ant-form-item">
            <label class="ant-form-item-label" for="password">
              <span class="ant-form-item-required" title="required">*</span>
              Şifre
            </label>
            <div class="ant-form-item-control">
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="password" 
                required
                class="ant-input"
                placeholder="Şifrenizi girin"
              />
            </div>
          </div>
          <div class="ant-form-item">
            <button type="submit" class="ant-btn ant-btn-primary ant-btn-block">
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .login-title {
      text-align: center;
      margin-bottom: 24px;
    }

    .info-section {
      background-color: #f0f0f0;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .info-text {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .info-text:not(:last-child) {
      margin-bottom: 8px;
    }
  `]
})
export class LoginFormComponent {
  private _currentTime: string = '';
  private _lastMessage: string = '';
  
  @Input() 
  set currentTime(value: string) {
    this._currentTime = value;
    console.log('Angular: currentTime güncellendi:', value);
  }
  get currentTime(): string {
    return this._currentTime;
  }
  
  @Input() 
  set lastMessage(value: string) {
    this._lastMessage = value;
    console.log('Angular: lastMessage güncellendi:', value);
  }
  get lastMessage(): string {
    return this._lastMessage;
  }
  
  @Output() loginSubmit = new EventEmitter<{username: string, password: string}>();
  
  username: string = '';
  password: string = '';

  onSubmit() {
    // Custom event gönder
    const loginData = {
      username: this.username,
      password: this.password
    };
    
    // Web component olarak kullanıldığında custom event dispatch et
    const event = new CustomEvent('loginSubmit', {
      detail: loginData,
      bubbles: true,
      composed: true
    });
    
    // DOM'dan element'i bul ve event'i gönder
    const element = document.querySelector('angular-login-form');
    if (element) {
      element.dispatchEvent(event);
    }
  }
}

// Module Federation için otomatik initialization
(async () => {
  if (typeof customElements !== 'undefined' && !customElements.get('angular-login-form')) {
    const app = await createApplication(appConfig);
    const loginElement = createCustomElement(LoginFormComponent, { injector: app.injector });
    
    // Custom element olarak tanımla
    customElements.define('angular-login-form', loginElement);
    
    // sendMessage metodunu ekle
    const proto = customElements.get('angular-login-form')!.prototype;
    proto.sendMessage = function(message: string) {
      if (this.lastMessage !== undefined) {
        this.lastMessage = message;
      }
    };
    
    console.log('Angular Login Form component auto-registered!');
  }
})();