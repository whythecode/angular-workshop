import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor (
    protected settingsService: SettingsService,
  ) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const shouldBeIntercepted = this.settingsService.isMockEnabled()
                                && req.url.includes('/api', 0);

    if (!shouldBeIntercepted) {
      return next.handle(req);
    }

    const mockUrl = req.url.replace('/api/', '/assets/mock/');

    return next.handle(req.clone({ url: mockUrl }));
  }
}
