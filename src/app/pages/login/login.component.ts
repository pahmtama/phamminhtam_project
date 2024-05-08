import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../authen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
  });

  constructor(
    private authenService: AuthenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }


  login(){
    this.authenService.login(this.loginForm.value).subscribe((res: any) => {
      if(res.success == true){
        this.toastr.success('Đăng nhập thành công');
        localStorage.setItem('token', res.data.token);
        window.location.href = '/admin';
      }else{
        this.toastr.error('Đăng nhập thất bại');
      }
    });
  }
}
