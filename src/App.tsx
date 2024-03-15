/* eslint-disable jsx-a11y/accessible-emoji */
import { useState } from 'react';
import cn from 'classnames';

import './App.scss';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Category, User, Product } from './types';
import { PeopleTable } from './components/PeopleTable';

const products: Product[] = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId) as Category;

  const user: User | null = usersFromServer
    .find(usr => usr?.id === category.ownerId) || null;

  return { ...product, category, user };
});

// {
//   id: 1,
//   title: 'Grocery',
//   icon: '🍞',
//   ownerId: 2,
// },

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [query, setQuery] = useState('');
  const [
    selectedCategoriesIDs,
    setSelectedCategoriesIDs,
  ] = useState<number[]>([]); // [3]

  const resetFilters = () => {
    setSelectedUser(null);
    setQuery('');
    setSelectedCategoriesIDs([]);
  };

  const isCategorySelected = (categoryId: number): boolean => {
    return selectedCategoriesIDs.includes(categoryId);
  };

  const toggleCategory = (categoryId: number) => {
    if (!isCategorySelected(categoryId)) {
      setSelectedCategoriesIDs([...selectedCategoriesIDs, categoryId]);
    } else {
      setSelectedCategoriesIDs(
        selectedCategoriesIDs.filter(catId => catId !== categoryId),
      );
    }
  };

  let filteredProducts = [...products];

  if (selectedUser) {
    filteredProducts = products.filter(
      product => product.user?.id === selectedUser.id, // product.user && product.user?.id
    );
  }

  if (query) {
    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (selectedCategoriesIDs.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => isCategorySelected(product.category.id),
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': selectedUser === null,
                })}
                onClick={() => setSelectedUser(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => setSelectedUser(user)}
                  className={cn({
                    'is-active': user.id === selectedUser?.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.currentTarget.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': selectedCategoriesIDs.length > 0,
                })}
                onClick={() => setSelectedCategoriesIDs([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': isCategorySelected(category.id),
                  })}
                  href="#/"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )
            : (
              <PeopleTable products={filteredProducts} />
            )}
        </div>
      </div>
    </div>
  );
};
