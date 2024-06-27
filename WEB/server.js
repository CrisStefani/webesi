const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('¡Hola desde el servidor!');
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});