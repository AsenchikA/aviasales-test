import React from 'react';
import './TicketCard.scss';

interface ITicketCardProps {
  className?: string;
}

export const TicketCard = (props: ITicketCardProps) => {
  return (
    <div className='ticket-card'>
      <div className='ticket-card__header'>
        <span className='ticket-card__price'>13 400 P</span>
        <img className='ticket-card__logo' src="" alt="Company's logo"/>
      </div>
      <div className='ticket-card__info'>
        <div className="ticket-card__info-block">
          <div className='ticket-card__info-item'>
            <p className='ticket-card__info-item-title'>MOW – HKT</p>
            <p className='ticket-card__info-item-content'>10:45 – 08:00</p>
          </div>
          <div className='ticket-card__info-item'>
            <p className='ticket-card__info-item-title'>В пути</p>
            <p className='ticket-card__info-item-content'>21ч 15м</p>
          </div>
          <div className='ticket-card__info-item'>
            <p className='ticket-card__info-item-title'>2 пересадки</p>
            <p className='ticket-card__info-item-content'>HKG, JNB</p>
          </div>
        </div>
        <div className="ticket-card__info-block">
          <div className='ticket-card__info-item'>
            <p className='ticket-card__info-item-title'>MOW – HKT</p>
            <p className='ticket-card__info-item-content'>10:45 – 08:00</p>
          </div>
          <div className='ticket-card__info-item'>
            <p className='ticket-card__info-item-title'>В пути</p>
            <p className='ticket-card__info-item-content'>21ч 15м</p>
          </div>
          <div className='ticket-card__info-item'>
            <p className='ticket-card__info-item-title'>2 пересадки</p>
            <p className='ticket-card__info-item-content'>HKG, JNB</p>
          </div>
        </div>
      </div>
    </div>
  )
}