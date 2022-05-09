import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chatrooms';
  constructor(public auth: AuthService, private _router: Router) {}

  signOut() {
    this.auth.signOut().subscribe({
      next: () => this._router.navigate(['signin']),
    });
  }
}
