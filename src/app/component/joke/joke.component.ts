import { Component, OnInit } from '@angular/core';

import { Joke } from '../../joke';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent implements OnInit {
  joke: Joke | undefined;

  formVisible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(joke: Joke): void {
    this.http
      .post<Joke>('http://localhost:3004/barzellete', {
        ...joke,
      })
      .subscribe(value => (this.joke = value));
    this.formVisible = false;
  }

  getData(): void {
    const $jokes = this.http.get<Joke[]>('http://localhost:3004/barzellete');
    $jokes
      .pipe(
        switchMap(value => {
          let arrayIndex = Math.round(Math.random() * (value.length - 1));
          return this.http.get<Joke>('http://localhost:3004/barzellete/' + value[arrayIndex].id);
        }),
      )
      .subscribe(value => (this.joke = value));
    //
    // the code above can be done with the following code too, but prefer switchMap in pipe instead of two subscribe
    // $jokes.subscribe((value) => {
    //   let arrayIndex = Math.round(Math.random() * (value.length - 1));
    //   this.http
    //     .get<Joke>('http://localhost:3004/barzellete/' + value[arrayIndex].id)
    //     .subscribe((value1) => (this.joke = value1));
    // });
  }

  showForm() {
    this.formVisible = !this.formVisible;
  }
  delete() {
    this.http
      .delete<Joke>('http://localhost:3004/barzellete/' + this.joke?.id)
      .subscribe(() => this.getData());
  }

  like() {
    this.http
      .put<Joke>('http://localhost:3004/barzellete/' + this.joke?.id, {
        ...this.joke,
        like: !this.joke?.like,
      })
      .subscribe(value => (this.joke = value));
  }
}
