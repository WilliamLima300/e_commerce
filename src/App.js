import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'; //adiciona a API para o back end do ecommerce
import { Products , Navbar , Cart , Checkout} from './components'; //inclui os components.
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'; // Rota para navegação entre components

const App = () => {

  const [products, setProducts] = useState([]); //Pegar os dados do produto na API commerce
  const [cart, setCart] = useState({}); //Pega os dados do carrinho de compras na API commerce
  console.log(cart);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item);
   
  };
  
  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity});

    setCart(response);
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response);
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response);
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  console.log(cart);
  
  return (
    <Router>

      <div>
        <Navbar totalItems={cart.total_items} />

        <Routes>

          <Route  path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}></Route>

          <Route exact path="/cart" element={<Cart cart={cart}
          handleUpdateCartQty={handleUpdateCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
          />}></Route>

          <Route path="/checkout" element={<Checkout cart={cart}/>}></Route>

        </Routes>
        
        
      </div>

    </Router>

  )
}

export default App
