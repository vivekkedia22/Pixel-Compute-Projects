const submit = document.querySelector("#submit-btn");
const form = document.getElementById("form");
const dialog = document.getElementById("dialog");
const closeDialogBtn = document.getElementById("close-dialog");
const invitation=document.getElementById("invitation");

submit.onclick = (event) => {
  console.log("hello");
  event.preventDefault();
  const formData = new FormData(form);
  if (!checkAllFieldsFilled(formData)) {
    dialog.showModal();
    dialog.classList.add("visible");
  } else {
    createInvitation(formData);
  }
};

closeDialogBtn.onclick = () => {
  dialog.classList.remove("visible");
  dialog.classList.add("hidden");
  dialog.close();
};

function checkAllFieldsFilled(formData) {
  for (let field of formData) {
    if (!field[1]) {
      return false;
    }
  }
  return true;
}
const createInvitation = (formData) => {
  const eventName = formData.get("eventName");
  const eventDate = formData.get("eventDate");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const description = formData.get("description");
  const location = formData.get("location");
  

  console.log(eventDate)
  console.log(startTime)
  console.log(endTime)
  form.style.display="none";
  invitation.classList.remove("hidden")
  invitation.classList.add("visible")
  const nameElement=document.querySelector("#invitation h2");
  nameElement.innerText=eventName;
  const detailsElement=document.querySelectorAll("#invitation p");
  const dateElement=detailsElement[0];
  const timeElement=detailsElement[1];
  const locationElement=detailsElement[2];
  const descriptionElement=detailsElement[3];
  dateElement.innerText=`${new Date(eventDate).toDateString()}`;
  timeElement.innerText=`${startTime} - ${endTime}`;
  locationElement.innerText=location;
  descriptionElement.innerText=description;

};
