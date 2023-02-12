import { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react';
import { redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieCard from '../../components/MovieCard';
import { GenreName } from '../../types/domain/GenreName';
import { MovieList } from '../../types/domain/MovieList';
import { SpringPage } from '../../types/vendor/SpringPage';
import Select from 'react-select'
import { hasAnyRole, isAuthenticated } from '../../util/auth';
import { getResponseStatusFromErrorRequest, isForbidden, isUnauthorized, requestBackend } from '../../util/request';
import './styles.css';
import { SingleValue } from 'react-select/dist/declarations/src';
import AnimesLoader from '../../loaders/AnimesLoader';
import GenreFilter from '../../components/GenreFilter';
import Pagination from '../../components/Pagination';

type MovieFilter = {
  genreFilter: number;
  pageNumber: number;
}

const Movies = () => {

  const [page, setPage] = useState<SpringPage<MovieList>>();
  const [movieFilter, setMovieFilter] = useState<MovieFilter>({
    genreFilter: 0,
    pageNumber: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('use Effect que carrega os movies');
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/movies',
      withCredentials: true,
      params: {
        genreId: movieFilter.genreFilter,
        page: movieFilter.pageNumber,
        size: 2
      }
    }
    setIsLoading(true);
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
      .catch((e) => {
        toast.error('Erro inesperado');

      })
      .finally(() => setIsLoading(false));
  }, [movieFilter]);

  const content = page?.content.map((movie) => (
    <div className="col movie-card-container" key={movie.id} onClick={() => navigate(`${movie.id}`)}>
      <MovieCard movie={movie} />
    </div>
  ));

  const handleSelectChange = (genreId: number) => {
    setMovieFilter((prev) => ({
      genreFilter: genreId,
      pageNumber: 0
     }));
  }

  const handlePageChange = (activePage: number) => {
    setMovieFilter((prev) => ({
      ...prev,
      pageNumber: activePage
    }));
  }

  return (
    <div className="container-xl py-3" id="movies-page-container">
      <div className="row mb-4">
        <div className="col-12">
          <div className="base-card" id="select-container">
            <GenreFilter
              onSelectChange={handleSelectChange}
            />
          </div>
        </div>
      </div>
      { isLoading ? (
        <div className="col-12">
          <AnimesLoader />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-lg-4">
          { content }
        </div>
      ) }
      { !isLoading && page && (
        <div className="py-3">
          <Pagination
            activePage={ page.number }
            pageCount={ page.totalPages }
            onPageChange={ handlePageChange }
          />
        </div>
      ) }

    </div>
  );
}

export default Movies;
