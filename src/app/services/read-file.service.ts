import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ReadFileService {
    constructor(private http: HttpClient) { }

    readFile(file: File) {
        return null;
    }
}
