
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
        document.getElementById('btn_speech').innerHTML = "<i class='fa-solid fa-play'></i>" + " Transcrever Áudio";
        document.getElementById('btn_speech').style.background = 'green';
    }
    else if (recognition) { // se tiver instância SpeechRecognition, apenas reinicia
        ongoing = true;
        recognition.start();        
        document.getElementById('btn_speech').innerHTML = "<i class='fa-solid fa-stop'></i>" + " Interromper";
        document.getElementById('btn_speech').style.background = 'red';
    }
    else { // se ainda não criou instância, chama a função para inicialização
        console.log("init");
        ongoing = true;
        init();    
        document.getElementById('btn_speech').innerHTML = "<i class='fa-solid fa-stop'></i>" + " Interromper";
        document.getElementById('btn_speech').style.background = 'red';
    }
}

function rolaScroll(){
    const w = document.querySelector('.words');
    w.scrollTop = w.scrollHeight;
}

// função de parágrafo
function paragrafo() {

    var elemento = document.querySelector('.words').value;

    if(elemento) {
        var textoAtual = elemento.innerHTML;
        var textoQuebra = textoAtual.replace(/\n/g, "br");
        elemento.innerHTML = textoQuebra;
    }
}

function apagar() {}
setInterval(rolaScroll, 1000);