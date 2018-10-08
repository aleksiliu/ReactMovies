import React from 'react';
import axios from 'axios';
import Form from './Form';

import { Link } from 'react-router-dom';

class MovieResults extends React.Component {
  state = {
    movies: [],
    loading: true
  };

  performSearch = () => {
    const term = this.props.match.params.term;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&query=${term}&page=1&include_adult=false`
      )
      .then(res => {
        const movies = res.data.results;
        this.setState({ movies, loading: false });
      });
  };

  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.term !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <React.Fragment>
            <Form />
            {this.state.movies.length === 0 ? (
              <p>No movies found</p>
            ) : (
              <React.Fragment>
                <h2>Results:</h2>
                <div className="movie-list">
                  {this.state.movies
                    .filter(img => img.poster_path)
                    .map(movie => {
                      return (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                          <div>
                            <img
                              alt={movie.original_title}
                              src={`http://image.tmdb.org/t/p/w185/${
                                movie.poster_path
                              }`}
                            />
                            <p>{movie.original_title}</p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MovieResults;
