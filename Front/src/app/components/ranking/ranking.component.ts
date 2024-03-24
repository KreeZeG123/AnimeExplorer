import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { AuthService } from '../../services/auth/auth.service';
import { RankingService } from '../../services/ranking/ranking.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent {
  constructor(
    private authService: AuthService,
    private rankingService: RankingService
  ) {}

  userIsConnected(): boolean {
    return this.authService.userIsConnected();
  }

  getUserPersonalClassement() {}

  public classementResult = [{ username: '', score: '' }];

  public personalScore = '';
  public personalRank = '';

  doCapture() {
    // Capture de l'image du classement
    const screenshoot = document.getElementById('screenshoot');
    if (screenshoot != null) {
      html2canvas(screenshoot).then((canvas) => {
        // Convertir le canvas en image URL
        const imgData = canvas.toDataURL('image/png');

        // Créer un élément <a> pour télécharger l'image
        const downloadLink = document.createElement('a');
        downloadLink.href = imgData;
        downloadLink.download = 'classement.png';

        // Clic simulé sur le lien pour télécharger l'image
        downloadLink.click();
      });
    }
  }

  async getRanking(userID: string) {
    this.classementResult = [];
    await this.rankingService
      .getRanking(userID)
      .then((response) => {
        if (response == null) {
          console.error('Erreur lors de la recherche');
        } else {
          this.classementResult = response.classement;
          this.personalScore = response.personalRanking.point;
          this.personalRank = response.personalRanking.ranking;
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error);
      });
  }

  ngOnInit() {
    this.getRanking(this.authService.getUserId() || 'none');
  }
}
