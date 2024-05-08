import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenService } from '../authen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authenService: AuthenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.authenService.register(this.registerForm.value).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success('Đăng ký thành công');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Đăng ký thất bại');
      }
    });
  }
}
