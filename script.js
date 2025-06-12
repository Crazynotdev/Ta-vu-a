async function sendStory() {
  const input = document.getElementById('storyInput');
  const story = input.value.trim();

  if (!story) return alert("Écris quelque chose !");

  const res = await fetch('https://tavuca-backend.onrender.com/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ story })
  });

  if (res.ok) {
    alert("Story envoyée !");
    input.value = "";
  } else {
    alert("Erreur lors de l'envoi.");
  }
}

async function loadStories() {
  const res = await fetch('https://backend-wazmoi.onrender.com/get');
  const data = await res.json();
  const list = document.getElementById('storyList');

  if (data?.stories?.length) {
    data.stories.reverse().forEach(s => {
      const div = document.createElement('div');
      div.className = 'bubble';
      div.textContent = s;
      list.appendChild(div);
    });
  } else {
    list.innerHTML = "<p>Aucune story encore. Sois le premier !</p>";
  }
}

if (location.pathname.includes("stories.html")) loadStories();
