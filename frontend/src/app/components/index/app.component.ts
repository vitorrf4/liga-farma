import { Component } from '@angular/core';
import { HeaderComponent } from '../geral/header/header.component';
import { FooterComponent } from '../geral/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
}
