const votes = {
  JavaScript: 0,
  Python: 0,
  "C++": 0
};

function vote(language) {
  votes[language]++;
  updateVotes();
}

function updateVotes() {
  document.getElementById("js-count").textContent = votes["JavaScript"];
  document.getElementById("py-count").textContent = votes["Python"];
  document.getElementById("cpp-count").textContent = votes["C++"];
}

// Simulate real-time voting every 2 seconds
setInterval(() => {
  const languages = Object.keys(votes);
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  votes[randomLang]++;
  updateVotes();
}, 2000);
