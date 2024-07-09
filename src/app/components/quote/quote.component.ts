import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '../../models/quote';
import { QuoteService } from '../../services/quote.service';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent {
  @Input() quote?: Quote;
  @Input() allowDelete: boolean=false;
  @Output() deleteRequest = new EventEmitter<Quote>();
  liked: boolean = false;
  deleted:boolean = false;

  @Input() idUser: string = "";

  constructor(private _quoteService: QuoteService, private toastr: ToastrService, private _groupService:GroupService) {
  }

  ngOnInit() {
    if (this.quote && this.quote.likes) {
      this.liked = this.quote.likes.includes(this.idUser);
    }
  }

  requestDelete() {
    this.deleteRequest.emit(this.quote);
  }

  toggleLike() {
    if (!this.quote) return;

    if (!this.idUser) {
      this.toastr.info("Login or Sign up to like this quote", "You haven't login")
      return;
    };

    if (this.liked && this.quote._id) {
      this._quoteService.unLikeQuote(this.quote._id).subscribe(() => {
        this.liked = false;
        this.quote?.likes.pop();
      });
    } else if (this.quote._id) {
      this._quoteService.likeQuote(this.quote._id).subscribe(() => {
        this.liked = true;
        this.quote?.likes.push(this.idUser);
      });
    }
  }
}
