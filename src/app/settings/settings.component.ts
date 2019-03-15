import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../shared/settings.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  mockEnabled = false;

  constructor (
    protected settingsService: SettingsService,
    protected router: Router,
  ) {}

  save () {

    this.settingsService.setMockEnabled(this.mockEnabled);
    this.router.navigate(['/']);
  }
}
