# AnimeExplorer

## Contexte

Ce projet a été réalisé dans le cadre de la troisième année de licence en informatique à l'Université du Mans, en France. Il a été développé dans le cadre des modules suivants :

- Module Interfaces Humains-Machines
- Module Architectures logicielles pour le développement d'applications Web

L'objectif principal de ces modules était de créer une single page application utilisant un framework tel que Angular, ainsi que de concevoir une application web exploitant une API et une base de données MongoDB.

Le projet s'est déroulé sur la période du 11 janvier 2024 au 25 mars 2024.

## Description de l’application

AnimeExplorer est une application web conçue pour tester et élargir vos connaissances en animé tout en vous amusant. L'application offre un jeu interactif où les utilisateurs doivent deviner le nom d'un animé en fonction de ses caractéristiques. À chaque tentative, des caractéristiques communes entre l'animé à deviner et celui proposé sont révélées, aidant ainsi les joueurs à progresser dans le jeu. En plus du jeu, l'application propose une section permettant de découvrir de nouveaux animés en fonction de certaines caractéristiques spécifiques. De plus, un système de classement entre les joueurs est mis en place pour encourager la compétition.

## Auteurs

Chaque auteur a son propre espace de travail dédié dans une branche spécifique. Ainsi, pour consulter le code développé par un auteur particulier, vous devez accéder à sa branche attitrée.

- [Yamis MANFALOTI](https://github.com/KreeZeG123)
- [Nathan RACCOUARD](https://github.com/Nathan-zvk)
- [Cody THEARD](https://github.com/SkyZerFoxs)

## Technologies utilisées

### Front-End
- HTML et CSS : Langages utilisés pour la structure et la présentation d'un site web.
- JavaScript : Langage de programmation utilisé pour l'interaction côté client.
- Bootstrap : Framework CSS facilitant la création de designs web responsifs.
- Angular : Framework JavaScript utilisé pour la création d'applications web dynamiques.

### Back-End
- Node.js : Plateforme permettant de développer des applications côté serveur en JavaScript.
- MongoDB : Système de gestion de base de données orienté documents utilisé pour stocker les données de l'application.
- API AniList : Interface web utilisée pour interagir via GraphQL avec les données misent à disposition par le site AniList.

### Outils
- Visual Studio Code : Environnement de développement intégré utilisé pour coder l'application.
- GitHub : Plateforme de développement collaboratif facilitant le partage et la gestion des fichiers de code.
- Trello : Outil de gestion de projet utilisé pour organiser les tâches et suivre la progression du projet.
- Discord : Plateforme de communication utilisée pour la collaboration et les discussions entre les membres de l'équipe.
- Google Docs : Outil de partage de documents utilisé pour la collaboration et la rédaction de documents de projet.
- Google Drive : Plateforme de stockage de fichiers utilisée pour partager des ressources et des documents liés au projet.

## Installation et utilisation

1. Clonez ce dépôt GitHub sur votre machine locale.
2. Assurez-vous d'avoir Node.js d'installé sur votre système.
3. Aller dans 'AnimeExplorer/Back' puis installez les dépendances en exécutant `npm install`.
4. Aller dans 'AnimeExplorer/Front' puis installez les dépendances en exécutant `npm install`.
5. Aller dans 'AnimeExplorer/Back' puis crée un dossier 'AnimeExplorer/Back/secret'
6. Ajouter dans 'AnimeExplorer/Back/secret' le fichier 'mongoDB.key' qui contient la clé  pour la base de donnée ( contactez-nous pour l'obtenir si besoin )
7. Démarrez le serveur Back-End en allant dans 'AnimeExplorer/Back', puis en exécutant `node src/server.js`.
8. Démarrez le serveur Front en allant dans 'AnimeExplorer/Front', puis en exécutant `npm start`.
9. Accédez à l'application via votre navigateur web à l'adresse indiquée ( Par defaut : [localhost](http://localhost:4200/) ).


## Licence

Ce projet est sous licence MIT - voir la licence ci-dessous pour plus de détails.

```
MIT License

Copyright (c) 2024 MANFALOTI Yamis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
