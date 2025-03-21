import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

const btn = document.querySelector(`
  #myTab > li:nth-child(2) > button
  `) as HTMLElement;
if (btn != null) {
  // btn.click();
}
