const addbtn = document.querySelector("#addbtn");

const main = document.querySelector(".main");

//Saving the notes feature
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    //storing the notes data in local storage.
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

addbtn.addEventListener("click", function () {
  addNote();
});

//creating the Note by  Dom
const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
        <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;

  // delete feature
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  // save feature & saveNotes function created on the top.
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });
  main.appendChild(note);
  saveNotes();
};

//when user visit the page then notes will be displayed to user
(function () {
  const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
  if (localStorageNotes === null) {
    addNote();
  } else {
    localStorageNotes.forEach((localStorageNotes) => {
      addNote(localStorageNotes);
    });
  }
})();
