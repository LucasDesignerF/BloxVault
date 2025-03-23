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

        // Atualizar elementos HTML com os dados retornados
        document.getElementById('userId').textContent = data.userId || 'N/A';
        document.getElementById('displayName').textContent = data.displayName || 'N/A';
        document.getElementById('description').textContent = data.description || 'Sem descrição';
        document.getElementById('created').textContent = data.created ? new Date(data.created).toLocaleDateString() : 'N/A';
        document.getElementById('isBanned').textContent = data.isBanned ? 'Sim' : 'Não';
        if (data.avatarUrl && document.getElementById('avatar')) {
            const avatarImg = document.getElementById('avatar');
            avatarImg.src = data.avatarUrl;
            avatarImg.style.display = 'block';
        }
        document.getElementById('lastLocation').textContent = data.lastLocation || 'Desconhecido';
        document.getElementById('onlineStatus').textContent = data.onlineStatus !== null ? (data.onlineStatus === 1 ? 'Online' : 'Offline') : 'N/A';
        document.getElementById('friendsCount').textContent = data.friendsCount || 0;
        document.getElementById('followersCount').textContent = data.followersCount || 0;

    } catch (error) {
        console.error("Erro ao buscar dados do Roblox:", error);
        document.getElementById('username').textContent = "Erro ao carregar dados";
    }

    const currentUrl = window.location.href;
    document.querySelector('meta[property="og:url"]').setAttribute("content", currentUrl);
});