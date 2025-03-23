document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        document.getElementById('username').textContent = "Usuário não especificado";
        return;
    }

    document.getElementById('username').textContent = username;

    try {
        const workerUrl = `https://api-bloxvault.ofc-rede.workers.dev?username=${encodeURIComponent(username)}`;
        const response = await fetch(workerUrl);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro desconhecido');
        }

        const { userId, avatarUrl } = data;

        document.getElementById('userId').textContent = userId;
        const avatarImg = document.getElementById('avatar');
        avatarImg.src = avatarUrl;
        avatarImg.style.display = 'block';
    } catch (error) {
        console.error("Erro ao buscar dados do Roblox:", error);
        document.getElementById('username').textContent = "Erro ao carregar dados";
    }

    const currentUrl = window.location.href;
    document.querySelector('meta[property="og:url"]').setAttribute("content", currentUrl);
});