`use strict`;

/* Selecionando os elementos que serão manipulador */

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const campoTelefone = formulario.querySelector("#telefone");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Seleção dos campos (via jQuery)e ativação das máscaras via jQuery */
$(campoCep).mask("00000-000"); 
$(campoTelefone).mask("(00) 0000-0000");

/* Detectando quando o botão de buscar CEP é acionado */
botaoBuscar.addEventListener("click", async function (event) {
    /* Anula o redirecionamento padrão de recarregamento da pagina. Sempre acontece quando trabalha com <a> <form>  */
    event.preventDefault();
    /* Verificando se o cep Não TEM 9 digitos */


    if (campoCep.value.length !== 9) {
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
    let url = `https://viacep.com.br/ws/${cepInformado}/json/`;

    // Etapa 2: Acessar a API com a URL e aguardar o retorno dela
    const resposta = await fetch(url);
   
    // Etapa 3: Extrair os dados da resposta da API em formato JSON
    const dados = await resposta.json();

    // Etapa 4: Lidar com os dados (em caso de erro ou sucesso)
    /* Se existir a string erro no objeto dados */
    if("erro" in dados ){
        mensagemStatus.textContent = "CEP inexistente!";
        mensagemStatus.style.color = "red";
    } else { 
        // Senão o CEP existe
        mensagemStatus.textContent = "CEP encontrado!";
        mensagemStatus.style.color = "blue";

        // Tornando os campos restantes visiveis ao usuario
        const camposRestantes = formulario.querySelectorAll(`.campos-restantes`);
    /* Removendo a classe via loop (Isso fará com que os campos aparecerem novamente)*/
        for (const campo of camposRestantes) {
            campo.classList.remove("campos-restantes");
        }
        // Atribuindo os dados a cada grupo
           campoEndereco.value = dados.logradouro;
           campoBairro.value = dados.bairro;
           campoCidade.value = dados.localidade;
           campoEstado.value = dados.uf; 
    }
});


/* Script do Formspree */
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status-do-envio");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: formulario.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Mensagem enviada com SUCESSO!";
          formulario.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Ops! Ocorreu um problema ao enviar seu formulário"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário"
      });
    }
    formulario.addEventListener("submit", handleSubmit)