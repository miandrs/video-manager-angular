import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  constructor(private contactService: ContactService, private formBuilder: FormBuilder, private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  onCreateContact() {
    const formValue = this.contactForm.value;
    this.contactService.createContact(new Contact('', formValue.name, formValue.email, formValue.message));
  }

  getBackgroundPath(filePreviewUrl: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }

  ngOnDestroy(): void {
  }
}
