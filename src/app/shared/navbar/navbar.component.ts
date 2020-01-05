import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor( public store: Store<AppState>) { }

  ngOnInit() {
  
  }


}
