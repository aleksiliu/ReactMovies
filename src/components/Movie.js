import React from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

class Movie extends React.Component {
  state = {
    singleMovie: undefined,
    loading: true
  };

  componentDidMount() {
    const id = this.props.match.params.movieId;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&append_to_response=credits`
      )
      .then(res => {
        const singleMovie = res.data;
        this.setState({ singleMovie, loading: false });
      });
  }

  render() {
    return (
      <div className="singleMovie">
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <React.Fragment>
            <div
              className="bg"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0), rgba(27, 33, 47, 0.9)), url(http://image.tmdb.org/t/p/w1280/${
                  this.state.singleMovie.backdrop_path
                })`
              }}
            >
              <div className="movie">
                <div className="poster">
                  <img
                    src={`http://image.tmdb.org/t/p/w185/${
                      this.state.singleMovie.poster_path
                    }`}
                    alt={this.state.singleMovie.original_title}
                  />
                </div>
                <div className="movie-details">
                  <p>{this.state.singleMovie.release_date}</p>
                  <h1>{this.state.singleMovie.original_title}</h1>
                  {this.state.singleMovie.vote_average !== 0 && (
                    <div className="star">
                      <StarRatingComponent
                        name="rate2"
                        editing={false}
                        starCount={10}
                        value={this.state.singleMovie.vote_average}
                      />
                      <span>{this.state.singleMovie.vote_average} / 10</span>
                    </div>
                  )}
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
                            <li key={cast.name}>
                              <img
                                className="cast_img"
                                src={`http://image.tmdb.org/t/p/w185/${
                                  cast.profile_path
                                }`}
                                alt={cast.original_title}
                              />
                              <p>{cast.name}</p>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Movie;
