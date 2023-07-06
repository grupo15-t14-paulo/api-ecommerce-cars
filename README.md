# api-ecommerce-cars

<h2>Conteúdo</h2>

- [1. Sobre o projeto 🚗](#1-sobre-o-projeto)
- [2. Links da aplicação 🔗](#2-links-da-aplicação)
- [3. Funcionalidades 🧮](#3-funcionalidades)
- [4. Tecnologias 💻](#4-tecnologias)
  - [4.1 Requisitos 📌](#41-requisitos)
- [5. Instalação da aplicação 💽](#5-instalação-da-aplicação)
- [6. Time de desenvolvedores 👩🧑‍💻](#6-time-de-desenvolvedores)



## 1. Sobre o projeto

A Aplicação consiste em um e-commerce voltado a compra e venda de automoveis, onde é possivel cadastrar dois tipos de usúarios, anunciante e comprador.



## 2. Links da aplicação

Repositório API: https://github.com/grupo15-t14-paulo/api-ecommerce-cars

Link para DOC API: https://webmotors-gp15.onrender.com/api-docs

Repositório Front-end: https://github.com/grupo15-t14-paulo/frontend-ecommerce-cars



## 3. Funcionalidades

Acessando a aplicação em modo publico você pode:

- [x] Visualizar todos os anuncios;
- [x] Visualizar detalhes do anuncio e do vendedor;

Criando sua conta como Anunciante você pode:

- [x] Publicar anuncios de venda de veiculos;
- [x] Editar seus anuncios depois de postados;
- [x] Excluir seus anuncios;


Criando sua conta como Comprador você pode:

- [x] Visualizar todos anuncios;
- [x] Comprar veiculos anunciados;
- [x] Fazer comentarios nos anuncios;



## 4. Tecnologias

- <a name="typescript" href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
- <a name="nodejs" href="https://nodejs.org/en/" target="_blank">Node</a>
- <a name="expressjs" href="https://expressjs.com/" target="_blank">ExpressJS</a>
- <a name="typeorm" href="https://typeorm.io/" target="_blank">TypeORM</a>
- <a name="postgreSQL" href="https://www.postgresql.org/docs/" target="_blank">PostgreSQL</a>
- <a name="TailwindCSS" href="https://tailwindcss.com/docs/installation" target="_blank">Tailwind CSS</a>



## 4.1 Requisitos

- PostgreSQL database;



## 5. Instalação da aplicação

- <h3>Front-End</h3>

Utilize o comando `yarn install` para instalar os pacotes da aplicação

Utilize o comando `"yarn dev"` para inicializar a aplicação

- <h3>Back-End</h3>

Utilize o comando `"yarn install"` para instalar os pacotes da aplicação.

Configure o arquivo `".env"` de acordo como o `".env.example"` para conectar-se ao banco de dados.

Utilize o comando `"yarn run typeorm migration:generate ./src/migrations/InitialMigration -d ./src/data-source.ts"` para gerar as migrations.

Utilize o comando `"yarn run typeorm migration:run -d ./src/data-source"` para dar run nas migrations.

Utilize o comando `"yarn dev"` para inicializar a aplicação.



## 6. Time de desenvolvedores

<table>
  <tr>
  <td align="center"><a href="https://github.com/megaurso" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/110126139?v=4" width="75px;" alt=""/><br /><sub><b>Bernardo Guimares</b></sub></a><br /><a href="https://www.linkedin.com/in/bernardo-guimaraes/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
  <td align="center"><a href="https://github.com/dbnvides" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/39993447?v=4" width="75px;" alt=""/><br /><sub><b>Dionisio Benevides</b></sub></a><br /><a href="https://www.linkedin.com/in/dionisiosantos//" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
  <td align="center"><a href="https://github.com/ErikNibe" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/110181262?v=4" width="75px;" alt=""/><br /><sub><b>Erik Eiji Nibe</b></sub></a><br /><a href="https://www.linkedin.com/in/érik-nibe-259850210/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
  <td align="center"><a href="https://github.com/matheushgrohs" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/105793058?s=400&u=dff728e733aad52c14ed955d417bb9bb6f276ce7&v=4" width="75px;" alt=""/><br /><sub><b>Matheus Henrique</b></sub></a><br /><a href="https://www.linkedin.com/in/matheushgrohs/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
  <td align="center"><a href="https://github.com/NathMedeiros" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/110193923?v=4" width="75px;" alt=""/><br /><sub><b>Nathalia de Oliveira</b></sub></a><br /><a href="https://www.linkedin.com/in/nathalia-de-oliveira-medeiros/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
  </tr>
</table>


