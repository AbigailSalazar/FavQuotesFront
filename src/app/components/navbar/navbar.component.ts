import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() user:any;

  constructor(private _userService:UserService, private router:Router) { }

  onClickToggle(){

  }

  logout(){
    this._userService.logout();
    this.router.navigate(["/"]);
  }
}
