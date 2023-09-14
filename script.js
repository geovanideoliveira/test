// Função para fazer a solicitação à Fake API e mostrar sugestões
function fetchSuggestions(inputValue) {
    // Faça uma solicitação HTTP para a API /suggestions com o valor do destino
    // Aqui, você pode usar a função fetch ou outra biblioteca para fazer a solicitação
    // Em seguida, atualize a lista de sugestões com os resultados da API
    // Certifique-se de lidar com erros e tratamento de dados adequados
}

const destinationInput = document.getElementById('destinationInput');
const suggestionsList = document.getElementById('suggestionsList');

destinationInput.addEventListener('input', () => {
    const inputValue = destinationInput.value.trim();

    // Verifique se o valor digitado possui pelo menos 3 caracteres
    if (inputValue.length >= 3) {
        // Chame a função para buscar sugestões com base no valor digitado
        fetchSuggestions(inputValue);
    } else {
        // Limpe a lista de sugestões se o valor for muito curto
        suggestionsList.innerHTML = '';
    }
});