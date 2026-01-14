async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  return await response.json();
}

async function getPosts(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );

  return await response.json();
}

async function displayUsers() {
  const users = await getUsers();

  const ul = document.getElementsByTagName("ul")[0];

  users.forEach((user) => {
    const li = document.createElement("li");
    li.dataset.userId = user.id;
    li.textContent = user.name;
    ul.appendChild(li);
  });

  document.querySelectorAll("ul.tabs li")[0].classList.add("active");
  displayPosts(users[0].id);

  const tabs = Array.from(document.querySelectorAll("ul.tabs li"));

  tabs.forEach((el) => {
    el.addEventListener("click", () => {
      if (el.className == "active") {
        return;
      }

      tabs.forEach((el) => {
        el.classList.remove("active");
      });

      el.classList.add("active");
      displayPosts(el.dataset.userId);
    });
  });
}

async function displayPosts(id) {
  const posts = await getPosts(id);

  const postsDiv = document.querySelectorAll(".content")[0];

  postsDiv.innerHTML = "";

  posts.forEach((post) => {
    const p = document.createElement("p");
    p.textContent = post.title;
    postsDiv.appendChild(p);
  });
}

displayUsers();
