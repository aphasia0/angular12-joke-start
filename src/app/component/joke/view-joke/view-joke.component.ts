import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Joke } from '../../../joke';

@Component({
  selector: 'app-view-joke',
  templateUrl: './view-joke.component.html',
  styleUrls: ['./view-joke.component.scss'],
})
export class ViewJokeComponent implements OnInit {
  @Input()
  joke: Joke | undefined;

  @Output()
  deleteClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  likeClick: EventEmitter<void> = new EventEmitter<void>();

  catUrl: string = "url('https://placekitten.com/g/200/3";
  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.deleteClick.emit();
  }

  like() {
    this.likeClick.emit();
  }
}
