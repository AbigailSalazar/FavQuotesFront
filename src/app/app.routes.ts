import { Routes } from '@angular/router';
import { ListGroupsComponent } from './components/list-groups/list-groups.component';
import { ListQuotesComponent } from './components/list-quotes/list-quotes.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {path: "", component: ListGroupsComponent},
    {path: ":groupName/quotes", component:ListQuotesComponent},
    {path: "login", component:LoginComponent},
    {path: "*", redirectTo:'',pathMatch:"full"},
    {path: "signup", component:SignupComponent}
];
