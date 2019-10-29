import React from 'react';
import { ITicket } from '../../models';
import './TicketCard.scss';

interface ITicketCardProps {
  model: ITicket;
  className?: string;
}

export const TicketCard = (props: ITicketCardProps) => {
  const { model, className } = props;

  return (
    <div className={`ticket-card ${className ? className : ''}`}>
      <div className='ticket-card__header'>
        <span className='ticket-card__price'>{model.price.toLocaleString('ru')} P</span>
        <img
          className='ticket-card__logo'
          src={`//pics.avs.io/99/36/${model.carrier}.png`}
          alt='Company`s logo'
        />
      </div>
      <div className='ticket-card__info'>
        {model.segments.map((segment, index) => {
          const durationHours = Math.floor((segment.duration / 60));
          const durationsMinutes = segment.duration % 60;

          const stopCount = segment.stops.length;

          const date = new Date(segment.date);

          let originHour = date.getHours().toString();
          if ( Number(originHour) < 10 ) { originHour = `0${originHour}`; }

          let originMinutes = date.getMinutes().toString();
          if ( Number(originMinutes) < 10 ) { originMinutes = `0${originMinutes}`; }

          const destinationDate = new Date(segment.date);
          destinationDate.setMinutes(date.getMinutes() + segment.duration);

          let destinationHour = destinationDate.getHours().toString();
          if ( Number(destinationHour) < 10 ) { destinationHour = `0${destinationHour}`; }

          let destinationMinutes = destinationDate.getMinutes().toString();
          if ( Number(destinationMinutes) < 10 ) { destinationMinutes = `0${destinationMinutes}`; }

          return (
            <div
              key={index}
              className='ticket-card__info-block'
            >
              <div className='ticket-card__info-item'>
                <p className='ticket-card__info-item-title'>{segment.origin} – {segment.destination}</p>
                <p className='ticket-card__info-item-content'>
                  {`${originHour}:${originMinutes}`} – {`${destinationHour}:${destinationMinutes}`}
                </p>
              </div>
              <div className='ticket-card__info-item'>
                <p className='ticket-card__info-item-title'>В пути</p>
                <p className='ticket-card__info-item-content'>
                  {`${durationHours}ч ${durationsMinutes}м`}
                </p>
              </div>
              <div className='ticket-card__info-item'>
                <p className='ticket-card__info-item-title'>
                  { stopCount ? `${segment.stops.length} пересадки` : 'Без пересадок'}
                </p>
                { Boolean(stopCount) &&
                  <p className='ticket-card__info-item-content'>
                    {segment.stops.join(', ')}
                  </p>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
