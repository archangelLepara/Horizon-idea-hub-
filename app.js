const ideaForm = document.getElementById('ideaForm');
const ideasList = document.getElementById('ideasList');
const searchBar = document.getElementById('searchBar');

// Load saved ideas from localStorage
let ideas = JSON.parse(localStorage.getItem('ideas')) || [];

// Display ideas
function displayIdeas(filteredIdeas = ideas) {
  ideasList.innerHTML = '';
  filteredIdeas.forEach((idea, index) => {
    const div = document.createElement('div');
    div.classList.add('idea');
    div.innerHTML = `
      <h4>${idea.title}</h4>
      <p>${idea.description}</p>
      <small>By ${idea.name} (${idea.email})</small>
    `;
    ideasList.appendChild(div);
  });
}

// Add new idea
ideaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (name && email && title && description) {
    const newIdea = { name, email, title, description };
    ideas.push(newIdea);
    localStorage.setItem('ideas', JSON.stringify(ideas));
    displayIdeas();
    ideaForm.reset();
  }
});

// Search ideas
searchBar.addEventListener('input', (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filtered = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(searchValue) ||
    idea.description.toLowerCase().includes(searchValue)
  );
  displayIdeas(filtered);
});

// Initial load
displayIdeas();
