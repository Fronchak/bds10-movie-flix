import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import ReviewComponent from '../../components/ReviewComponent';
import AnimeDetailsLoader from '../../loaders/AnimeDetailsLoader';
import ReviewsLoader from '../../loaders/ReviewsLoader';
import { Movie } from '../../types/domain/Movie';
import { Review } from '../../types/domain/Review';
import { ValidationError } from '../../types/vendor/ValidationError';
import { hasAnyRole, isAuthenticated } from '../../util/auth';
import { getResponseStatusFromErrorRequest, isUnauthorized, isValidationError, requestBackend } from '../../util/request';
import './styles.css';


type ReviewForm = {
  text: string;
}

const MoviePage = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [serverError, setServerError] = useState<ValidationError | null>(null);
  const [ wasSubmit, setWasSubmit ] = useState<boolean>();
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(false);
  const [isSavingNewReview, setIsSavingNewReview] = useState<boolean>(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ReviewForm>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/movies/${ id }`,
      withCredentials: true
    }
    setIsLoadingMovie(true);
    requestBackend(config)
      .then((response) => {
        setMovie(response.data);
        setIsLoadingMovie(false);
      })
      .catch(() => {
        toast.error("Erro ao obter detalhes do movie");
      });
  }, [id]);

  const loadReviews = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/movies/${ id }/reviews`,
      withCredentials: true
    }
    setIsLoadingReviews(true);
    requestBackend(config)
      .then((response) => {
        setReviews(response.data);
        setIsLoadingReviews(false);
      })
      .catch(() => {
        toast.error('Erro em carregar as reviews');
      })
  }, [id]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);


  const onSubmit = (data: ReviewForm) => {
    console.log('data', data);
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `/reviews`,
      withCredentials: true,
      data: {
        ...data,
        movieId: id
      }
    }
    setIsSavingNewReview(true);
    requestBackend(config)
      .then(() => {
        setValue('text', '');
        setWasSubmit(false);
        toast.success('Review register with success');
        loadReviews();
      })
      .catch((e) => {
        const [isInvalidData, error] = isValidationError(e);
        if(isInvalidData) {
          setServerError(error);
        }
        toast.error('Error in saving review');
      })
      .finally(() => {
        setIsSavingNewReview(false);

      });
  }

  return (
    <div className="container py-3" id="movie-page-container">
      { isLoadingMovie ? (
        <AnimeDetailsLoader />
      ) : (
        movie && <MovieDetailsCard movie={movie} />
      ) }


      { hasAnyRole(['ROLE_MEMBER']) && (
      <div className="p-3 mt-3 base-card">
        <form onSubmit={handleSubmit(onSubmit)} id="review-form">
          <div className="mb-3">
            <input
            { ...register('text', {
              required: 'Campo obrigatório',
              pattern: {
                value: /[\S]+/,
                message: `A avaliação não pode estar em branco`
              }
            }) }
            type="text"
            name="text"
            id="text"
            placeholder='Deixe sua avaliação aqui'
            defaultValue={''}
            className={`form-control ${ wasSubmit ? errors.text ? 'is-invalid' : 'is-valid' : '' }`}
            />
            { serverError?.errors?.map((err) => (
              <div className="invalid-feedback d-block">
                { err.message }
              </div>
            )) }
            <div className="invalid-feedback d-block">
              { errors.text?.message }
            </div>
          </div>
          <div id="review-form-button-container">
            <button
              className="btn base-btn"
              type='submit'
              onClick={() => setWasSubmit(true)}
              >Salvar avaliação
              { isSavingNewReview && (
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) }
            </button>
          </div>
        </form>
      </div>
      ) }

      { isLoadingReviews ? (
        <div className="px-3 mt-3 pb-3 pt-1 base-card">
          <ReviewsLoader />
        </div>
      ) : (
        reviews.length > 0 ? (
          <div className="px-3 mt-3 pb-3 pt-1 base-card">
            { reviews.map((review) => (
              <div className="mb-1" key={review.id}>
                <ReviewComponent review={review} />
              </div>
            )) }
          </div>
        ) : (
          <div className="p-3 mt-3 base-card">
            <p className="mb-0 fs-4">Esse filme ainda não possui nenhuma review</p>
          </div>
        )
      ) }


    </div>
  );
}

export default MoviePage;
