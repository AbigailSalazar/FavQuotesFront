import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quote } from '../../models/quote';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-quote',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css'
})
export class CreateQuoteComponent {
  @Input() idGroup: string | undefined;
  @Input()
  idUser: any;

  productoForm: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.productoForm = this.fb.group({
      person: ["", Validators.required],
      quote: ["", Validators.required]
    })
  }

  addQuote() {
    const person = this.productoForm.get("person")?.value
    const quoteText = this.productoForm.get("quote")?.value;

    const QUOTE: Quote = {
      user: this.idUser,
      person: person,
      quote: quoteText,
      likes: []
    }
    this.productoForm.reset();
    this.toastr.success("Quote from "+person+" "+"was created!","Quote saved");
  }
}
