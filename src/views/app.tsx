import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import img from '../assets/images/LD.png';

import Products from './products/Products';
import AddProduct from './products/AddProduct';
import EditProduct from './products/EditProduct';
import DeleteProduct from './products/DeleteProduct';
import ViewProduct from './products/ViewProduct';

import AnimalExamples from '../components/AnimalExamples';

import '../styles/style.css';

const App: FC = () => {
  return (
    <div>
      <div className="app">This is my app.</div>
      <img src={img} alt="img" />

      <AnimalExamples />

      <BrowserRouter>
        <ul>
          <li>
            <Link to="/Products">Products</Link>{' '}
          </li>
          <li>
            <Link to="/Products/add">Add Products</Link>{' '}
          </li>
          <li>
            {/* It is better to use a slug instead of item id, for SEO benefits. */}
            <Link to="/Products/2/edit">Edit Products</Link>{' '}
          </li>
          <li>
            <Link to="/Products/2/delete">Delete Products</Link>{' '}
          </li>
          <li>
            <Link to="/Products/2">View Products</Link>{' '}
          </li>
        </ul>
        <Routes>
          <Route path="/Products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path=":id/edit" element={<EditProduct />} />
            <Route path=":id/delete" element={<DeleteProduct />} />
            <Route path=":id" element={<ViewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
