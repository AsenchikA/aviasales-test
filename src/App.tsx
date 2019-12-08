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
import { EFilterOptions, ESortingTypes } from './models';
import { IRootState } from './reducers';

interface IMapStateToProps {
  filterList: EFilterOptions[];
  sortingOption: ESortingTypes;
}

interface IMapDispatchToProps {
  getData: () => void;
  setSorting: (option: ESortingTypes) => void;
  setFilter: (option: EFilterOptions) => void;
}

type IAppProps = IMapStateToProps & IMapDispatchToProps;

class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.getData();
  }

  public render() {
    const {
      sortingOption,
      setSorting,
      setFilter,
      filterList,
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
            <FilterPanel
              className='app__filter-panel'
              activeList={filterList}
              onChange={setFilter}
            />
            <div className='app__results'>
              <SortingPanel
                activeOption={sortingOption}
                onChange={setSorting}
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
  filterList: state.settings.filterList,
  sortingOption: state.settings.sortingOption,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, null, Action>): IMapDispatchToProps => ({
  getData: () => dispatch(actions.getData()),
  setFilter: (option: EFilterOptions) => dispatch(actions.setFilter(option)),
  setSorting: (option: ESortingTypes) => dispatch(actions.setSorting(option)),
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
