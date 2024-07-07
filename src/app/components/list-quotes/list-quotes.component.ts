import { Component, inject, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuoteComponent } from '../quote/quote.component';
import { Quote } from '../../models/quote';
import { CreateQuoteComponent } from '../create-quote/create-quote.component';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-list-quotes',
  standalone: true,
  imports: [NavbarComponent,QuoteComponent,CreateQuoteComponent],
  templateUrl: './list-quotes.component.html',
  styleUrl: './list-quotes.component.css'
})
export class ListQuotesComponent {
  
  private activatedRoute = inject(ActivatedRoute);
  groupName = this.activatedRoute.snapshot.params['groupName'];

  group:Group=new Group("");
  user:any;
  //get group from service
  constructor(private _groupService: GroupService, private _userService:UserService,private _quotesService:QuoteService) { 
    
    this.user = this._userService.getUser();
    if(this.groupName=="Favorites"){
      if(this.user){
        this.getFavorites();
      }
    }
    else{
      this.getGroup(this.groupName)
    }
    
   }
   getFavorites(){
      this._quotesService.getQuotesLikedByUser(this.user).subscribe(quotes=>{
       this.group={
          "name":"Favorites",
          "quotes":quotes,
          "photo":"https://i.pinimg.com/736x/98/e0/ec/98e0ece122d68b5b3c8a8c96fc8934e8.jpg"
       }
      },error=>{
       console.log(error);
     })
   }
   getGroup(groupName:string) {
     this._groupService.getGroup(groupName).subscribe(data=>{
       this.group = data[0];
       console.log(this.group)
     },error=>{
       console.log(error);
     })
   }
   
}
