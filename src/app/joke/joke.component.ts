import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from './joke';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit {
  jokeForm = this.fb.group({
    title: [null, Validators.required],
    content: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    alert('Thanks!');
  }
  $joke: Observable<Joke> = new Observable();

  ngOnInit(): void {
    this.onClick();
  }

  onClick(): void {
    let id = Math.floor(Math.random() * 10);
    this.$joke = this.http.get<Joke>('http://localhost:3004/barzellete/' + id);
  }
}
