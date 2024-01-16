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

- Pontos futuros
  - confirma'c~ao de login por e-mail
  - esqueceu sua senha
  - server side pagination
  - filtro de livros no frontend (atualmente so e poss'ivel filtrar pelo backend)
  - automatizar processo de instala'c~ao de depen^dencias e migrations do banco
