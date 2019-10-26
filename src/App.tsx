import React from 'react';
import { FilterPanel } from './components/filter-panel/FilterPanel';
import { SortingPanel } from './components/sorting-panel/SortingPanel';
import { ResultPanel } from './components/result-panel/ResultPanel';
import { ReactComponent as Logo } from './img/logo.svg';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
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
            <SortingPanel />
            <ResultPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
