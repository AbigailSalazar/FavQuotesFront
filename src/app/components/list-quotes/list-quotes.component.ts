import { Component, inject, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuoteComponent } from '../quote/quote.component';
import { Quote } from '../../models/quote';
import { CreateQuoteComponent } from '../create-quote/create-quote.component';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../models/group';

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

  //get group from service
  groupId="329sjfks";

  user:User={
    _id: "dsfklsd934",
    name: "Test",
    email: "test@email.com",
  }

  quotes: any=[new Quote("3434334","TestAuthor","This is a test quote!",[]),
  new Quote("3434334","TestAuthor","This is a test quote!",[]),
  new Quote("3434334","TestAuthor","This is a test quote!",[]),
  new Quote("3434334","TestAuthor","This is a test quote!",[]),
  new Quote("3434334","TestAuthor","This is a test quote!",[]),
  new Quote("3434334","TestAuthor","This is a test quote!",[])  ];

  
  
  
}
