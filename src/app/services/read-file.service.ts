import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ReadFileService {
    constructor() { }

    readFile(file: File): Promise<any[][]> {
        return new Promise((resolve, reject) => {
            const reader: FileReader = new FileReader();

            reader.onload = (e: any) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const dataArray: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                resolve(dataArray);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    }

}