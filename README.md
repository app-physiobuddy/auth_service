# AuthService
Microservice for authentication

## Iniciar o serviço para desenvolvimento
Depois de fazer git clone, criar um docker-compose com:
```docker-compose up --build```
Isto vai ligar a pasta atual ./app à pasta /app do container e iniciar o servidor em desenvolvimento.
Os logs do servidor são visiveis atraves dos logs no dockerhub no container.

Não é necessário fazer npm install, as dependencias já estão instaladas no container,
mas têm de usar a consola do container para usar o npm (dockerhub/container/exec)

Todo o que escreverem é automagicamente passado para o container.

A base de dados é iniciada automaticamente com uma table users (caso nao exista) e cria um volume gerido pelo docker;
A BD persiste localmente, se quiserem reiniciar a BD é só apagar o volume do docker.

## Actions
Estão definidas duas actions:
1. Testes: no pull e push
2. Push Docker Image: Build e publica a base de dados e o servidor para o dockerhub

## Postman Collection
Está disponível uma coleção do postman com a API do serviço. É preciso ter em atenção que poderá ser necessário mudar a porta.

## K8S
A pasta K8S contém os ficheiros para correr a aplicação com o minikube.