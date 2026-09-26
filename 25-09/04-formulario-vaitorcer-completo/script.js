// ============================================================
// EXERCÍCIO 4 — Formulário completo da VaiTorcer
// Junta as 3 camadas de validação vistas hoje:
//   Camada 1 (nativa do HTML)  -> cuida sozinha de nome, e-mail,
//                                  telefone, cidade e datas
//   Camada 2 (JavaScript)      -> cuida da regra que falta: "pacote" obrigatório
//   Camada 3 (classList)       -> liga/desliga text-red e text-green na mensagem
// ============================================================

const formulario = document.getElementById("form-orcamento");
const mensagem = document.getElementById("mensagem");
const resumo = document.getElementById("resumo");

formulario.addEventListener("submit", (evento) => {
  // 1) Se esta função está rodando, é porque nome, e-mail, telefone,
  //    cidade e as duas datas JÁ passaram pelo "required" do HTML —
  //    a Camada 1 (nativa) trabalhou sozinha, antes mesmo de chegarmos
  //    aqui. Não precisamos repetir essa checagem em JavaScript.
  evento.preventDefault();

  // 2) Camada 2: buscamos o radio marcado do grupo "pacote".
  const pacoteMarcado = document.querySelector('input[name="pacote"]:checked');

  // 3) Se ninguém marcou nenhum pacote, pacoteMarcado é null — e é
  //    exatamente essa a regra que o HTML não sabia validar sozinho.
  if (!pacoteMarcado) {
    // ---- RAMO DE ERRO ----
    mensagem.textContent = "Escolha um tipo de pacote antes de enviar.";

    // Camada 3: liga a classe vermelha e desliga a verde, caso um
    // envio válido anterior tenha deixado a mensagem verde ligada.
    mensagem.classList.add("text-red");
    mensagem.classList.remove("text-green");

    // Limpamos o resumo antigo, caso um envio válido anterior tenha deixado algo escrito
    resumo.textContent = "";

    // Paramos aqui: não queremos montar um resumo com dados incompletos
    return;
  }

  // 4) Chegamos até aqui só quando TUDO está válido: os campos com
  //    "required" (Camada 1) e um pacote escolhido (Camada 2).
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const cidade = document.getElementById("cidade").value;
  const dataIda = document.getElementById("data-ida").value;
  const dataVolta = document.getElementById("data-volta").value;
  const observacoes = document.getElementById("observacoes").value;

  // Cada checkbox é independente e é lido com ".checked" (true ou false).
  const ingresso = document.getElementById("ingresso").checked;
  const seguro = document.getElementById("seguro").checked;
  const traslado = document.getElementById("traslado").checked;

  const extras = [];
  if (ingresso) extras.push("Ingresso para o jogo");
  if (seguro) extras.push("Seguro viagem");
  if (traslado) extras.push("Traslado do aeroporto");

  const textoExtras = extras.length > 0 ? extras.join(", ") : "Nenhum extra selecionado";

  // ---- RAMO DE SUCESSO ----
  // Camada 3: mesma simetria do ramo de erro, só que invertida — liga
  // a classe deste ramo (verde) e desliga a classe do outro ramo (vermelha).
  mensagem.textContent = "Orçamento enviado com sucesso!";
  mensagem.classList.add("text-green");
  mensagem.classList.remove("text-red");

  // 5) Por fim, montamos o resumo inteiro do pedido na tela.
  resumo.innerHTML =
    "<h2>Resumo do seu pacote</h2>" +
    "<strong>Nome:</strong> " + nome + "<br>" +
    "<strong>E-mail:</strong> " + email + "<br>" +
    "<strong>Telefone:</strong> " + telefone + "<br>" +
    "<strong>Cidade-sede:</strong> " + cidade + "<br>" +
    "<strong>Data de ida:</strong> " + dataIda + "<br>" +
    "<strong>Data de volta:</strong> " + dataVolta + "<br>" +
    "<strong>Tipo de pacote:</strong> " + pacoteMarcado.value + "<br>" +
    "<strong>Extras:</strong> " + textoExtras + "<br>" +
    "<strong>Observações:</strong> " + observacoes;
});
