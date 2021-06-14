const userDetails = JSON.parse(localStorage.getItem("userDetails"));
(() => {
  document.getElementById("profile-picture").src =
    localStorage.getItem("avatarLink");
  document.getElementById("commentimage").src =
    localStorage.getItem("avatarLink");
  document.getElementById("image").src = localStorage.getItem("avatarLink");
  document.getElementById(
    "namesetting"
  ).innerHTML = `<strong>${userDetails.username}</strong>`;
  if (userDetails.bio)
    document.getElementById("bio").innerText = userDetails.bio;
  if (userDetails.hobbies)
    document.getElementById(
      "hobbies"
    ).innerHTML = `<strong>Hobbies: </strong>${userDetails.hobbies}`;
})();

const profile = document.getElementById("profile");
const sticky = profile.offsetTop;

//sidebar scroll position fix code
// window.onscroll = function () {
//   if (window.pageYOffset >= sticky) {
//     profile.classList.add("sticky");
//   } else {
//     profile.classList.remove("sticky");
//   }
// };

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
  if (event.target == modal) {
    console.log(event.target);
    console.log("herer");
    hideModal();
  }
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
  //send the new avtar to backend
  fetch("/protected/update-avatar", fetchOptions)
    .then((resp) => resp.json())
    .then((response) => {
      response.success &&
        localStorage.setItem("avatarLink", response.avatarLink);
    })
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
  //reload the page so user can see the avatar has changed
  // window.location.reload();
};

//to make the Edit Profile button popup in same page
document.getElementById("profileEdit").addEventListener("click", function () {
  document.querySelector(".wrapperContainer").style.display = "flex";
  document.getElementById("user-bio").innerText = userDetails.bio
    ? userDetails.bio
    : "";
  document.getElementById("user-hobbies").innerText = userDetails.hobbies
    ? userDetails.hobbies
    : "";
});

document.querySelector(".closeWrapper").addEventListener("click", function () {
  document.querySelector(".wrapperContainer").style.display = "none";
});
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
    .then((response) => {
      if (response.success) {
        localStorage.removeItem("userDetails");
        localStorage.removeItem("avatarLink");
        window.location.assign("/");
      }
    })
    .catch((error) => console.error(`ERROR: ${error}`));
};

const updateBioHobbies = (e) => {
  e.preventDefault();
  const bio = document.getElementById("user-bio").value;
  const hobbies = document.getElementById("user-hobbies").value;
  const username = document.getElementById("namesetting").innerText;

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bio, hobbies }),
  };
  fetch("/protected/update-bio-hobbies", fetchOptions)
    .then((resp) => resp.json())
    .then((response) => {
      const { bio, hobbies } = response;
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ username, bio, hobbies })
      );
    })
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
};
