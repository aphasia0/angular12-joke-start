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
    this.http
      .post('http://localhost:3004/barzellete', {
        title: this.jokeForm.value,
      })
      .subscribe(console.log);
  }
  $jokes: Observable<Joke> = new Observable();

  ngOnInit(): void {
    this.$jokes = this.http.get<Joke>('http://localhost:3004/barzellete');
  }

  onClick(): void {
    this.$jokes.pipe();
    8;
    999999;
  }
}
