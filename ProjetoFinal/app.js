var http = require('http')

http.createServer(function(req, res){
	res.end('Hello World! Welcome to my website')
}).listen(8081) //faz o node criar um server e o listen determina em qual porta você quer abrir o server

console.log('O servidor rodando!')

//usar localhost:<porta do servidor> no navegador para abrir o server