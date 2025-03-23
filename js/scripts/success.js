// js/scripts/success.js
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
        // Buscar o ID do usuário pelo username usando a API do Roblox
        const userResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=1`);
        const userData = await userResponse.json();

        if (userData.data.length === 0) {
            document.getElementById('username').textContent = "Usuário não encontrado";
            return;
        }

        const userId = userData.data[0].id;
        document.getElementById('userId').textContent = userId;

        // Buscar o avatar headshot
        const avatarResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`);
        const avatarData = await avatarResponse.json();

        if (avatarData.data.length > 0) {
            const avatarUrl = avatarData.data[0].imageUrl;
            const avatarImg = document.getElementById('avatar');
            avatarImg.src = avatarUrl;
            avatarImg.style.display = 'block';
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Roblox:", error);
        document.getElementById('username').textContent = "Erro ao carregar dados";
    }

    // Atualizar a URL do Open Graph dinamicamente
    const currentUrl = window.location.href;
    document.querySelector('meta[property="og:url"]').setAttribute("content", currentUrl);
});