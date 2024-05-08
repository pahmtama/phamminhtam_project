import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appLoginCheck]'
})
export class LoginCheckDirective implements OnInit {

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const isAuthenticated = this.isAuthenticated();
    // Nếu chưa đăng nhập, ẩn phần tử HTML sử dụng directive này
    if (!isAuthenticated) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }

  private isAuthenticated(): boolean {
    // Kiểm tra xem token có tồn tại trong localStorage hoặc cookie không
    const token = localStorage.getItem('token');
    return !!token;
  }

}
