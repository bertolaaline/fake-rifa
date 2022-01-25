const quantidadeDeBilhetes = 1000
const numerosDiv = document.querySelector("#numeros")

for (let i = 0; i < quantidadeDeBilhetes; i++) {
  const element = document.createElement("div")
  element.innerText = i + 1
  element.setAttribute("class", "bilhete")
  numerosDiv.appendChild(element)
}