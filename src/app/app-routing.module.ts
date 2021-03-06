import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/authGuard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'addAction', component: AddEmployeeComponent, canActivate: [AuthGuard] },
    {path: 'signup', component: SignupComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
