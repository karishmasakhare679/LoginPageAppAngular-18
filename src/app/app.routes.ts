import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboaredComponent } from './pages/dashboared/dashboared.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


export const routes: Routes = [
    {
       path:'',
       redirectTo:'login',
       pathMatch:'full'
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboared',
                component:DashboaredComponent,
                canActivate:[authGuardGuard]
            }
        ]
    },
    {
        path: 'register', component:RegisterComponent
    },

    {
        path: 'forgot-password', component:ForgotPasswordComponent
    }
];
