import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  protected mockEnabled = false;

  setMockEnabled (enabled: boolean) {
    this.mockEnabled = enabled;
  }

  isMockEnabled () {
    return this.mockEnabled;
  }
}
