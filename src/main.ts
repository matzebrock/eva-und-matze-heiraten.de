import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { registerLocaleData } from '@angular/common';
import * as locale1 from '@angular/common/locales/de';
import * as locale2 from '@angular/common/locales/extra/de';

registerLocaleData(locale1.default, 'de', locale2.default);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
