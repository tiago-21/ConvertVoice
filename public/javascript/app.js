
// constantes
const textarea = document.querySelector("#textarea");
const btnGravar = document.querySelector("#btnGravar");
const btnParar = document.querySelector("#btnParar");
const btnBaixar = document.querySelector("#btnBaixar");
const btnLimpar = document.querySelector("#btnLimpar");
const titulo = document.querySelector("#titulo");
const copiar = document.querySelector("#btnCopiar");

// verifica se o navegador suporta a Api    

    if(window.SpeechRecognition || window.webkitSpeechRecognition){
        alert('Seu navegador suporta a ferramenta.');
    }
    else {
        alert('Seu navegador não suporta o uso da ferramenta, tente acessar em outro.');
    }

// criando classe da Api
class speechApi {
    constructor() {
        const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechApi = new SpeechToText()
        this.output = textarea.output
        this.speechApi.continuous = true
        this.interimResults = true
        this.speechApi.lang = 'pt-BR'

        this.speechApi.onresult = e => {
            var resultIndex = e.resultIndex
            var transcript = e.results[resultIndex][0].transcript

            textarea.value += transcript
        }
    }

    start() {
        this.speechApi.start()

        const resultado = document.querySelector("#resultado");
        resultado.innerHTML = 'O reconhecimento começou!'
        resultado.style.color = 'green';
        resultado.style.transition = '0.2s';
    }

    stop() {        
        this.speechApi.stop()
        resultado.innerHTML = 'O reconhecimento parou!';
        resultado.style.color = 'red';
    }    
}

var speech = new speechApi()
// iniciando o reconhecimento
btnGravar.addEventListener('click', () => {
    btnGravar.disabled = true;
    btnParar.disabled = false;
    speech.start()
})

// parando o reconhecimento
btnParar.addEventListener('click', () => {
    btnGravar.disabled = false;
    btnParar.disabled = true;
    speech.stop()
})

// download do conteúdo
btnBaixar.addEventListener('click', () => {
    var text = textarea.value
    var filename = titulo.value + ".txt"

    if(titulo.value != '') {
        var filename = titulo.value + ".txt"
    }
    else {
        var filename = "convertvoice.txt"
    }
    download(text, filename)
})

function download(text, filename) {
    var element = document.createElement('a')

    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    element.style.display = 'none';
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

// limpeza e exclusão do conteúdo
btnLimpar.addEventListener('click', () => {
    textarea.value = ""
    btnGravar.disabled = false
    btnParar.disabled = true
    speech.stop()
})

var ongoing = false;
var recognition = null;

function verificaStatus(){
    if (ongoing == true){
        recognition.start();
    }
}

function init(){
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    var p = document.createElement('span');
    const words = document.querySelector('.words');
    words.appendChild(p);

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    
        p.textContent = transcript + ", ";
        if (e.results[0].isFinal) {
            p = document.createElement('span');
            words.appendChild(p);       
        }
        });
    recognition.addEventListener('end', verificaStatus);
    recognition.start();
}

function doStartStopCheck(){
    if(ongoing == true){ // se tiver rodando, vai interromper
        ongoing = false;
        recognition.stop();     
        document.getElementById('btn_speech').innerHTML = "<i class='fa-solid fa-play'></i> <br>" + " Iniciar";
        document.getElementById('btn_speech').style.background = 'green';
    }
    else if (recognition) { // se tiver instância SpeechRecognition, apenas reinicia
        ongoing = true;
        recognition.start();        
        document.getElementById('btn_speech').innerHTML = "<i class='fa-solid fa-stop'></i> <br>" + " Interromper";
        document.getElementById('btn_speech').style.background = 'green';
    }
    else { // se ainda não criou instância, chama a função para inicialização
        console.log("init");
        ongoing = true;
        init();    
        document.getElementById('btn_speech').innerHTML = "<i class='fa-solid fa-stop'></i> <br>" + " Interromper";
        document.getElementById('btn_speech').style.background = 'red';
    }
}

function rolaScroll(){
    const w = document.querySelector('.words');
    w.scrollTop = w.scrollHeight;
}

setInterval(rolaScroll, 1000);






