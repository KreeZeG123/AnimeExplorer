import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-classement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.scss'
})
export class ClassementComponent {
  classementResult=[
    { name:"Cody",point:"245"},
    { name:"Natouf",point:"230"},
    { name:"Natouf",point:"220"},
    { name:"Natouf",point:"210"},
    { name:"Natouf",point:"200"},
    { name:"Natouf",point:"200"}
  ]

  doCapture() {
    // Capture de l'image du classement
    const screenshoot = document.getElementById('screenshoot');
    if(screenshoot!=null){
      html2canvas(screenshoot).then(canvas => {
        // Convertir le canvas en image URL
        const imgData = canvas.toDataURL('image/png');

        // Créer un élément <a> pour télécharger l'image
        const downloadLink = document.createElement('a');
        downloadLink.href = imgData;
        downloadLink.download = 'classement.png';

        // Clic simulé sur le lien pour télécharger l'image
        downloadLink.click();
      });}
  }
  score={sc:"23"};
}
