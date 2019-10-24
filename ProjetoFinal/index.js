const express = require('express')
const app = express() //chama a função do modulo express que foi declarado a cima

app.get('/', function(req, res){ //criação de rotas/caminhos para a aplicação
	res.send('<h1>Seja bem-vindo ao meu app! Utilizando o nodemon!</h1>')
})

app.get('/sobre', function(req, res){ //criação de rotas/caminhos 
	res.send('Minha página sobre') //pode mandar mensagem,arquivos,etc
})

app.get('/blog', function(req, res){ //criação de rotas/caminhos
	res.send('Bem-vindo ao meu blog')
})

//aula 8 - Parâmetros (valor dinâmico) => /: cria um parâmetro
//req - recebe dados de uma requisição
//só pode usar o send uma vez dentro de uma function em uma rota

app.get('/ola/:cargo/:nome/:cor', function(req, res){ //cria um parâmetro chamado nome
	res.send('<h1>Olá '+req.params.nome+'</h1>'+'<h2>Seu cargo é: '+req.params.cargo+'</h2>'+'<h3>Você escolheu a cor: '+req.params.cor+'</h3>')
	//req.params chama os parâmetros passados 
})


app.get('/bikeme', function(req, res){
	res.sendfile('home.html')
})

app.listen(8081, function(){
	console.log('Servidor rodando na url http://localhost:8081')
}) //abre o servidor no express, tem q ser a última