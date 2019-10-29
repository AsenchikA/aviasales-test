import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { actions } from './actions';
import './App.scss';
import { FilterPanel } from './components/filter-panel/FilterPanel';
import { ResultPanelContainer } from './components/result-panel/ResultPanel';
import { SortingPanel } from './components/sorting-panel/SortingPanel';
import { ReactComponent as Logo } from './img/logo.svg';
import { ESortingTypes } from './models';
import { IRootState } from './reducers';

interface IMapStateToProps {
  sortingOption: ESortingTypes;
}

interface IMapDispatchToProps {
  getData: () => void;
  setSortingOption: (option: ESortingTypes) => void;
}

type IAppProps = IMapStateToProps & IMapDispatchToProps;

class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.getData();
  }

  public render() {
    const {
      sortingOption,
      setSortingOption,
    } = this.props;

    return (
      <div className='app'>
        <div className='app__container'>
          <header className='app__header'>
            <Logo
              className='app__logo'
              width={90}
              height={90}
            />
          </header>
          <main className='app__main'>
            <FilterPanel />
            <div className='app__results'>
              <SortingPanel
                activeOption={sortingOption}
                onChange={setSortingOption}
              />
              <ResultPanelContainer />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  sortingOption: state.settings.sortingOption,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, null, Action>): IMapDispatchToProps => ({
  getData: () => dispatch(actions.getData()),
  setSortingOption: (option: ESortingTypes) => dispatch(actions.setSortingOption(option)),
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
