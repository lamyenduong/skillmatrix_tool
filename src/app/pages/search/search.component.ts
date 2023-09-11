import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  searchPageText: any

  constructor(private textService: TextService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.searchPageText = data;
    });
  }

}
