import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Joke } from '../../../joke';

@Component({
  selector: 'app-add-joke',
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.scss'],
})
export class AddJokeComponent implements OnInit {
  @Output()
  submitClick: EventEmitter<Joke> = new EventEmitter();

  jokeForm = this.fb.group({
    title: [null, Validators.required],
    content: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitClick.emit(this.jokeForm.value);
  }
}
