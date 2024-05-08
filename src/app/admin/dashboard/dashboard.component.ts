import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/pages/authen.service';

interface User {
  id: number;
  username: string;
  bankName: string;
  bankNumber: string;
  balance: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

  constructor(private authenService: AuthenService) { }

  ngOnInit(): void {
  }

 
}
