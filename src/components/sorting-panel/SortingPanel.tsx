import React, { MouseEvent } from 'react';
import { ESortingTypes } from '../../models';
import './SortingPanel.scss';

const listSortingOption = [
  {
    title: 'самый дешевый',
    type: ESortingTypes.CHEAP,
  },
  {
    title: 'самый быстрый',
    type: ESortingTypes.QUICK,
  },
];

interface ISortingProps {
  activeOption: ESortingTypes;
  onChange: (type: ESortingTypes) => void;
}

export const SortingPanel = (props: ISortingProps) => {

  const changeSorting = (event: React.MouseEvent<HTMLLIElement>) => {
    if (event.currentTarget.dataset.type) {
      props.onChange(Number(event.currentTarget.dataset.type) as ESortingTypes);
    }
  };

  return (
    <div className='sorting-panel'>
      <ul className='sorting-panel__tab-list'>
        {
          listSortingOption.map((option) => {
            return (
              <li
                key={option.type}
                data-type={option.type}
                onClick={changeSorting}
                className={`sorting-panel__tab-option ${option.type === props.activeOption ? 'sorting-panel__tab-option--active' : ''}`}
              >
                {option.title}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
