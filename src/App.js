import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
        <Route index element={<Home />} /></Route> 
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

