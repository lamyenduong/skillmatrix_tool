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

                const resultArray: any[][] = [];

                const ranges = [
                    { startRow: 7, endRow: 34, startCol: 0, endCol: 101 },
                    // { startRow: 7, endRow: 7, startCol: 7, endCol: 29 },
                    // { startRow: 7, endRow: 7, startCol: 30, endCol: 39 },
                    // { startRow: 7, endRow: 7, startCol: 40, endCol: 50 },
                    // { startRow: 7, endRow: 7, startCol: 51, endCol: 53 },
                    // { startRow: 7, endRow: 7, startCol: 54, endCol: 64 },
                    // { startRow: 7, endRow: 7, startCol: 65, endCol: 79 },
                    // { startRow: 7, endRow: 7, startCol: 80, endCol: 89 },
                    // { startRow: 7, endRow: 7, startCol: 90, endCol: 97 },
                    // { startRow: 7, endRow: 7, startCol: 98, endCol: 102 },
                    // { startRow: 8, endRow: 8, startCol: 3, endCol: 6 },
                    // { startRow: 8, endRow: 8, startCol: 7, endCol: 29 },
                    // { startRow: 8, endRow: 8, startCol: 30, endCol: 39 },
                    // { startRow: 8, endRow: 8, startCol: 40, endCol: 50 },
                    // { startRow: 8, endRow: 8, startCol: 51, endCol: 53 },
                    // { startRow: 8, endRow: 8, startCol: 54, endCol: 64 },
                    // { startRow: 8, endRow: 8, startCol: 65, endCol: 79 },
                    // { startRow: 8, endRow: 8, startCol: 80, endCol: 89 },
                    // { startRow: 8, endRow: 8, startCol: 90, endCol: 97 },
                    // { startRow: 8, endRow: 8, startCol: 98, endCol: 102 },
                ];
                ranges.forEach((range) => {
                    const { startRow, endRow, startCol, endCol } = range;
                    const subarray: any[] = [];
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
                            subarray.push(rowArray);
                        }
                    }
                    resolve(subarray);
                });
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    }
}