import { createContext, useContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const GlobalStore = createContext(null);
export const useGlobalStore = () => useContext(GlobalStore);

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'login':
      return { ...state, token: payload.token };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { user: null });

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/' exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GlobalStore.Provider>
  );
};

export default App;
