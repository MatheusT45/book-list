# book-list

Sobre o desafio:

Esse projeto utiliza Docker, PHP 8.1, Yii2, Node 20.11 LTS, Angular 17 e MySQL 5.7.

O projeto se chama Bookshelf, um CRUD de livros com filtros, pagina'c~ao e sistema de autentica'c~ao utilizando JWT.

Esse desafio foi muito interessante pra mim pois n~ao tinha conhecimento pr'evio do framework Yii (Apesar de j'a estar familiarizado com outros frameworks de PHP do mercado como Laravel e Symfony) e do Angular (J'a utilizei outros frameworks/libs de JS como React e Vue).

Optei por usar o Angular Material pela praticidade e agilidade.

Optei tamb'em por criar duas bibliotecas no packagist por conta de pequenos ajustes necess'arios devido a problemas de compatibilidade das bibliotecas de JWT dispon'iveis pro Yii com a vers~ao 8.1 do PHP.

Seguem os pacotes:

- https://github.com/MatheusT45/php8.1-jwt

- https://github.com/MatheusT45/yii2-jwt-3.2

## Documenta'c~ao

### Utilizando Docker

Rode as aplica'c~oes usando esse comando na raiz do projeto

```
docker compose up
```

Os pr'oximos comandos s~ao relacionados ao banco de dados, para rod'a-los rode o seguinte comando para acessar o servidor do backend `server`:

```
docker exec -it server bash
```

'E poss'ivel rod'alos _localmente_ tamb'em, mas 'e preciso das bibliotecas do backend instaladas localmente, para isso, basta rodar o `composer install` no `/server`.

Para rodar as migrations:

```
php yii migrate --interactive=0
```

Para rodar as fixtures:

```
php yii fixture "Book, User"  --namespace='app\tests\unit\fixtures' --interactive=0
```

Ap'os rodar as fixtures, o usu'ario admin ser'a criado para acessar a plataforma de primeira.

```
username: `admin`
senha: `admin`.
```

Ser~ao criados tamb'em 20 cursos para serem exibidos.

Note que tamb'em 'e poss'ivel criar novos usu'arios na tela de cadastro.

#### Rotas da API

| M'etodos      | Rotas               | Descric'~ao                                     |
| ------------- | ------------------- | ----------------------------------------------- |
| GET           | /api/books          | Lista todos os livros;                          |
| POST          | /api/books          | Cria um novo livro;                             |
| GET           | /api/books/{id}     | Retorna os detalhes de um livro por id;         |
| PATCH and PUT | /api/books/{id}     | Atualiza um livro;                              |
| DELETE        | /api/books/{id}     | Exclui um livro;                                |
| POST          | /auth/login         | Login da aplica'c~ao;                           |
| POST          | /auth/signup        | Cadastrar na aplica'c~ao;                       |
| POST          | /auth/refresh-token | Atualiza o token JWT de acesso;                 |
| DELETE        | /auth/refresh-token | Remove o token JWT de acesso do usu'ario atual; |

## Pontos futuros

- testes unit'arios
- localiza'c~ao (internacionaliza'c~ao)
- Visualioza'c~ao de livros em mosaico (galeria) com capa dos livros
- confirma'c~ao de login por e-mail
- esqueceu sua senha
- colocar um debounce no filtro de texto no frontend, para evitar v'arias chamadas de uma vez

Gostaria de agradecer a oportunidade de realizar esse desafio, aprendi muito e gostei bastante do resultado, espero que gostem tamb'em!
