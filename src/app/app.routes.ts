import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboaredComponent } from './pages/dashboared/dashboared.component';
import { authGuardGuard } from './guard/auth-guard.guard';


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
    }
];
