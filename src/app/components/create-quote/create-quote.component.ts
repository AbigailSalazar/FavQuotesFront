import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quote } from '../../models/quote';
import { ToastrService } from 'ngx-toastr';
import { QuoteService } from '../../services/quote.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css'
})
export class CreateQuoteComponent {
  @Input() idGroup: any;
  @Input()
  idUser: any;
  loading:boolean=false;
  @Output() addRequest = new EventEmitter<Quote>();

  productoForm: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private _quoteService: QuoteService, private _groupService:GroupService) {
    this.productoForm = this.fb.group({
      person: ["", Validators.required],
      quote: ["", Validators.required]
    })
  }


  ngOnInit() {
    console.log('idGroup:', this.idGroup);
    console.log('idUser:', this.idUser);
  }

  addQuote() {
    this.loading = true;
    const person = this.productoForm.get("person")?.value
    const quoteText = this.productoForm.get("quote")?.value;

    const QUOTE: Quote = {
      user: this.idUser,
      person: person,
      quote: quoteText,
      likes: []
    }

    this._quoteService.addQuote(QUOTE).subscribe(newQuote => {
      this._groupService.addQuote(this.idGroup,(newQuote as any)._id).subscribe(data => {
        this.toastr.success("Quote from " + person + " " + "was created!", "Quote saved");
        this.productoForm.reset();
        this.loading = false;
        this.addRequest.emit(newQuote as Quote);
      })
    })
  }
}
