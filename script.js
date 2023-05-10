


$(document).ready(function() {
    // Seleciona o formulário
    const form = $('#card-form');
  
    // Adiciona um evento submit ao formulário
    form.submit(function(event) {
      // Impede o comportamento padrão de enviar o formulário
      event.preventDefault();
  
      // Obtém os valores dos campos do formulário
      const numDecks = $('#num-decks').val();
      const numCards = $('#num-cards').val();
      const cardValue = $('#card-value').val();
      const cardSuit = $('#card-suit').val();
  
      // Define a URL da API Deck of Cards
      const apiUrl = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numDecks}`;
  
      // Envia uma solicitação AJAX para a API Deck of Cards
      $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(response) {
          // Obtém o ID do baralho da resposta da API
          const deckId = response.deck_id;
  
          // Define a URL da API para obter as cartas do baralho
          const drawUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`;
  
          // Envia uma solicitação AJAX para a API Deck of Cards
          $.ajax({
            url: drawUrl,
            method: 'GET',
            success: function(response) {
              // Cria uma tabela para exibir as cartas
              const table = $('<table>');
              const header = $('<tr>');
              header.append($('<th>').text('Carta'));
              header.append($('<th>').text('Valor'));
              header.append($('<th>').text('Naipe'));
              table.append(header);
  
              // Preenche a tabela com as cartas
              response.cards.forEach(function(card) {
                const row = $('<tr>');
                row.append($('<td>').text(`${card.value} de ${card.suit}`));
                row.append($('<td>').text(cardValue));
                row.append($('<td>').text(cardSuit));
                table.append(row);
              });
  
              // Adiciona a tabela à página
              $('#card-list').html(table);
            },
            error: function(error) {
              console.log(error);
            }
          });
        },
        error: function(error) {
          console.log(error);
        }
      });
  
      // Limpa os valores dos campos do formulário
      form[0].reset();
    });
  });