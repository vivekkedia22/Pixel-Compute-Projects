 const addNoteBtn = document.getElementById("add-note");
      const noteInput = document.getElementById("note-desc-inp");
      const noteCard = document.querySelector(".note-card");
      const cardContainer = document.getElementById("cards-container");
      const closeButtons = document.getElementsByClassName("delete-note");
      for (let closeButton of closeButtons) {
        closeButton.onclick = () => {
          console.log("pressed on the close");
          const parentCard = closeButton.parentElement;
          parentCard.remove();
        };
      }
      const createNote = (text) => {
        const newNote = noteCard.cloneNode(true);
        const childrens = newNote.children;
        const button = childrens[0];
        const desc = childrens[1];
        button.onclick = () => {
          const parentCard = button.parentElement;
          parentCard.remove();
        };
        desc.innerText = text;
        cardContainer.append(newNote);
      };
      addNoteBtn.onclick = () => {
        console.log("asdfas");
        if (noteInput.value !== "") {
          console.log(noteInput.value);
          createNote(noteInput.value);
          noteInput.value = "";
        }
      };