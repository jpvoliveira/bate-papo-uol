let input;
let textoEnviado;
const tiposMensagem = ['normal', 'reservada']
const nomeUser = prompt('Digite o seu nome: ')



function enviarMensagem(){
    // Ao clicar no icon o usuario vai armazenar o texto em uma variavel
    input = document.querySelector('.caixa-texto')
    textoEnviado = input.value
    console.log(input.value)

    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages') 
    promessa.then(editarMensagem())

    input.value="Escreva aqui..."
}

function editarMensagem(resposta){
    let caixaMensagens = document.querySelector('nav')
    const msgEnviada = `<div class="msg-status">
    <p class="hora">(03:12:45)</p>
    <p class="msg"><span>${nomeUser+" "}</span>${textoEnviado}</p>
    </div>`
    caixaMensagens.innerHTML = msgEnviada + caixaMensagens.innerHTML
}