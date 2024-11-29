import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
// // Dùng trong môi trường Node.js (nếu bạn chạy qua SSR hoặc server-side rendering)
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
