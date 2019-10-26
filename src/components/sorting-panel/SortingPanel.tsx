import React from 'react';
import './SortingPanel.scss';

export const SortingPanel = () => {
  return (
    <div className='sorting-panel'>
      <ul className='sorting-panel__tab-list'>
        <li className='sorting-panel__tab-option sorting-panel__tab-option--cheap'>самый дешевый</li>
        <li className='sorting-panel__tab-option sorting-panel__tab-option--quick'>самый быстрый</li>
      </ul>
    </div>
  )
}