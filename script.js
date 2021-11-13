const input = document.querySelector('.caixa-texto')
let textoEnviado
let name 
let dataTempo
// entrar na sala
function inicioSite() {
    name = document.querySelector('.caixa-texto-user').value
    console.log(name)
    const promessaUser = axios.post(
      'https://mock-api.driven.com.br/api/v4/uol/participants',
      { name }
    )
    promessaUser.then(entradaUser)
    promessaUser.catch(reloadUser)
}

// enviar mensagem
let mensagemEnviada = {}

function enviarClique() {
  mensagemEnviada.text = input.value
  mensagemEnviada.type = 'message'
  mensagemEnviada.from = name
  mensagemEnviada.to = 'Todos'
  const promessaMsg = axios.post(
    'https://mock-api.driven.com.br/api/v4/uol/messages',
    mensagemEnviada
  )
  input.value = ''
  recarregarMsg()
}

// function: entrar na sala
function entradaUser(resposta) {
  const removeFundo = document.querySelector('.area-login')
  removeFundo.classList.add('display-none')
  
  const validaUser = resposta.status
  console.log(validaUser)
  setInterval(manterOnline, 5000)
  recarregarMsg()
  setInterval(recarregarMsg, 3000)
}
function reloadUser(resposta) {
  location.reload()
}

// manter user online de 5 em 5 segundos

function manterOnline() {
  const promessaUserOn = axios.post(
    'https://mock-api.driven.com.br/api/v4/uol/status',
    { name }
  )
  console.log('online')
}

// function: recarregar de 3 em 3 segundos

function recarregarMsg() {
  // carregar mensagens do servidor
  const promessa = axios.get(
    'https://mock-api.driven.com.br/api/v4/uol/messages'
  )
  promessa.then(mensagensServidor)
}

// function: carregar mensagens do servidor
function mensagensServidor(resposta) {
  console.log("Lendo msg")
  const tpMensagem = resposta.data
  if (dataTempo!==tpMensagem[tpMensagem.length-1].time) {
      console.log('FEURR')
      let caixaMensagens = document.querySelector('ul')
      let itens = document.querySelectorAll('li')
      if (itens.length>0){
          caixaMensagens.innerHTML = ''
        }
        let todasAsMensagens = ''
        for (let i = 0; i < tpMensagem.length; i++) {
            let mensagem = tpMensagem[i]
    // se a mensagem for do tipo status, fica com a cor padrao
    if (mensagem.type === 'status') {
        caixaMensagens.innerHTML += `<li class="msg-status">
        <span class="hora">(${mensagem.time})</span>
        <span class="msg"><strong>${mensagem.from} </strong>${mensagem.text}</span>
        </li>`
        //   todasAsMensagens += msgServidor
    }
    // se a mensagem for do tipo message, adiciona a class normnal
    if (mensagem.type === 'message') {
        caixaMensagens.innerHTML += `<li class="msg-status normal">
            <span class="hora">(${mensagem.time})</span>
            <span class="msg"><strong>${mensagem.from} </strong>${mensagem.text}</span>
            </li>`
    //   todasAsMensagens += msgServidor
}
}
dataTempo=tpMensagem[tpMensagem.length-1].time
console.log("carregou")
//   caixaMensagens.innerHTML += todasAsMensagens
let elementoQueQueroQueApareca = caixaMensagens.querySelector('li:last-child')
elementoQueQueroQueApareca.scrollIntoView()
}
}