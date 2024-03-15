import cn from 'classnames';
import { FC } from 'react';

interface Props {
  isActive: boolean,
  isReversed: boolean,
  onClick: () => void,
}

export const SortLink: FC<Props> = ({ isActive, isReversed, onClick }) => (
  <a
    href="#/"
    aria-label="sorting icon"
    onClick={onClick}
  >
    <span className="icon">
      <i
        data-cy="SortIcon"
        className={cn('fas', {
          'fa-sort': !isActive,
          'fa-sort-up': isActive && !isReversed,
          'fa-sort-down': isActive && isReversed,
        })}
      />
    </span>
  </a>
);
