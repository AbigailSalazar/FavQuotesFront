import { Component, Input } from '@angular/core';
import { Group } from '../../models/group';
import { redirect } from 'next/navigation';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
   
  @Input() group?:Group;

}
