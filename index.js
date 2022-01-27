const quantidadeDeBilhetes = 1000
const numerosDiv = document.querySelector("#numeros")

const bilhetes = []

const geraBilhetes = () => {
  for (let i = 0; i < quantidadeDeBilhetes; i++) {
    const bilhete = {
      numero: i + 1,
      status: "disponivel"
    }
    bilhetes.push(bilhete)
  }
}

const montaTela = () => {
  numerosDiv.innerHTML = ""

  for (const bilhete of bilhetes) {
    const element = document.createElement("div")
    //element.innerText = bilhete.numero
    element.innerHTML = `<p class='numeral'>${bilhete.numero}</p>`
    element.setAttribute("id", `bilhete-${bilhete.numero}`)
    element.setAttribute("class", "bilhete")
    element.classList.add(bilhete.status)
    numerosDiv.appendChild(element)
  }  
}

const reservar = numeroBilhete => {
  bilhetes[numeroBilhete - 1].status = "reservado"
  montaTela()
}

geraBilhetes()
montaTela()

numerosDiv.addEventListener("click", e => {
  if(e.target.id.includes("bilhete")) {
    const numeroBilhete = e.target.id.split("-")[1]
    reservar(numeroBilhete)
  }
})
