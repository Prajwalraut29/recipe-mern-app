import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import store from './redux/store';
import Favourites from './pages/Favourites';
import RecipeDetails from './pages/RecipeDetails';
function App() {
  return (
    <div >
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Toaster />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path='/favourites' element={<Favourites />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
