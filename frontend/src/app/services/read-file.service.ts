import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Form } from '../models/form.model';

@Injectable({
    providedIn: 'root'
})
export class ReadFileService {

    indexTeam = 1;
    indexCareerPath = 2;
    indexVerbalSkills = 3;
    indexIndependenceWorkings = 4;
    indexInterviewSkills = 5;
    indexTroubleshootingSkills = 6;
    indexHTML = 7;
    indexCSS = 8;
    indexReactJS = 9;
    indexAngular = 10;
    indexVue = 11;
    indexNextJS = 12;
    indexSCSS = 13;
    indexLESS = 14;
    indexStylus = 15;
    indexTailwindCSS = 16;
    indexFoundation = 17;
    indexBootstrap = 18;
    indexMaterialize = 19;

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
                const formArray = dataArray.map((data: any[9][]) => {
                })
                resolve(dataArray);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    }
}