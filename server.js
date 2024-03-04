const express = require('express');
const path = require('path');
const http = require('http');
const {usuarioEntrarSala, getUsuariosSala, mensagemFormatada, getUsuario, usuarioSairSala} = require('./usuarios');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const PORT = 4000;
app.use(express.static(path.join(__dirname, 'public')));
const io = socketIO(server);
const nomeSala = 'sala-escolaDevs';


/*Socket.io*/

io.on('connection', socket => {
    socket.on('entrarSala', ({usuarionome, meuid}) => {
        const usuario = usuarioEntrarSala(socket.id, usuarionome, nomeSala, meuid);
        socket.join(nomeSala);

        socket.broadcast.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome));
        io.to(usuario.sala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getUsuariosSala()});
    });

    socket.on('mensagemChat', mensagem => {
        const usuario = getUsuario(socket.id);
        io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, mensagem, usuario.meuid));
    });

    socket.on('sairSala', () => {
        const usuario = usuarioSairSala(socket.id);

        if(usuario) {
            io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, 'saiu da sala', usuario.id));
            io.to(nomeSala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getUsuariosSala()});
        }
    })
});

server.listen(PORT, () => console.log("Servidor online na porta " + PORT));