import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private filePath!: string;
  constructor() { }

  setFilePath(path: string) {
    this.filePath = path;
  }

  getFilePath(): string {
    return this.filePath;
  }
}
