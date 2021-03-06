import React from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import Error from './Error';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

class Movie extends React.Component {
  state = {
    singleMovie: undefined,
    error: false,
    loading: true
  };

  componentDidMount() {
    const id = this.props.match.params.movieId;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
      )
      .then(res => {
        const singleMovie = res.data;
        this.setState({ singleMovie, loading: false });
      })
      .catch(error => {
        console.log('error: ' + error);
        this.setState({ error: true });
      });
  }

  render() {
    if (this.state.error) {
      return <Error />;
    }

    return (
      <div className="singleMovie">
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <React.Fragment>
            {this.state.singleMovie.backdrop_path !== null && (
              <div
                className="bg"
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0), rgba(27, 33, 47, 0.9)), url(http://image.tmdb.org/t/p/w1280/${
                    this.state.singleMovie.backdrop_path
                  }) top center / cover no-repeat`
                }}
              />
            )}
            <div className="movie">
              <div className="poster">
                <img
                  src={`http://image.tmdb.org/t/p/w185/${
                    this.state.singleMovie.poster_path
                  }`}
                  className="poster-img"
                  alt={this.state.singleMovie.original_title}
                />
              </div>
              <div className="movie-details">
                <p className="movie-details-date">
                  {this.state.singleMovie.release_date}
                </p>
                <h1>{this.state.singleMovie.original_title}</h1>

                {this.state.singleMovie.vote_average !== 0 && (
                  <div className="star">
                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      starCount={10}
                      value={this.state.singleMovie.vote_average}
                      emptyStarColor={'000'}
                    />
                    <span>{this.state.singleMovie.vote_average} / 10</span>
                  </div>
                )}
                <div>
                  <ul className="genres">
                    {this.state.singleMovie.genres.map(genre => (
                      <li>{genre.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                <p>{this.state.singleMovie.overview}</p>
              </div>
              {this.state.singleMovie.credits.cast.length !== 0 && (
                <div className="cast">
                  <h3>Cast</h3>
                  <ul className="cast_list">
                    {this.state.singleMovie.credits.cast
                      .slice(0, 10)
                      .filter(img => img.profile_path)
                      .map(cast => {
                        return (
                          <Link to={`/actor/${cast.id}`} key={cast.id}>
                            <li key={cast.name}>
                              <img
                                className="cast_img"
                                src={`http://image.tmdb.org/t/p/w185/${
                                  cast.profile_path
                                }`}
                                alt={cast.original_title}
                              />
                              <p className="sub-title">{cast.character}</p>
                              <p>{cast.name}</p>
                            </li>
                          </Link>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Movie;
