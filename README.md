# book-list

## Documenta'c~ao

Rode as aplica'c~oes usando docker

```
docker compose up
```

Ap'os

Acesse o container do backend

```
docker exec -it server bash
```

Instale as depend^encias do projeto dentro do container `server`

```
composer install
```

Rode as migrations do backend dentro do container `server`

```
php yii migrate
```

Rode as fixtures dentro do container `server` para popular o banco

```
php yii fixture "Book, User"  --namespace='app\tests\unit\fixtures'
```

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

- confirma'c~ao de login por e-mail
- esqueceu sua senha
- server side pagination
- automatizar processo de instala'c~ao de depen^dencias e migrations do banco
- Visualioza'c~ao de livros em mosaico (galeria) com capa dos livros
- testes unit'arios
- colocar um debounce no filtro de texto no frontend, para evitar v'arias chamadas de uma vez
