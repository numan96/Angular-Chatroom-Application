import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this._auth);

  constructor(private _auth: Auth) {}

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(
      createUserWithEmailAndPassword(this._auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName })));
  }

  signOut() {
    return from(this._auth.signOut());
  }
}
