const input = document.querySelector('.caixa-texto')
let textoEnviado;
// entrar na sala
const name = prompt('Digite o seu nome: ')
const promessaUser = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name})
promessaUser.then(entradaUser)
promessaUser.catch(reloadUser)


// enviar mensagem
let mensagemEnviada = {}

console.log(mensagemEnviada)
function enviarClique(){
    mensagemEnviada.text= input.value
    mensagemEnviada.type="message"
    mensagemEnviada.from=name
    mensagemEnviada.to="Todos"
    console.log("enviando clique")
    const promessaMsg = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemEnviada) 
    input.value=""
}

// function: entrar na sala
function entradaUser(resposta){
    const validaUser = resposta.status
    console.log(validaUser)
    recarregarMsg()
    
}
function reloadUser(resposta){
        location.reload()
}

// manter user online de 5 em 5 segundos
setInterval(manterOnline,5000)
function manterOnline(){
const promessaUserOn = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name}) 
console.log('online')
}

// function: recarregar de 3 em 3 segundos
setInterval(recarregarMsg, 3000)
function recarregarMsg (){
    // carregar mensagens do servidor
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages') 
    promessa.then(mensagensServidor)
}


// function: carregar mensagens do servidor
function mensagensServidor(resposta){
    const tpMensagem = resposta.data
    console.log(tpMensagem.length)
    let caixaMensagens = document.querySelector('ul')

    for(let i = 0; i<tpMensagem.length; i++){
        let mensagem = tpMensagem[i]
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
        let elementoQueQueroQueApareca = caixaMensagens.querySelector('li:last-child');
        elementoQueQueroQueApareca.scrollIntoView();
    }
}