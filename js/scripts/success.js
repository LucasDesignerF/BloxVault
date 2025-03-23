document.addEventListener("DOMContentLoaded", async function() {
    // Pegar o parâmetro 'username' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        document.getElementById('username').textContent = "Usuário não especificado";
        return;
    }

    document.getElementById('username').textContent = username;

    try {
        // Fazer a requisição à Cloudflare Function
        const response = await fetch(`/functions/roblox?username=${encodeURIComponent(username)}`);
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

    // Atualizar a URL do Open Graph dinamicamente
    const currentUrl = window.location.href;
    document.querySelector('meta[property="og:url"]').setAttribute("content", currentUrl);
});