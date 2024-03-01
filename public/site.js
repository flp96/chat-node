const inputTexto = document.getElementById('enviarMensagem');


inputTexto.addEventListener('keyup', function(e) {
    var key = e.key === 'Enter';

    if(key && this.value) {

        adicionarNovaMensagem(this.value);
        this.value = '';


    }
});

function criarElementoHtml(nomeElemento, classeElemento){
    var elemento = document.createElement(nomeElemento);

    for(var classe of classeElemento) {
        elemento.classList.add(classe);
    }

    return elemento;
}

function realizarScrollChat() {
    var elemento = document.getElementById('chat');
    elemento.scrollTop = elemento.scrollHeight;
}

function adicionarNovaMensagem(mensagem) {
    var quadroMensagens = document.getElementById('quadro-mensagens');
    var li = criarElementoHtml('li', ['clearfix']);
    var span = criarElementoHtml('span', ['message-data-time']);
    var divMensagem = criarElementoHtml('div', ['message', 'my-message']);
    var divDetalhes = criarElementoHtml('div', ['message-data']);

    span.innerHTML = "Nome Teste, 12 Jun 2022 - 21:15";
    divMensagem.innerHTML = mensagem;

    divDetalhes.appendChild(span);
    li.appendChild(divDetalhes);
    li.appendChild(divMensagem);
    quadroMensagens.appendChild(li);
    realizarScrollChat();
}