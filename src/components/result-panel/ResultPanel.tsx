import React from 'react';
import { connect } from 'react-redux';
import { ITicket } from '../../models';
import { IRootState } from '../../reducers';
import { TicketCard } from '../ticket-card/TicketCard';
import './ResultPanel.scss';

interface IMapStateToProps {
  tickets: ITicket[];
}

interface IResultPanelState {
  countShowenTickets: number;
}

class ResultPanel extends React.Component<IMapStateToProps, IResultPanelState> {

  public state = {
    countShowenTickets: 10,
  };

  public render() {
    const { tickets } = this.props;
    const { countShowenTickets } = this.state;

    return (
      <div className='result-panel'>
        <ul className='ticket-list'>
          {
            tickets.slice(0, countShowenTickets).map((ticketItem, index) => {
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
        <button
          onClick={this.onMoreButtonClick}
          className='result-panel__more-button'
        >
          показать ещё 10
        </button>
      </div>
    );
  }

  private onMoreButtonClick = () => {
    this.setState((prevState) => ({
      countShowenTickets: prevState.countShowenTickets + 10,
    }));
  }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  tickets: state.tickets.filteredList,
});

export const ResultPanelContainer = connect(mapStateToProps)(ResultPanel);
