import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

 getMessage(): Observable<string> {
    return of('Hello from Observable 🔥');
  }
}
