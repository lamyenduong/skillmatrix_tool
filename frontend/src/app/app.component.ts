import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'SkillMatrix_FE';

  constructor(private primengConfig: PrimeNGConfig, public translate: TranslateService) {
    translate.addLangs(["en"]);
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLang(lang: string) {
    this.translate.use(lang)
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}