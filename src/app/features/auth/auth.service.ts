import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import {
  BehaviorSubject,
  forkJoin,
  from,
  Observable,
  of,
  pluck,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { SigninCredentials, SignupCredentials } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this._auth);

  constructor(private _auth: Auth, private _http: HttpClient) {}

  getStreamToken() {
    return this._http
      .post<{ token: string }>(`${environment.apiUrl}/createStreamToken`, {
        user: this.getCurrentUser(),
      })
      .pipe(pluck('token'));
  }

  getCurrentUser() {
    return this._auth.currentUser!;
  }

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(
      createUserWithEmailAndPassword(this._auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        forkJoin([
          updateProfile(user, { displayName }),
          this._http.post(`${environment.apiUrl}/createStreamUser`, {
            user: { ...user, displayName },
          }),
        ])
      )
    );
  }

  signOut() {
    const user = this._auth.currentUser;
    return from(this._auth.signOut()).pipe(
      switchMap(() =>
        this._http.post(`${environment.apiUrl}/revokeStreamUserToken`, { user })
      )
    );
  }
}
