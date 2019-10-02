var palavra = $(".frase").text();
var num_palavras = palavra.split(" ").length

var tamanhoFrase = $("#tamanho-frase")
tamanhoFrase.text(num_palavras)