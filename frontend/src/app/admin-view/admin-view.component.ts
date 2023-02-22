import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {
  users?: Observable<User[]>;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
  panelOpenState = false; 
}
