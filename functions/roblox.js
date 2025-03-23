export async function onRequestGet({ request }) {
    const url = new URL(request.url);
    const username = url.searchParams.get('username');

    if (!username) {
        return new Response(JSON.stringify({ error: 'Username não especificado' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Buscar o ID do usuário pelo username
        const userResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=1`);
        const userData = await userResponse.json();

        if (!userResponse.ok || userData.data.length === 0) {
            return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const userId = userData.data[0].id;

        // Buscar o avatar headshot
        const avatarResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=true`);
        const avatarData = await avatarResponse.json();

        if (!avatarResponse.ok || avatarData.data.length === 0) {
            return new Response(JSON.stringify({ error: 'Avatar não encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const avatarUrl = avatarData.data[0].imageUrl;

        // Retornar os dados
        return new Response(JSON.stringify({ userId, avatarUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erro ao buscar dados do Roblox:', error);
        return new Response(JSON.stringify({ error: 'Erro ao buscar dados' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}