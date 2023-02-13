import { Movie } from "../../types/domain/Movie"
import './styles.css';

type Props = {
  movie: Movie;
}

const MovieDetailsCard = ({ movie }: Props) => {

  return (
    <div id="movie-details-container" className="base-card p-3 p-lg-4">
      <div className="row" id="movie-details-card">
        <div className="col-12 col-xl-6" id="movie-image-container">
          <img className="img-fluid w-100" src={ movie.imgUrl } />
        </div>
        <div className="col-12 col-xl-6 p-3 p-xl-4 pb-0 py-xl-0">
          <h1 className="fw-bold">{movie.title}</h1>
          { movie.subTitle && <h2>{ movie.subTitle }</h2> }
          <p className="primary-color fs-5 mb-1">{ movie.year }</p>
          <span className="fs-5">Gênero: </span>
          <div className="alert alert-dark py-1 d-inline fs-5" role="alert">
            { movie.genre.name }
          </div>
          <div id="sinopse-container" className="p-2 mt-3">
            { movie.synopsis }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
