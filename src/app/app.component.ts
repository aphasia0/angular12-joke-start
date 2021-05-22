import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Joke } from './joke';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
          let arrayIndex = Math.round(Math.random() * (value.length - 1));
          return this.http.get<Joke>(
            'http://localhost:3004/barzellete/' + value[arrayIndex].id
          );
        })
      )
      .subscribe((value) => (this.joke = value));
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
      .subscribe((value) => (this.joke = value));
  }
}
