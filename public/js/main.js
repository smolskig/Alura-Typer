var tempoPadrao = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao")

$(function(){
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    inicializaMarcador();
    $("#botao-reiniciar").click(reiniciarJogo);
    atualizaPlacar();
})

function atualizaTamanhoFrase(){
    var palavra = $(".frase").text();
    var num_palavras = palavra.split(" ").length
    var tamanhoFrase = $("#tamanho-frase")

    tamanhoFrase.text(num_palavras)
}

function inicializaContador(){
    campo.on("input",function(){
        var conteudo = campo.val()
        var qtdPalavras = conteudo.split(/\S+/).length -1
        $("#contador-palavras").text(qtdPalavras)
        var qtdLetras = conteudo.length
        $("#contador-caracteres").text(qtdLetras)  
    })
}



function inicializaCronometro(){
    
    campo.one("focus",function(){
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").toggleClass("isDisabled")
        $("#botao-frase").toggleClass("isDisabled")
        var cronometroID = setInterval(function(){
            tempoRestante --;
            $("#tempo-digitacao").text(tempoRestante)

            if (tempoRestante < 1){
                clearInterval(cronometroID)
                finalizaJogo()
            }
        },1000)
    })
}
function finalizaJogo(){
    campo.attr("disabled",true)
    campo.toggleClass("campo-desativado")
    $("#botao-reiniciar").toggleClass("isDisabled")
    $("#botao-frase").toggleClass("isDisabled")
    inserePlacar()
}

function inicializaMarcador(){
    
    campo.on("input",function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);

        if (digitado == comparavel){
            campo.addClass("campo-correto")
            campo.removeClass("campo-incorreto")
        
        }
        else{
            campo.addClass("campo-incorreto")
            campo.removeClass("campo-correto")
        }
    });
}

function reiniciarJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0")
    $("#tempo-digitacao").text(tempoPadrao);
    inicializaCronometro();
    campo.removeClass("campo-desativado")
    campo.removeClass("campo-incorreto")
    campo.removeClass("campo-correto")
}


