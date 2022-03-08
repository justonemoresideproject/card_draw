import axios from 'axios'
import { useEffect } from 'react'

const [deckId, setDeckId] = useState()
const timerId = useRef()

const NEW_DECK_URL = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

const DRAW_URL = `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`

const SHUFFLE_DECK_URL = `http://deckofcardsapi.com/api/deck/${deckId}/shuffle/`

export const newDeck = async () => {
    const res = await axios.get(NEW_DECK_URL)

    setDeckId(res.deck_id)
}

export const shuffleDeck = async () => {
    const res = await axios.get(SHUFFLE_DECK_URL)
}

export const drawCard = async () => {
    if(btnText == 'Draw Deck?') {
        await newDeck()
        btnText = 'Gimme a card!'
    } else if(btnText == 'Shuffle Deck?') {
        await shuffleDeck()
        btnText = 'Gimme a card!'
    }

    try{
        const res = await axios.get(DRAW_URL)
        
        setCards(cards => [...cards, {image: res.image, value: res.value, suit: res.suit}])
    } catch (e) {
        alert("Error: Out of Cards")
        btnText = 'Shuffle Deck?'
    }
}

const drawCardsEffect = useEffect(async () => {
    try{
        timerId.current = setInterval(() => {
            const res = await axios.get(DRAW_URL)
        
            setCards(cards => [...cards, {image: res.image, value: res.value, suit: res.suit}])
        }, 1000)

        return () => {
            clearInterval(timerId.current)
        }
    } catch (e) {
        alert("Error: Out of Cards")
        btnText = 'Shuffle Deck?'
    }
})

export const drawCards = async () => {
    if(secondBtnText == 'Draw All Cards!!!') {
        drawCardsEffect()
        secondButtonText = 'Stop drawing?'
    } else if(secondBtnText == 'Stop drawing?') {
        clearInterval(timerId.current)
        secondButtonText = 'Draw All Cards!!!'
    }
    
}