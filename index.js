const quantidadeDeBilhetes = 1000
const numerosDiv = document.querySelector("#numeros")

const bilhetes = []

const varianteDeStatus = [
  "disponivel",
  "reservado",
  "vendido"
]

const sorteio = limite => Math.floor(Math.random() * limite)

const geraBilhetes = () => {
  for (let i = 0; i < quantidadeDeBilhetes; i++) {
    const bilhete = {
      numero: i + 1,
      status: varianteDeStatus[sorteio(varianteDeStatus.length)]
    }
    bilhetes.push(bilhete)
  }
}

const montaTela = () => {
  numerosDiv.innerHTML = ""

  for (const bilhete of bilhetes) {
    const element = document.createElement("div")
    element.innerText = bilhete.numero
    //element.innerHTML = `<p class='numeral'>${bilhete.numero}</p>`
    element.setAttribute("id", `bilhete-${bilhete.numero}`)
    element.setAttribute("class", "bilhete")
    element.classList.add("numeral")
    element.classList.add(bilhete.status)
    numerosDiv.appendChild(element)
  }  
}

const atualizaInfoBox = () => {
  const disponiveis = bilhetes.filter(bilhete => bilhete.status === "disponivel")
  const reservados = bilhetes.filter(bilhete => bilhete.status === "reservado")
  const vendidos = bilhetes.filter(bilhete => bilhete.status === "vendido")

  const infoTextDisponiveis = document.querySelector("#info-text-disponivel")
  const infoTextReservados = document.querySelector("#info-text-reservado")
  const infoTextVendidos = document.querySelector("#info-text-vendido")

  infoTextDisponiveis.innerText = disponiveis.length
  infoTextReservados.innerText = reservados.length
  infoTextVendidos.innerText = vendidos.length
}

const reservar = numeroBilhete => {
  bilhetes[numeroBilhete - 1].status = "reservado"
  montaTela()
  atualizaInfoBox()
}

const vender = numeroBilhete => {
  bilhetes[numeroBilhete - 1].status = "vendido"
  montaTela()
  atualizaInfoBox()
}

const mudarStatus = numeroBilhete => {
  const status = bilhetes[numeroBilhete - 1].status

  if (status === "disponivel") {
    reservar(numeroBilhete)
  }

  if (status === "reservado") {
    vender(numeroBilhete)
  }
}

geraBilhetes()
montaTela()
atualizaInfoBox()

numerosDiv.addEventListener("click", e => {
  if(e.target.id.includes("bilhete")) {
    const numeroBilhete = e.target.id.split("-")[1]
    mudarStatus(numeroBilhete)
  }
})
