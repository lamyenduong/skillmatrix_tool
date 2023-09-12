import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TextService } from 'src/app/services/text-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  searchPageText: any
  users!: User[]

  constructor(private textService: TextService, private userService: UserService) { }

  ngOnInit(): void {
    this.textService.getAllTexts().subscribe(data => {
      this.searchPageText = data;
    });
    this.userService.getAllUsers().then(users => this.users = users)
  }

}
