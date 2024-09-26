import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';
import Account from './components/Account'; // Import de la page de compte

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/account" element={<Account />} /> {/* Route pour la page du compte */}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
