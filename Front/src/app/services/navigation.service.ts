import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navLinkClicked = new Subject<string>();

  navLinkClicked$ = this.navLinkClicked.asObservable();

  notifyNavLinkClicked(boardId: string) {
    this.navLinkClicked.next(boardId);
  }
}
