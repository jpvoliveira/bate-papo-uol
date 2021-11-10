let input;
let textoEnviado;
const tiposMensagem = ['normal', 'reservada']
const nomeUser = prompt('Digite o seu nome: ')

const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages') 
promessa.then(mensagensServidor)

function mensagensServidor(resposta){
    const tpMensagem = resposta.data
    console.log(tpMensagem.length)
    let caixaMensagens = document.querySelector('ul')

    for(let i = 0; tpMensagem.length; i++){
        const mensagem = tpMensagem[i]
        // se a mensagem for do tipo status, fica com a cor padrao
        if(mensagem.type === "status"){
            const msgServidor = `<li class="msg-status">
            <span class="hora">(${mensagem.time})</span>
            <span class="msg"><strong>${mensagem.from} </strong>${mensagem.text}</span>
            </li>`
            caixaMensagens.innerHTML += msgServidor
        } 
        // se a mensagem for do tipo message, adiciona a class normnal
        if(mensagem.type === "message"){
            const msgServidor = `<li class="msg-status normal">
            <span class="hora">(${mensagem.time})</span>
            <span class="msg"><strong>${mensagem.from} </strong>${mensagem.text}</span>
            </li>`
            caixaMensagens.innerHTML += msgServidor
        }
    }
}

function enviarMensagem(){
    // Ao clicar no icon o usuario vai armazenar o texto em uma variavel
    input = document.querySelector('.caixa-texto')
    textoEnviado = input.value
    let caixaMensagens = document.querySelector('ul')
    const msgEnviada = `<li class="msg-status normal">
    <span class="hora">(03:12:45)</span>
    <span class="msg"><strong>${nomeUser+" "}</strong></span>
    <span>${textoEnviado}</span>
    </li>`
    caixaMensagens.innerHTML += msgEnviada
    input.value="Escreva aqui..."
}