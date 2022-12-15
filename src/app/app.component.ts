import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mercados', url: '/folder/Inbox', icon: 'Home' },
    { title: 'Gestion de Mercados', url: '/markets', icon: 'basket' },
    { title: 'Gestion de Activos', url: '/positions', icon: 'server' },
    { title: 'Asignar Activos a Mercados', url: '/assign', icon: 'archive' },
    { title: 'Ver Activos en Callendar', url: '/schedule', icon: 'reader' },
    { title: 'Contacto', url: '/about', icon: 'people'}
  ];
  public labels =[]
  language = 0; // 0 español, 1 ingles
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
  }
  onLanguage(){
    this.language = (this.language+1)%2;
    switch(this.language){
      case 0 :
        this.translate.setDefaultLang('es');
        break;
      case 1 :
        this.translate.setDefaultLang('en');
        break;
    }
  }
  OnToggleDarkMode() {
    document.body.setAttribute('color-theme', 'dark');
  }

  OnToggleLightMode() {
    document.body.setAttribute('color-theme', 'light');
  }
}
