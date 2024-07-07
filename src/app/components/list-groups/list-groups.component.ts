import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GroupComponent } from '../group/group.component';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-groups',
  standalone: true,
  imports: [NavbarComponent,GroupComponent],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.css'
})
export class ListGroupsComponent {
  user:any;
  groups: Group[]=[];
  constructor(private _groupService: GroupService, private _userService:UserService) { 
   this.getGroups()
    this.user = this._userService.getUser()
  }
    
  getGroups() {
    this._groupService.getGroups().subscribe(data=>{
      this.groups = data;
    },error=>{
      console.log(error);
    })
  }
  
}
