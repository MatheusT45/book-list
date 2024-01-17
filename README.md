# Bookshelf

Sobre o desafio:

Esse projeto utiliza Docker, PHP 8.1, Yii2, Node 20.11 LTS, Angular 17 e MySQL 5.7.

O projeto se chama Bookshelf, um CRUD de livros com filtros, paginação e sistema de autenticação utilizando JWT.
Também possui integração com a API https://hgbrasil.com/status/weather e a informação é exibida na toolbar da aplicação.

Esse desafio foi muito interessante pra mim pois não tinha conhecimento prévio do framework Yii (Apesar de já estar familiarizado com outros frameworks de PHP do mercado como Laravel e Symfony) e do Angular (Já utilizei outros frameworks/libs de JS como React e Vue).

Optei por usar o Angular Material pela praticidade e agilidade.

Optei também por criar duas bibliotecas no packagist por conta de pequenos ajustes necessários devido a problemas de compatibilidade das bibliotecas de JWT disponíveis pro Yii com a versão 8.1 do PHP.

Seguem os pacotes:

- https://github.com/MatheusT45/php8.1-jwt

- https://github.com/MatheusT45/yii2-jwt-3.2

## Documentação

### Utilizando Docker

Rode as aplicações usando esse comando na raiz do projeto

```
docker compose up
```

Os próximos comandos são relacionados ao banco de dados, rode o seguinte comando para acessar o servidor do backend `server`:

```
docker exec -it server bash
```

É possível rodá-los (comandos são relacionados ao banco de dados) _localmente_ também, mas é preciso das bibliotecas do backend instaladas localmente, para isso, basta rodar o `composer install` no `/server`.

Para rodar as migrations:

```
php yii migrate --interactive=0
```

Para rodar as fixtures:

```
php yii fixture "Book, User"  --namespace='app\tests\unit\fixtures' --interactive=0
```

Após rodar as fixtures, o usuário admin será criado para acessar a plataforma de primeira.

```
username: admin
senha: admin
```

Serão criados também 20 cursos para serem exibidos.

Note que também é possível criar novos usuários na tela de cadastro.

#### Rotas da API

| Métodos       | Rotas               | Descrição                                       |
| ------------- | ------------------- | ----------------------------------------------- |
| GET           | /api/books          | Lista todos os livros;                          |
| POST          | /api/books          | Cria um novo livro;                             |
| GET           | /api/books/{id}     | Retorna os detalhes de um livro por id;         |
| PATCH and PUT | /api/books/{id}     | Atualiza um livro;                              |
| DELETE        | /api/books/{id}     | Exclui um livro;                                |
| POST          | /auth/login         | Login da aplicação;                             |
| POST          | /auth/signup        | Cadastrar na aplicação;                         |
| POST          | /auth/refresh-token | Atualiza o token JWT de acesso;                 |
| DELETE        | /auth/refresh-token | Remove o token JWT de acesso do usuário atual;  |


## Pontos futuros

- Testes unitários;
- Localização (Internacionalização);
- Visualização de livros em mosaico (galeria) com capas e mais informações;
- Confirmação de login por E-mail;
- Recuperação de senha;
- Colocar um debounce no filtro de texto do frontend, para evitar várias chamadas de uma vez;

Gostaria de agradecer a oportunidade de realizar esse desafio, aprendi muito e gostei bastante do resultado, espero que gostem também!
