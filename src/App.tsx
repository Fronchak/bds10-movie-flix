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
import MoviePage from './pages/MoviePage';
import AuthContext from './contexts/AuthProvider/context';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoutes from './components/PrivateRoutes';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <DefaultErrorPage /> }
    >
      <Route index element={ <Login /> } />
      <Route
        element={ <PrivateRoutes roles={[]} /> }
      >
        <Route path="/movies" element={ <Movies /> }/>
        <Route path="/movies/:id" element={ <MoviePage /> } />
      </Route>
    </Route>
  )
)

const App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={route} />
      <ToastContainer
        position='bottom-right'
        theme='dark'
        autoClose={ 3000 }
      />
    </AuthProvider>
  );
}

export default App
