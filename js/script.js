const addNote = document.querySelector('#add-note');//Botão de para adicionar nota
const closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
const modal = document.querySelector('#modal'); //Modal para edição das notas
const modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
const notes = document.querySelector('#notes');//Lista divs com dados das notas
const btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
const btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.


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

    let notes = loadNotes(); //let pq muda o valor, o const faz com que o valor fique sempre igual.
    note.lastTime = new Date().getTime();

    if(note.id.length>0){
        //?
    }else{
        note.id = new Date().getTime();
    }
    notes.push(note);
    
    notes = JSON.stringify(notes);

    localStorage.setItem('notes',notes);
    console.log(notes);
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


