import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainComponent,SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AnimeExplorer';
}
