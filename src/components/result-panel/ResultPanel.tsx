import React from 'react';
import { connect } from 'react-redux';
import { ITicket } from '../../models';
import { IRootState } from '../../reducers';
import { TicketCard } from '../ticket-card/TicketCard';
import './ResultPanel.scss';

interface IMapStateToProps {
  tickets: ITicket[];
}

class ResultPanel extends React.Component<IMapStateToProps> {
  public render() {
    const { tickets } = this.props;

    return (
      <div className='result-panel'>
        <ul className='ticket-list'>
          {
            tickets.map((ticketItem, index) => {
              return (
                <li
                  key={`${ticketItem.price}-${index}`}
                  className='result-panel__result'
                >
                  <TicketCard
                    model={ticketItem}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  tickets: state.tickets,
});

export const ResultPanelContainer = connect(mapStateToProps)(ResultPanel);
