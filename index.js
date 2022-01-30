const quantidadeDeBilhetes = 1000
const numerosDiv = document.querySelector("#numeros")


const bilhetes = []

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

const pegarChave = numeroBilhete => {
  const bilheteFiltrado = bilhetes.filter(bl => bl.numero === parseInt(numeroBilhete))[0]
  const chaveDoBilhete = bilhetes.indexOf(bilheteFiltrado)
  return chaveDoBilhete
}

const reservar = numeroBilhete => {
  bilhetes[pegarChave(numeroBilhete)].status = "reservado"
  montaTela()
  atualizaInfoBox()
}

const vender = numeroBilhete => {
  bilhetes[pegarChave(numeroBilhete)].status = "vendido"
  montaTela()
  atualizaInfoBox()
}

const mudarStatus = numeroBilhete => {
  const status = bilhetes[pegarChave(numeroBilhete)].status

  if (status === "disponivel") {
    reservar(numeroBilhete)
  }

  if (status === "reservado") {
    vender(numeroBilhete)
  }
}

const init = async() => {
  const listaDeBilhetes = (await axios.get("https://fake-rifa.deta.dev/bilhetes")).data.bilhetes

  bilhetes.push(...listaDeBilhetes)
  montaTela()
  atualizaInfoBox()
}

init()

numerosDiv.addEventListener("click", e => {
  if(e.target.id.includes("bilhete")) {
    const numeroBilhete = e.target.id.split("-")[1]
    mudarStatus(numeroBilhete)
  }
})
