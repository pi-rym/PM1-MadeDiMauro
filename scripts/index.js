class Activity {
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor(){
        this.activities = [];
        this.id = 0;
    }

    getAllActivities (){
        return this.activities;
    }

    createActivity (title, description, imgUrl){
        const id = this.id++
        const activity = new Activity(id, title, description, imgUrl);
        this.activities.push(activity)
    }

    deleteActivity (id){
        this.activities = this.activities.filter((activity)=>activity.id!=id)
    }
}

const repository = new Repository();

////////////////////////////////////////////////////////////////////////////////////////

const buttonAdd = document.getElementById("buttonAdd");
buttonAdd.addEventListener('click',(e)=>{
    e.preventDefault();

    //Se captura el contenido de los elementos del form
    const titleActivity = document.getElementById("titleActivity").value;
    const descriptionActivity = document.getElementById("descriptionActivity").value;
    const linkActivity = document.getElementById("linkActivity").value;
    const alertNoActivities = document.getElementById("alertNoActivities");

    if(!titleActivity || !descriptionActivity || !linkActivity){
        alert("Debes completar todos los campos del formulario");
    } else {
        alertNoActivities.innerHTML = null;
        repository.createActivity(titleActivity, descriptionActivity, linkActivity);    
        refreshCards()
    }
});

////////////////////////////////////////////////////////////////////////////////////////

function refreshCards(){
    const containerCards = document.getElementById("containerCards"); //Contenedor DIV de Cards
    containerCards.innerHTML = null;
    const activities = repository.getAllActivities();
    const listActivitiesHTML = activities.map((a) => addActivity(a));
    listActivitiesHTML.forEach((actHtml) => containerCards.appendChild(actHtml));
    console.log(activities);
}

////////////////////////////////////////////////////////////////////////////////////////

function addActivity(activity){

    //Se crea la instancia de la clase activity
    const { id, title, description, imgUrl } = activity;

    //Se crear los elementos html
    const titleHMTL = document.createElement("h3");
    const descriptionHTML = document.createElement("p");
    const imageHTML = document.createElement("img");
    const quitarHTML = document.createElement("button");
    quitarHTML.innerHTML = "Eliminar";
    quitarHTML.value = id;
    quitarHTML.addEventListener("click", deleteActivity);
    console.log(quitarHTML);
    const card = document.createElement("div");

    //Asignar valores
    titleHMTL.innerHTML = title.toUpperCase();
    descriptionHTML.innerHTML = description;
    imageHTML.src = imgUrl;

    // Asigna clases de css
    card.classList.add("card");
    quitarHTML.classList.add("buttonDelete");

    //Agregar los elementos al div de card
    card.append(titleHMTL);
    card.append(descriptionHTML);
    card.append(imageHTML);
    card.append(quitarHTML);

    return card
}

////////////////////////////////////////////////////////////////////////////////////////

function deleteActivity(e){
    const id = e.target.value;
    repository.deleteActivity(id);
    refreshCards();
}