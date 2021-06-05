fetch("/protected/user-details")
  .then((resp) => resp.json())
  .then((response) => {
    document.getElementById(
      "namesetting"
    ).innerHTML = `<strong>${response.name}</strong>`;
    document.getElementById("profile-picture").src = response.avatarLink;
  });

const profile = document.getElementById("profile");
const sticky = profile.offsetTop;

//sidebar scroll position fix code
window.onscroll = function () {
  if (window.pageYOffset >= sticky) {
    profile.classList.add("sticky");
  } else {
    profile.classList.remove("sticky");
  }
};

// Get the modal
const modal = document.getElementById("passwordchangemsgbox");

// Get the button that opens the modal
const btn = document.getElementById("changeprofile");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

const hideModal = () => (modal.style.display = "none");
// When the user clicks on <span> (x), close the modal
span.onclick = hideModal;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) hideModal();
};

const submitAvatar = (e) => {
  e.preventDefault();
  const updateAvatarForm = document.getElementById("update-avatar-form");
  console.log("form submitted");
  const formData = new FormData(updateAvatarForm);
  console.log(formData);

  const fetchOptions = {
    method: "POST",
    body: formData,
  };

  fetch("/protected/update-avatar", fetchOptions);
  hideModal();
};

//to make the Edit Profile button popup in same page
document.getElementById('profileEdit').addEventListener('click',function() {
  document.querySelector('.wrapperContainer').style.display='flex';
})

document.querySelector('.closeWrapper').addEventListener('click',function(){
  document.querySelector('.wrapperContainer').style.display='none';
})
//fetching data from backend of blogs
let request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/getblog");
request.responseType = "text";

request.onload = function () {
  const blog = JSON.parse(request.response);
  console.log(blog);
};

request.send();

const logout = () => {
  fetch("/protected/logout", {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then((response) => response.success && window.location.assign("/"))
    .catch((error) => console.error(`ERROR: ${error}`));
};
