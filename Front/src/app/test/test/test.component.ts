import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit(): void {
    // Exemple d'appel à la méthode pour récupérer des données
    this.testService.getData().subscribe((data) => {
      console.log(data);
    });

    // Exemple d'appel à la méthode pour envoyer des données
    const dataToSend = { key: 'value' };
    this.testService.sendData(dataToSend).subscribe((response) => {
      console.log(response);
    });
  }
}
