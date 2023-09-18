const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResultsContainer");
const suggestions = document.getElementById("suggestions");
const hotels = document.getElementById("hotels");

let jsonData;

fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
        jsonData = data;
    })
    .catch((error) => {
        console.error("Erro ao buscar dados: " + error);
    });

function search(query) {
    searchResultsContainer.innerHTML = ""; // Limpa o conteúdo anterior
    suggestions.innerHTML = "";
    hotels.innerHTML = "";

    const searchTerm = query.toLowerCase();

    const matchingSuggestions = jsonData.suggestions.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
    );

    const matchingHotels = jsonData.hotels.filter((item) =>
        item.hotel.name.toLowerCase().includes(searchTerm)
    );

    // Limitar resultados a 5 itens de sugestão, sugestões e hotéis
    const limitedSuggestions = matchingSuggestions.slice(0, 5);
    const limitedHotels = matchingHotels.slice(0, 5);

    limitedSuggestions.forEach((item) => {
        const suggestionItem = document.createElement("li");
        suggestionItem.textContent = item.name;
        suggestions.appendChild(suggestionItem);
        suggestionItem.addEventListener("click", () => {
            searchInput.value = item.name;
            suggestions.innerHTML = ""; // Limpa todas as sugestões
            displaySuggestionDetails(item);
        });

        // Adicione o item à searchResultsContainer
        searchResultsContainer.appendChild(suggestionItem);
    });

    limitedHotels.forEach((item) => {
        const hotelItem = document.createElement("li");
        hotelItem.textContent = item.hotel.name;
        hotels.appendChild(hotelItem);
        hotelItem.addEventListener("click", () => {
            searchInput.value = item.hotel.name;
            hotels.innerHTML = "";
            displayHotelDetails(item);
        });

        // Adicione o item à searchResultsContainer
        searchResultsContainer.appendChild(hotelItem);
    });
}

function displaySuggestionDetails(suggestion) {
    const suggestionDetails = document.createElement("div");
    suggestionDetails.innerHTML = `
        <p><strong>Região:</strong> ${suggestion.region}</p>
        <p><strong>Tipo:</strong> ${suggestion.type}</p>
    `;

    searchResultsContainer.appendChild(suggestionDetails);
}

function displayHotelDetails(hotelData) {
    const hotelDetails = document.createElement("div");
    hotelDetails.innerHTML = `
        <p><strong>Endereço:</strong> ${hotelData.hotel.address}</p>
        <p><strong>Descrição:</strong> ${hotelData.hotel.description}</p>
        <p><strong>Preço:</strong> ${hotelData.lowestPrice.amount} ${hotelData.lowestPrice.currency}</p>
    `;

    searchResultsContainer.appendChild(hotelDetails);
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    search(query);
});
