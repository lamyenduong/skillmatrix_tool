import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Form } from '../models/form.model';

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
                const ranges = [
                    { startRow: 7, endRow: 34, startCol: 0, endCol: 101 },
                ];
                ranges.forEach((range) => {
                    const { startRow, endRow, startCol, endCol } = range;
                    const resultArray: any[][] = [];
                    for (let row = startRow; row <= endRow; row++) {
                        const rowArray: any[] = [];
                        let isRowEmpty = true;
                        for (let col = startCol; col <= endCol; col++) {
                            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                            const cell = worksheet[cellAddress];
                            const cellValue = cell ? cell.v : undefined;
                            if (cellValue !== undefined) {
                                if (typeof cellValue === 'string' && cellValue.trim() !== '') {
                                    isRowEmpty = false;
                                } else if (typeof cellValue !== 'string') {
                                    isRowEmpty = false;
                                }
                            }
                            rowArray.push(cellValue);
                        }
                        if (!isRowEmpty) {
                            resultArray.push(rowArray);
                        }
                    }
                    resolve(resultArray);
                });
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    }
}