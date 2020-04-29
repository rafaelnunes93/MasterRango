


function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}


document.querySelector(".add-ingredient").addEventListener("click", addIngredient);


// ==========================================ADICIONAR MODO DE PREPARO===============


function addpreparation() {
    const preparations = document.querySelector("#preparations");
    const fieldContainerP = document.querySelectorAll(".preparation");

  // Realiza um clone do último ingrediente adicionado
  const newFieldP = fieldContainerP[fieldContainerP.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newFieldP.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newFieldP.children[0].value = "";
  preparations.appendChild(newFieldP);
}


document.querySelector(".add-preparation").addEventListener("click", addpreparation);



const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function (event) {
  const confirmation = confirm("Deseja deletar?")
  if (!confirmation) {
    event.preventDefault()
  }
})