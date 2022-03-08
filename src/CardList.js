import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from './card'

import { drawCard, drawCards } from './DeckFunctions'

const CardList = () => {
    const INITIAL_STATE = []

    const [cards, setCards] = useState(INITIAL_STATE)

    let btnText = 'Draw Deck?'
    let secondBtnText = 'Draw All Cards!!!'

    return (
        <div>
            {btnText==="Draw Deck?" || "Shuffle Deck?" ? 
            <button onClick={drawCard}>{btnText}</button> 
            : 
            <>
                <button onClick={drawCard}>{btnText}</button>
                <button onClick={drawCards}>{btnText}</button>
            </>
            }
            <div>{cards.map(card => {
                <Card image={card.image}/>
            })}
            </div>
        </div>
    )
}

export default CardList;