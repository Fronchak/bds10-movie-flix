import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import DefaultErrorPage from './pages/DefaultErrorPage';
import Login from './pages/Login';
import Root from './pages/Root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Movies from './pages/Movies';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <DefaultErrorPage /> }
    >
      <Route
        index
        element={ <Login /> }
      />
      <Route
        path="/movies"
        element={ <Movies /> }
      />
    </Route>
  )
)

const App = () => {

  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer
        position='bottom-right'
        theme='dark'
        autoClose={ 3000 }
      />
    </>
  );
}

export default App
