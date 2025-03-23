document.addEventListener('DOMContentLoaded', () => {
    // Selecionar todos os botões de compra com a classe correta
    const buyButtons = document.querySelectorAll('.modern-btn');

    // Adicionar evento de clique a cada botão
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.bg-dark-gray'); // Ajustado para a classe correta
            if (card) {
                const productName = card.querySelector('h4').textContent;
                const productPrice = card.querySelector('span.text-2xl').textContent;

                // Exibir alerta com informações do produto
                alert(`Você selecionou: ${productName} por ${productPrice}. Confirme sua compra!`);
                // Aqui você pode adicionar lógica para redirecionar ou adicionar ao carrinho
            }
        });
    });

    // Animação simples no carregamento da página (hero section)
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        heroSection.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
        setTimeout(() => {
            heroSection.classList.remove('opacity-0');
        }, 100);
    }
});