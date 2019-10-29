import React from 'react';
import './FilterPanel.scss';

const TRANSFER_OPTION_LIST = [
  {
    id: 1,
    text: 'Все',
  },
  {
    id: 2,
    text: 'Без пересадок',
  },
  {
    id: 3,
    text: '1 пересадка',
  },
  {
    id: 4,
    text: '2 пересадки',
  },
  {
    id: 5,
    text: '3 пересадки',
  },
];

export const FilterPanel = () => {
  return (
    <div className='filter-panel'>
      <span className='filter-panel__title'>Количество пересадок</span>
      <div className='filter-panel__content'>
        <ul className='filter-panel__transfer-list'>
          {
            TRANSFER_OPTION_LIST.map((option) => {
              return (
                <li
                  key={option.id}
                  className='filter-panel__transfer-option'
                >
                  <label className='filter-panel__transfer-option-checkbox' htmlFor={`checkbox${option.id}`}>
                    <i className='filter-panel__transfer-option-checkbox-icon' />
                    {option.text}
                    <input type='checkbox' id={`checkbox${option.id}`} />
                  </label>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
