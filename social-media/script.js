// Load posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Show posts
function showPosts() {
  const container = document.getElementById("posts");
  if (!container) return;

  container.innerHTML = "";

  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";

div.innerHTML = `
  <h3>${post.text}</h3>

  <button onclick="likePost(${index})">❤️ ${post.likes}</button>
  <button onclick="deletePost(${index})">❌ Delete</button>

  <div class="comment-box">
    <input type="text" id="c${index}" placeholder="Write a comment">
    <button onclick="addComment(${index})">Comment</button>
  </div>

  <div>
    ${post.comments.map(c => `<p class="comment">💬 ${c}</p>`).join("")}
  </div>
`;

    container.appendChild(div);
  });
}

// Add post
function addPost() {
  const input = document.getElementById("postInput");

  const newPost = {
    text: input.value,
    likes: 0,
    comments: []
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  input.value = "";
  showPosts();
}

// Like post
function likePost(index) {
  posts[index].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

// Add comment
function addComment(index) {
  const input = document.getElementById("c" + index);

  if (input.value.trim() === "") {
    alert("Comment cannot be empty");
    return;
  }

  posts[index].comments.push(input.value);
  localStorage.setItem("posts", JSON.stringify(posts));

  input.value = ""; // ✅ add this
  showPosts();
}

// Run on load
showPosts();
function addPost() {
  const input = document.getElementById("postInput");

  if (input.value.trim() === "") {
    alert("Post cannot be empty");
    return;
  }

  const newPost = {
    text: input.value,
    likes: 0,
    comments: []
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  input.value = "";
  showPosts();
}
function deletePost(index) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  
  if (confirmDelete) {
    posts = posts.filter((_, i) => i !== index);  // ✅ better method
    localStorage.setItem("posts", JSON.stringify(posts));
    showPosts();
  }
}