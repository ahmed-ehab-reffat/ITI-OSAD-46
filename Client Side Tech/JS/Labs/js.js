// Optimized Fetch Utility
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// 1. Data Logic
const getUsers = () => fetchData("https://jsonplaceholder.typicode.com/users");
const getPosts = (id) => fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

// 2. UI Logic: Displaying Posts
async function displayPosts(id) {
  const postsDiv = document.querySelector(".content");
  postsDiv.innerHTML = "Loading posts..."; // Feedback for user

  const posts = await getPosts(id);
  postsDiv.innerHTML = ""; // Clear loader

  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const p = document.createElement("p");
    p.textContent = post.title;
    fragment.appendChild(p);
  });
  postsDiv.appendChild(fragment);
}

// 3. UI Logic: Displaying Users & Handling Tabs
async function initApp() {
  const users = await getUsers();
  const ul = document.querySelector("ul.tabs");
  
  if (!users.length) return;

  // Create List Items
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.dataset.userId = user.id;
    if (index === 0) li.classList.add("active"); // Set first as active
    ul.appendChild(li);
  });

  // Load first user's posts immediately
  displayPosts(users[0].id);

  // Event Delegation (Better than adding listeners to every LI)
  ul.addEventListener("click", (e) => {
    const clickedLi = e.target.closest("li");
    
    if (!clickedLi || clickedLi.classList.contains("active")) return;

    // Switch Active Class
    ul.querySelector(".active").classList.remove("active");
    clickedLi.classList.add("active");

    displayPosts(clickedLi.dataset.userId);
  });
}

initApp();
