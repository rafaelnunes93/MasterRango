
const PhotosUpload = {
  input:"",
  preview:document.querySelector('#photos-preview'),
  uploadLimite: 6,
  files:[],

  handleFileInput(event){
    const { files: fileList } = event.target
    PhotosUpload.input = event.target
    
    if(PhotosUpload.hasLimite(event)) return

    Array.from(fileList).forEach(file => {
        const reader = new FileReader()

        PhotosUpload.files.push(file)

        reader.onload = () => {
            const image = new Image()
            image.src = String(reader.result)

           const div = PhotosUpload.getContainer(image)
           PhotosUpload.preview.appendChild(div)
        }

        reader.readAsDataURL(file)
    })   

    PhotosUpload.input.files = PhotosUpload.getAllFiles()

  },
  hasLimite(event){
    const {uploadLimite, input, preview} = PhotosUpload
    const {files: fileList} = input

    if(FileList.length > uploadLimite){
      alert(`Envie no maximo ${uploadLimite} fotos`)
      event.preventDefault()
      return true 
    }

    const photoDiv = []
    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == "photo")
      photoDiv.push(item)
    })

    const totalPhotos = fileList.length + photoDiv.length
    if(totalPhotos > uploadLimite){
      alert("Voce atingiu o limite maximo de fotos")
      event.preventDefault()
      return true
    }

    return false
  },
  getAllFiles(){
    const dataTranfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTranfer.items.add(file))

    return dataTranfer.files;

  },
  getContainer(image){
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = PhotosUpload.removePhoto;

    div.appendChild(image)

    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },

  getRemoveButton(){
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML ="close"
    return button
  },

  removePhoto(event){
    const photoDiv = event.target.parentNode  
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index,1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()
  },


  removeOldPhoto(event){
    const photoDiv = event.target.parentNode

    if(photoDiv.id){
      const removedFiles = document.querySelector('input[name="removed_files"')
      if(removedFiles){
        removedFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove()
  }
  
  }

const ImageGallery = {
  highlight: document.querySelector('.gallery .highlight img'),
  previews: document.querySelectorAll('.gallery-preview img'),

  setImage(e){


    const {target} = e

    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))

    target.classList.add('active')

    ImageGallery.highlight.src = target.src
    LightBox.image.src = target.src
  }

}


const LightBox ={
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
  open(){
    LightBox.target.style.opacity = 1
    LightBox.target.style.top = 0;
    LightBox.target.style.bottom = 0;
    LightBox.closeButton.style.top = "1%";
    
  },

  close(){
    LightBox.target.style.opacity = 0
    LightBox.target.style.top = "-100%"
    LightBox.closeButton.style.top = "0";

  }
}


  //Esconder Ingredientes e modo de Preparo

const showHides = document.getElementsByClassName('topic');

for (let showHide of showHides) {
  const buttonSpan = showHide.querySelector('span');

  buttonSpan.addEventListener('click', function() {
    if (buttonSpan.innerHTML == "ESCONDER") {
      showHide.querySelector('.topic-content').classList.add('hidden');
      buttonSpan.innerHTML = "MOSTRAR"   
    } else {
      showHide.querySelector('.topic-content').classList.remove('hidden');
      buttonSpan.innerHTML = "ESCONDER"
    }
  });
}


// ==========================================ADICIONAR Novo Ingrediente===============

const ingredients = document.querySelector("#ingredients");
const fieldContainer = document.querySelectorAll(".ingredient");
function addIngredient() {

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
const preparations = document.querySelector("#preparations");
const fieldContainerP = document.querySelectorAll(".preparation");
function addpreparation() {

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





