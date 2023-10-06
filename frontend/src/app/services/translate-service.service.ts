import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    constructor(private translateService: TranslateService) { }
    lang = "en";
    translateText: any
    translate() {
        return this.translateService.getTranslation(this.lang).pipe(map(res => {
            this.translateText = res;
            return true;
        }))
    }
}