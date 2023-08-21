const quiz = document.querySelector(".quiz")
const pergunta = quiz.querySelector("h1")
const alternativas = quiz.querySelector(".alternativas")
const acerto = quiz.querySelector("#acerto")
const erro = quiz.querySelector("#erro")

void async function () {
  const requisicao = await fetch("quiz.json")
  const perguntas = await requisicao.json()

  let numPerguntaAtual = 0
  let perguntaAtual
  let acertos = 0
  let erros = 0

  function rederizaPergunta() {
    perguntaAtual = perguntas[numPerguntaAtual]
    pergunta.textContent = perguntaAtual.pergunta
    alternativas.innerHTML = ""
    perguntaAtual.alternativas.forEach(alt => alternativas.innerHTML += `
    <button class="button">
      <strong>Linus</strong>
      ${alt}
    </button>
  `)
  }

  alternativas.addEventListener("click", evt => {
    if (evt.target.classList.contains("alternativas"))
      return
    
    const bt = evt.target.closest("button")
    
    if (!bt)
      return

    const arrAlts = [...alternativas.children]
    const idxClicado = arrAlts.indexOf(bt)
    if (idxClicado === perguntaAtual.resposta) {
      numPerguntaAtual += 1
      acertos += 1
      acerto.innerHTML = `ACERTOS: ${acertos}`
      if (numPerguntaAtual === perguntas.length) {
        quiz.innerHTML = `ACABOU! Você acertou ${acertos} e errou ${erros}`
        return
      }
      rederizaPergunta()
      return
    }

    erros += 1
    alert("ERROOOOU")
    erro.innerHTML = `ERROS: ${erros}`
  })

  rederizaPergunta()
}();