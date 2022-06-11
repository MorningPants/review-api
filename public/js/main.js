let currentUser;
const form = document.getElementById("newUser");
const result = document.getElementById("result");
form.addEventListener("submit", getGithubUser);

function getGithubUser(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => process(data));
}
function process(data) {
  console.log(data);
  if (data.login) {
    currentUser = data;
    result.textContent = `User ${data.login} has a Github account at ${data.html_url}`;
    result.dataset.user = data.login;
    addUser();
  } else {
    result.textContent = "No user found by that name";
  }
}

async function addUser() {

  try {
    const response = await fetch("addUser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: currentUser }),
    });
    console.log(response);
    // location.reload()
  } catch (err) {
    console.log(err);
  }
}