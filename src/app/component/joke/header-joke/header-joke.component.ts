import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-joke',
  templateUrl: './header-joke.component.html',
  styleUrls: ['./header-joke.component.scss'],
})
export class HeaderJokeComponent implements OnInit {
  @Output()
  getClick: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  addClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  getData() {
    this.getClick.next();
  }

  showForm() {
    this.addClick.next();
  }
}
