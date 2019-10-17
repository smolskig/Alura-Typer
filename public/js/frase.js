$("#botao-frase").click(buscaFrase);
$("#botao-fraseId").click(fraseRequisito);

function buscaFrase(){
    $("#spinner").show()

    $.get("http://localhost:3000/frases",trocaFrase)
    .fail(function(){
        $("#erro").show()
        setTimeout(function(){
            $("#erro").hide();
        },1500)
    })
    .always(function(){
        $("#spinner").hide()
    });
}

function trocaFrase(data){

    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();

    var tempoDigitacao = $("#tempo-digitacao");
    atualizaTempoInicial(data[numeroAleatorio].tempo);

    reiniciarJogo();
}

function atualizaTempoInicial(tempo){
    tempoPadrao = tempo;
    $("#tempo-digitacao").text(tempo)
}

function fraseRequisito(){
    $("#spinner").show()
    fraseId = $("#campoId").val() -1
    data = { id: fraseId}
    console.log(data);
    
    $.get("http://localhost:3000/frases",data,retornaFrase)
    .fail(function(){
        $("#erro").show()
        setTimeout(function(){
            $("#erro").hide();
        },1500)
    })
    .always(function(){
        $("#spinner").hide()
    });

} 

function retornaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}