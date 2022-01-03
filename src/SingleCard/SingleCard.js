function SingleCard({card, handleChoice, flipped}) {

  const handleClick = () => {
    handleChoice(card);
  }
    return (
        <div className="card-wrapper">
            <div className={flipped ? 'flipped' : ''}>
              <img src={card.src} alt="card-front" className="front"/>
              <img src="/images/back-card.jpg" alt='card-back' className="back" onClick={handleClick}/>
            </div>
          </div>
    )
}

export default SingleCard
