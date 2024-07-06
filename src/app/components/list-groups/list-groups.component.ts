import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GroupComponent } from '../group/group.component';
import { Group } from '../../models/group';

@Component({
  selector: 'app-list-groups',
  standalone: true,
  imports: [NavbarComponent,GroupComponent],
  templateUrl: './list-groups.component.html',
  styleUrl: './list-groups.component.css'
})
export class ListGroupsComponent {
  groupTest =[new Group("Cience"),new Group("Funny"),new Group("Nature"),new Group("Famous"),new Group("Pop culture")]
}
