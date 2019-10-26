import React from 'react';
import './ResultPanel.scss';
import { TicketCard } from '../ticket-card/TicketCard';

export const ResultPanel = () => {
  return (
    <div className='result-panel'>
      <TicketCard className='result-panel__result' />
    </div>
  )
}