const addNote = document.querySelector('#add-note');//Botão de para adicionar nota
const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
const modal = document.querySelector('#modal'); //Modal para edição das notas
const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
const notes = document.querySelector('#notes');//Lista divs com dados das notas
const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.
const excluirNote = document.querySelector("#excluir-note");
const editNote = document.querySelector("#edit-note");

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Botão abrindo!");
    notes.style.display='none';
    modal.style.display='block';
    addNote.style.display='none';
});

btnCloseNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Botão fechando!");
    notes.style.display="flex";
    modal.style.display="none";
    addNote.style.display='block';

    listNotes();
});

btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = {id: document.querySelector("#input-id").value,
                title:document.querySelector("#input-title").value,
                content:document.querySelector("#input-content").value,
    }

    saveNote(data);
});



const saveNote = (note) => {
    console.log(note);
    let notes = loadNotes();
    note.lastTime = new Date().getTime();
    // console.log(note.lastTime);
    if(note.id.length > 0){
      
        notes.forEach((item, i) => {
            note.id=parseInt(note.id);
            if(item.id == note.id){
                console.log("#note");
                notes[i] = note;

            }
        })

    }else{
        note.id = new Date().getTime();
        document.querySelector('#input-id').value = note.id;
        notes.push(note);
    }
    console.log(notes);
    notes = JSON.stringify(notes);
    // console.log(notes);
    localStorage.setItem('notes', notes);
};


const loadNotes = () =>{
    let notes = localStorage.getItem('notes');

    if(!notes){
        notes=[];
    }else{
        notes = JSON.parse(notes);
    }
    return notes;
};

const listNotes = () =>{
    let listNotes = localStorage.getItem('notes');
    listNotes = JSON.parse(listNotes);
    notes.innerHTML= "";
    listNotes.forEach((item) => {
        console.log();
        const divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '18rem';
        const divCardBody = document.createElement('div');
        divCardBody.className ='card-body';
        const h1 = document.createElement('h1');
        h1.innerText = item.title;
        const pContent = document.createElement('p');
        pContent.innerText = item.content;
        const pLastTime = document.createElement('p');
        let lastTime = new Date(item.lastTime).toLocaleDateString('pt-BR');
        pLastTime.innerText = "última alteração : "+lastTime;

        divCardBody.appendChild(h1);
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);
        divCard.appendChild(divCardBody);
        notes.appendChild(divCard);

        divCard.addEventListener("click", (evt) => {
            evt.preventDefault();
            showNote(item);
        })
    });

    

}

const showNote = (note) =>{
    notes.style.display='none';
    modalView.style.display='block';
    document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"<h1>"; 
    document.querySelector('#content-note')
    .appendChild(document.createElement('p')
    .appendChild(document.createTextNode(note.content)));
    document.querySelector('#content-note')
    .appendChild(document.createElement('p')
    .appendChild(document.createTextNode(
        new Date(note.lastTime).toLocaleDateString('pt-BR')
    )));

    editNote.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log("Botão abrindo!");
        modal.style.display='block';
        modalView.style.display='none';
        document.querySelector('#input-id').value = note.id;
        document.querySelector('#input-title').value = note.title;
        document.querySelector('#input-content').value = note.content;
        listNotes();
    });
}
    listNotes(); 




