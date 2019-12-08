import React, { FormEvent } from 'react';
import { EFilterOptions } from '../../models';
import './FilterPanel.scss';

const TRANSFER_OPTION_LIST = [
  {
    id: EFilterOptions.ALL,
    text: 'Все',
  },
  {
    id: EFilterOptions.WITHOUT,
    text: 'Без пересадок',
  },
  {
    id: EFilterOptions.ONE,
    text: '1 пересадка',
  },
  {
    id: EFilterOptions.TWO,
    text: '2 пересадки',
  },
  {
    id: EFilterOptions.THREE,
    text: '3 пересадки',
  },
];

interface IFilterPanelProps {
  activeList: EFilterOptions[];
  className?: string;
  onChange(option: EFilterOptions): void;
}

export const FilterPanel = (props: IFilterPanelProps) => {

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: {
        dataset: {
          id,
        },
      },
    } = event;

    props.onChange(Number(id) as EFilterOptions);
  };

  const {
    activeList,
    className,
  } = props;

  return (
    <div className={`filter-panel ${className ? className : ''}`}>
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
                  <input
                    type='checkbox'
                    checked={
                      Boolean(activeList && activeList.findIndex((activeOption) => activeOption === option.id) !== -1)
                    }
                    id={`filter${option.id}`}
                    data-id={option.id}
                    onChange={onChange}
                    className='filter-panel__transfer-option-input'
                  />
                  <label
                    data-id={option.id}
                    className='filter-panel__transfer-option-checkbox'
                    htmlFor={`filter${option.id}`}
                  >
                    <i className='filter-panel__transfer-option-checkbox-icon' />
                    {option.text}
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
