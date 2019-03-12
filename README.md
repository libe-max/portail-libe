# Les outils de Six Plus

**Générateur de format pour Libé Six Plus.**

L'outil de Six PLus permet de crée des fichiers html pret à être uploader sur le static pour publication.

Format actuelement disponible :

- Temoignage
- Quiz
- Libé Box
- Libé Graph

L'application utilise :

- Vue
- Webpack
- Node
- Express

## Développement :

- coté front :

	`cd client` & `npm run dev` lance la version de dev de l'app avec vue et webpack

- coté server :

	`cd server` & `npm run start` lance le server de dev avec nodemon
	
## Production :

- coté front :

	`cd client` & `npm run build` crée la version de production de l'app front dans `./client/dist/`
	
	copier `./client/dist/**` dans `./server/dist/`

- coté server :

	`cd server` & `npm run serve` lance le server de prod


## Utilisation :

Utiliser l'outils pour créer, modifier, supprimer des formats.

Tout les fichiers html crée avec l'app se trouve dans `./server/dist/app/` les dossiers present sont pres à être uploader sur le static via ftp.

En local les fichiers se trouve dans `./Users/liberation/Sites/OUTILS/portail-libe/server/dist/app/`

## License

> The MIT License (MIT)
>
> Copyright (c) Libé Six Plus 2015
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without > limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following > conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO > EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR > THE USE OR OTHER DEALINGS IN THE SOFTWARE.
