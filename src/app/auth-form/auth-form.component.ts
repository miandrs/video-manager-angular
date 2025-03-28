import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: false,
  
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent  implements OnInit {
  authForm!: FormGroup;
  pageName!: string;
  errorMessage : any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    const urlPath = this.route.snapshot.url[0].path;
    this.pageName = (urlPath === 'login') ? 'Login' : ((urlPath === 'register') ? 'Register' : '');
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onRegister() {
    const formValue = this.authForm.value;
    const credentials = { email: formValue.email, password: formValue.password };
    this.authService.createUser(credentials);
  }

  async onSignIn() {
    const formValue = this.authForm.value;
    const credentials = { email: formValue.email, password: formValue.password };
    this.errorMessage = this.authService.authenticate(credentials);
  }

  getBackgroundPath(filePreviewUrl: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }
}
