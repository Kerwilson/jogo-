let listaDeNumerosSorteado = [];
let numeroLimite = 10;
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'escolha um numero entre 1 e 10';
//para sustituir esto podemos fazer .
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); 
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "jogo do numero secreto");
  exibirTextoNaTela("p", "escolha um numero entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `voce descobriu o numero secreto! com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "o numero secreto e menor");
    } else {
      exibirTextoNaTela("p", "o numero secreto e maior");
    }
  }
  tentativas++;
  limparcampo();
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteado.length

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteado = [];
  }
  
  
  if (listaDeNumerosSorteado.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteado.push(numeroEscolhido);
    console.log(listaDeNumerosSorteado)
    return numeroEscolhido
  }
}

function limparcampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparcampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
