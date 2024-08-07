import { Injectable, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: any;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    rendererFactory: RendererFactory2,
    private storage: Storage,
    private platform: Platform) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addBodyClass(bodyClass: string) {
    this.renderer.addClass(this.document.body, bodyClass);
  }

  removeBodyClass(bodyClass: string) {
    this.renderer.removeClass(this.document.body, bodyClass);
  }
  toggleDarkTheme(isDark = true, needUpdate = true) {
    if (needUpdate) this.storage.set('darkMode', isDark);
    return isDark ? this.addBodyClass('dark-mode') : this.removeBodyClass('dark-mode');
  }

  getCurrentSetting() {
    return this.storage.get('darkMode');
  }

  restore() {
    this.storage.get('darkMode').then(val => {
      this.toggleDarkTheme(val, false);
      if (this.platform.is('ios')) {
        if (val) { StatusBar.setStyle({ style: Style.Dark }); }
        else { StatusBar.setStyle({ style: Style.Light }); }
      }
    });
  }
}
