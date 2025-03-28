import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private sanitization: DomSanitizer) {

  }
  getBackgroundPath(filePreviewUrl: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }
}
