import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    isNavbar: boolean = true

    constructor() {
    }
    hide() {
        this.isNavbar = false;
    }
    display() {
        this.isNavbar = true
    }
}