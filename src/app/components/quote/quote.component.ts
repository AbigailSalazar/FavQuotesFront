import { Component, Input } from '@angular/core';
import { Quote } from '../../models/quote';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  @Input() quote?: Quote;
  liked: boolean = false;

  @Input() idUser: string = "";

  constructor(private _quoteService: QuoteService) {
  }

  ngOnInit() {
    if (this.quote && this.quote.likes) {
      this.liked = this.quote.likes.includes(this.idUser);
    }
  }

  toggleLike() {
    if (!this.quote) return;

    if (this.liked&&this.quote._id) {
      this._quoteService.unLikeQuote(this.quote._id).subscribe(() => {
        this.liked = false;
        this.quote?.likes.pop();
      });
    } else if(this.quote._id){
      this._quoteService.likeQuote(this.quote._id).subscribe(() => {
        this.liked = true;
        this.quote?.likes.push(this.idUser);
      });
    }
  }
}
