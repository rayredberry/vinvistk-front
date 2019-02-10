import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HardcoreComponent } from './hardcore/hardcore.component';
import { LogoutComponent } from './logout/logout.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetResponseComponent } from './password-reset-response/password-reset-response.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [BeforeLoginService]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [BeforeLoginService]
    },
    {
        path: 'hardcore/:user',
        component: HardcoreComponent,
        canActivate: [BeforeLoginService]
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AfterLoginService]
    },
    {
        path: 'request-reset',
        component: PasswordResetRequestComponent,
        canActivate: [BeforeLoginService]
    },
    {
        path: 'reset-response',
        component: PasswordResetResponseComponent,
        canActivate: [BeforeLoginService]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
