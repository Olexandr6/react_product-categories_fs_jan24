import cn from 'classnames';
import { Product } from '../types';

interface Props {
  products: Product[];
}

export const PeopleTable: React.FC<Props> = ({ products }) => (
  <table
    data-cy="ProductTable"
    className="table is-striped is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            {}

            <a href="#/" aria-label="sorting icon">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product

            <a href="#/" aria-label="sorting icon">
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className="fas fa-sort-down"
                />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category

            <a href="#/" aria-label="sorting icon">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort-up" />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User

            <a href="#/" aria-label="sorting icon">
              <span className="icon">
                <i data-cy="SortIcon" className="fas fa-sort" />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      {products.map(({ category, user, ...product }) => (
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
