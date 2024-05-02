`use strict`;

/* Selecionando os elementos que serão manipulador */

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Detectando quando o botão de buscar CEP é acionado */
botaoBuscar.addEventListener("click", function (event) {
    /* Anula o redirecionamento padrão de recarregamento da pagina. Sempre acontece quando trabalha com <a> <form>  */
    event.preventDefault();
    /* Verificando se o cep Não TEM 8 digitos */


    if (campoCep.value.length !== 8) {
        mensagemStatus.textContent = "Digite um CEP válido";
        mensagemStatus.style.color = "red";

        /* Pare completamente a execução */
        return;
    }

    let cepInformado = campoCep.value;

    /* AJAX - Asyncronous JavaScript And XML (JavaScript assincrono e XML)
    
    Técnica de comunicação (transmissão, recebimento) de dados que permite o processamento em conjunto com APIs (Web services)
    */

    // Etapa 1: Preparar a url da API com o cep informado

    // Etapa 2: Acessar a API com a URL e aguardar o retorno dela

    // Etapa 3: Extrair os dados da resposta da API em formato JSON

    // Etapa 4: Lidar com os dados (em caso de erro ou sucesso)

});