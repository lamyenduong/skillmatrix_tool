import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    isNavbar: boolean

    constructor() {
        this.isNavbar = true
    }
    hide() {
        this.isNavbar = !this.isNavbar;
    }
    display() {
        this.isNavbar = true
    }
}