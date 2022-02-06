import logo from './logo.svg';
import Product from './component/product/product';
import { Provider } from "react-redux";
import store from "../src/component/store";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        <Product/>
        </header>
      </div>
    </Provider>
  );
}

export default App;
