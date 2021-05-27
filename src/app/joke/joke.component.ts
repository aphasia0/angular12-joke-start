import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  $jokes: Observable<Joke[]> = new Observable();
  $joke: Observable<Joke> = new Observable();

  formVisible: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.onClick();
  }

  onSubmit(): void {
    this.http
      .post('http://localhost:3004/barzellete', {
        ...this.jokeForm.value,
      })
      .subscribe(console.log);
    this.formVisible = false;
  }

  onClick(): void {
    this.$jokes = this.http.get<Joke[]>('http://localhost:3004/barzellete');
    this.$joke = this.$jokes.pipe(
      switchMap((value) => {
        let id = Math.round(Math.random() * (value.length - 1));
        return this.http.get<Joke>('http://localhost:3004/barzellete/' + id);
      })
    );
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
}
