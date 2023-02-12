import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import DefaultErrorPage from './pages/DefaultErrorPage';
import Root from './pages/Root';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={ <Root /> }
      errorElement={ <DefaultErrorPage /> }
    >

    </Route>
  )
)

const App = () => {

  return (
    <RouterProvider router={route} />
  )
}

export default App
