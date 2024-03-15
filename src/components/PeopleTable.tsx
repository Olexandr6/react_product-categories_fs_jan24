import cn from 'classnames';
import { useState } from 'react';
import { Product } from '../types';
import { SortLink } from './SortLink';

interface Props {
  products: Product[];
}

export const PeopleTable: React.FC<Props> = ({ products }) => {
  const [sortColumn, setSortColumn] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedProducts = [...products];

  const sortBy = (columnName: string) => {
    const firstClick = columnName !== sortColumn;
    const secondClick = columnName === sortColumn && !isReversed;
    const thirdClick = columnName === sortColumn && isReversed;

    if (firstClick) {
      setSortColumn(columnName);
      setIsReversed(false);
    }

    if (secondClick) {
      setIsReversed(true);
    }

    if (thirdClick) {
      setSortColumn('');
      setIsReversed(false);
    }
  };

  if (sortColumn) {
    preparedProducts.sort((productA, productB) => {
      switch (sortColumn) {
        case 'ID':
          return productA.id - productB.id;
        case 'Product':
          return productA.name.localeCompare(productB.name);
        case 'Category':
          return productA.category.title.localeCompare(productB.category.title);
        case 'User': {
          if (productA.user && productB.user) {
            return productA.user.name.localeCompare(productB.user.name);
          }

          return 0;
        }

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedProducts.reverse();
  }

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID

              <SortLink
                isActive={sortColumn === 'ID'}
                isReversed={isReversed}
                onClick={() => sortBy('ID')}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product

              <SortLink
                isActive={sortColumn === 'Product'}
                isReversed={isReversed}
                onClick={() => sortBy('Product')}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category

              <SortLink
                isActive={sortColumn === 'Category'}
                isReversed={isReversed}
                onClick={() => sortBy('Category')}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User

              <SortLink
                isActive={sortColumn === 'User'}
                isReversed={isReversed}
                onClick={() => sortBy('User')}
              />
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {preparedProducts.map(({ category, user, ...product }) => (
          <tr data-cy="Product" key={product.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {`${category.icon} - ${category.title}`}
            </td>

            <td
              data-cy="ProductUser"
              className={cn({
                'has-text-link': user?.sex === 'm',
                'has-text-danger': user?.sex === 'f',
              })}
            >
              {user?.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
