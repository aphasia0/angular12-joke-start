import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joke } from './joke';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

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

  joke: Joke | undefined;

  formVisible: boolean = false;
  catUrl: string = "url('https://placekitten.com/g/200/3";

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(): void {
    this.http
      .post<Joke>('http://localhost:3004/barzellete', {
        ...this.jokeForm.value,
      })
      .subscribe((value) => (this.joke = value));
    this.formVisible = false;
  }

  getData(): void {
    const $jokes = this.http.get<Joke[]>('http://localhost:3004/barzellete');
    $jokes
      .pipe(
        switchMap((value) => {
          let id = Math.round(Math.random() * (value.length - 1));
          return this.http.get<Joke>('http://localhost:3004/barzellete/' + id);
        })
      )
      .subscribe((value) => (this.joke = value));
    // this.$jokes.subscribe((value) => {
    //   let id = Math.round(Math.random() * value.length - 1);
    //   this.http
    //     .get<Joke>('http://localhost:3004/barzellete/' + id)
    //     .subscribe((value1) => (this.$joke = of(value1)));
    // });
  }

  showForm() {
    this.formVisible = !this.formVisible;
  }

  delete() {
    this.http
      .delete<Joke>('http://localhost:3004/barzellete/' + this.joke?.id)
      .subscribe(() => (this.joke = undefined));
  }

  like() {
    this.http
      .put<Joke>('http://localhost:3004/barzellete/' + this.joke?.id, {
        ...this.joke,
        like: !this.joke?.like,
      })
      .subscribe((value) => (this.joke = value));
  }
}
