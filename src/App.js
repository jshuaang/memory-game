import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard/SingleCard';

const cardsArray = [
  { src : '/images/pokemon-darumaka.png' },
  { src : '/images/pokemon-diglet.jpg' },
  { src : '/images/pokemon-farfetchd.png' },
  { src : '/images/pokemon-raichu.png' },
  { src : '/images/pokemon-ratatta.png' },
  { src : '/images/pokemon-slowbro.png' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState(''); 
  const [turn, setTurn] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

  const shuffleCard = () => {
    const newCard = [...cardsArray, ...cardsArray]
    setCards(newCard.sort(() => Math.random() - 0.5).map((card) => ({...card, id: Math.random(), matched: false})));
    setTurn(0);
  }

  useEffect(() => {
    if(firstChoice && secondChoice){
      setDisabled(true);
      if(firstChoice.src === secondChoice.src && firstChoice.id !== secondChoice.id){
        setCards(cards.map(({matched, ...card}) => {
          if(card.src === firstChoice.src){
            resetChoice();
            return ({...card, matched: true});
          }else{
            resetChoice();
            return {...card, matched};
          }
        }))
      }else{
        setTimeout(() => {
          resetChoice();
        }, 2000);
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    shuffleCard();
  }, [])

  const resetChoice = () => {
    setTurn(turn + 1);
    setFirstChoice('');
    setSecondChoice('');
    setDisabled(false);
  }
  
  return (
    <div className='board-container'>
      <h1>React Memory Game</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className="card-container">
        {cards.map((card) => (
          <SingleCard card={card} handleChoice={!disabled ? handleChoice : null} key={card.id} 
            flipped={card.id === firstChoice.id || card.id === secondChoice.id || card.matched }
          />
        ))}
      </div>
      <div>
        <h3>Turn : {turn}</h3>
      </div>
    </div>
  );
}

export default App;
