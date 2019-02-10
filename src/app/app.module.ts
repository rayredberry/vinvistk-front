import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.service';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { HardcoreComponent } from './hardcore/hardcore.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetResponseComponent } from './password-reset-response/password-reset-response.component';
import { SocialLoginModule, AuthServiceConfig } from "angular5-social-login";
import { FacebookLoginProvider } from "angular5-social-login";
import { GoogleLoginProvider } from "angular5-social-login";
import { getAuthServiceConfigs } from "./socialloginConfig";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HardcoreComponent,
    RegisterComponent,
    PasswordResetRequestComponent,
    PasswordResetResponseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
      TokenService,
      AuthService,
      BeforeLoginService,
      AfterLoginService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
