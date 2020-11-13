import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardPile.css";

const SHUFFLE_CARDS = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
const DRAW_CARD = "https://deckofcardsapi.com/api/deck"   // <<deck_id>>/draw/?count=2

/** Card Pile: manages cards in the list
 *
 *
 * - cards: array like [ { id, image, name }, ... ]
 *
 * CardPile -> NewListItemForm
 */

function randomAngle() {
  let posOrNeg = Math.round(Math.random()) ? 1 : -1;
  return Math.round(Math.random() * 90) * posOrNeg;
}

function CardPile() {
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState(null);
  const [cardsRemaining, setCardsRemaining] = useState(null);

  useEffect(function grabNewDeck() {
    async function getDeck() {
      const result = await axios.get(SHUFFLE_CARDS);
      setDeckId(result.data.deck_id);
      setCardsRemaining(result.data.remaining);
    }
    getDeck()
  }, []);

  async function reset() {
    const result = await axios.get(SHUFFLE_CARDS);
    setDeckId(result.data.deck_id);
    setCardsRemaining(result.data.remaining);
    setCards([]);
  }

  /** Add new card. */
  async function addCard() {
    const result = await axios.get(`${DRAW_CARD}/${deckId}/draw?count=1`);
    let newCard = result.data.cards[0];
    newCard["degree"] = `${randomAngle()}deg`;
    setCardsRemaining(result.data.remaining);
    setCards(cards => [...cards, newCard]);
  }

  function renderCards() {
    return (
      <ul>
        {cards.map((c) => {
          return <Card {...c} key={c.code} />
        })}
      </ul>
    );
  }


  return (
    <div className="CardPile">
      {!cardsRemaining || <button
        className="CardPile-button"
        onClick={addCard}>GET A CARD</button>}
      {!cardsRemaining && <button
        className="CardPile-shuffle"
        onClick={reset}>SHUFFLE</button>}
      <div>
        {renderCards()}
      </div>
    </div>
  );
}

export default CardPile;
