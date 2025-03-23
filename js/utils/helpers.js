// js/utils/helpers.js
const Helpers = {
    // Formatar preço para o padrão brasileiro
    formatPrice(price) {
        return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
    },

    // Verificar se o clique foi em um elemento específico
    isElement(target, className) {
        return target.classList.contains(className);
    },

    // Log simples para debug (pode ser removido em produção)
    log(message) {
        console.log(`[BloxVault] ${message}`);
    }
};

// Exportar como módulo (se usar módulos no futuro) ou deixar global
window.Helpers = Helpers;