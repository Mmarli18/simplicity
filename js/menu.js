`use strict`;

/* Selecionando o elemento que acionara a lista de links do menu */

const botaoMenu = document.querySelector("nav h2 a");

/* Selecionando a lista de links/menu */

const listaDeLinks = document.querySelector(".links-menu");

/* Monitorar o evento de click no botaoMenu */
botaoMenu.addEventListener("click", function(event){
    // preventDefault Prevenir ou anula o evento padrão de redirecionamento/recarregamento da página
event.preventDefault();

listaDeLinks.classList.toggle("aberto");

if (listaDeLinks.classList.contains("aberto")){
    botaoMenu.innerHTML = "Fechar &times;";

}else {
    botaoMenu.innerHTML = "Menu &equiv;";
}

});