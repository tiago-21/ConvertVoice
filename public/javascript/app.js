// constantes
const textarea = document.querySelector("#textarea");
const btnGravar = document.querySelector("#btnGravar");
const btnParar = document.querySelector("#btnParar");
const btnBaixar = document.querySelector("#btnBaixar");
const btnLimpar = document.querySelector("#btnLimpar");
const titulo = document.querySelector("#titulo");
const copiar = document.querySelector("#btnCopiar");
const atualizar = document.querySelector('#btnAtualizar');
btnParar.disabled = true;

// verifica se o navegador tem compatibilidade e suporta a Api
const suporte = window.SpeechRecognition || window.webkitSpeechRecognition

    if(suporte){
        // ok. Irá executar a aplicação
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showCloseButton: true,
            text: 'Seu navegador não tem suporte para uso da ferramenta! Por favor acesse em outro.',
            // footer: '<a style="color: black" href="https://www.google.com/">Chrome</a>'            
        })
    }

// criando classe da Api
class speechApi {
    constructor() {
        const SpeechToText = suporte
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

        resultado.innerHTML = 'Reconhecimento iniciado!'
        resultado.style.textAlign = 'center'
        resultado.style.marginBottom = '20px'
        resultado.style.color = 'green';
        resultado.style.fontWeight = 'bold'                        
    }

    stop() {        
        this.speechApi.stop()
        resultado.innerHTML = 'Reconhecimento encerrado!';
        resultado.style.textAlign = 'center'
        resultado.style.marginBottom = '20px'
        resultado.style.color = 'red'
        resultado.style.fontWeight = 'bold'

        setTimeout(() => {                        
            resultado.textContent = ''
        }, 1200);
    }
}

// iniciando o reconhecimento
var speech = new speechApi()
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

    if(textarea.value != '' && titulo.value == '') {
        var filename = "convertvoice.txt"        
        download(text, filename)
    }

    else if(textarea.value != '' && titulo.value != '') {
        var filename = titulo.value + ".txt"
        download(text, filename)
    }

    else {
        alert("Preencha com conteúdo para baixar!")
    }
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
    Swal.fire({        
        icon: 'question',
        title: 'Deseja limpar o conteúdo?',
        text: 'Se você confirmar todo conteúdo será perdido.',
        confirmButtonText: 'Sim',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showCloseButton: true,
    }).then((result) => {
        if(result.isConfirmed) {            
            if(textarea.value != '') {
                textarea.value = ""
                btnGravar.disabled = false

                Swal.fire({            
                    title: "Conteúdo limpo!",        
                    icon: 'success',
                    showCloseButton: true,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    title: "O conteúdo está vazio!",
                    icon: 'info',
                    showCloseButton: true,
                    timer: 1500                    
                });
            }        
        }
    })

    // btnParar.disabled = true
    // speech.stop()
})


// copiar texto
copiar.addEventListener('click', () => {
    if(textarea.value != '') {
        let texto = document.querySelector("#textarea")
        texto.select()
        texto.setSelectionRange(0, 99999)
        document.execCommand("copy")

        Swal.fire({
            icon: 'success',
            title: 'Texto copiado!',            
            text: 'Conteúdo copiado!',
            showCloseButton: true,
            timer: 2000
        });
    }

    else {
        Swal.fire({
            icon: 'info',
            title: 'Nenhum conteúdo para copiar!',
            text: 'Você precisa ter algum conteúdo para poder copiar.',
            showCloseButton: true
        })        
    }    
})

atualizar.addEventListener('click', () => {
    Swal.fire({
        icon: 'warning',
        title: 'Deseja atualizar a página?',
        text: 'A atualização recarregará a página e todo conteúdo será perdido.',
        confirmButtonText: 'Sim',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        cancelButtonColor: '#d33',
    }).then((result) => {
        if(result.isConfirmed) {
            window.location.reload();
        }
    })
    
    // criar if e else perguntando se o usuário atualizar a página, o conteúdo será perdido.
    // fazer a mesma coisa na função limpar.
})

textarea.style.height = '200px'
textarea.style.height = textarea.scrollHeight + 'px'

// btnGravar.addEventListener('mouseover', passaMouse);
// btnGravar.addEventListener('mouseout', tiraMouse)

// function passaMouse() {    
//     btnGravar.style.animation = 'moveToRight 10s ease-in-out';
//     btnGravar.style.delay = '10000ms';    
//     btnGravar.innerHTML = '<i class="fa-solid fa-microphone"></i> Iniciar';
// }

// function tiraMouse() {    
//     btnGravar.innerHTML = '<i class="fa-solid fa-microphone"></i>'        
    
// }