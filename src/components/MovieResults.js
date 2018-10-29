import React from 'react';
import axios from 'axios';
import Form from './Form';

import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

class MovieResults extends React.Component {
  state = {
    movies: {},
    page: 1,
    loading: true
  };

  getMovie = () => {
    const term = this.props.match.params.term;
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=${
        this.state.page
      }&include_adult=false`
    );
  };

  performSearch = () => {
    this.getMovie().then(res => {
      const movies = res.data;
      this.setState({
        movies,
        loading: false
      });
    });
  };

  performSearchMore = () => {
    this.getMovie().then(res => {
      const movies = res.data;
      this.setState({
        movies: {
          ...movies,
          results: [...this.state.movies.results, ...movies.results]
        },
        loading: false
      });
    });
  };

  loadMore = () => {
    this.setState(
      (prevState, props) => ({
        page: prevState.page + 1
      }),
      () => this.performSearchMore()
    );
  };

  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.term !== this.props.match.params.term) {
      this.setState(
        state => ({
          page: 1
        }),
        () => this.performSearch()
      );
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Form />
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <React.Fragment>
            {this.state.movies.results.length === 0 ? (
              <p>No movies found</p>
            ) : (
              <React.Fragment>
                <h3>Results for "{this.props.match.params.term}"</h3>

                <div className="movie-search-container">
                  {this.state.movies.results
                    .filter(img => img.poster_path)
                    .map(movie => {
                      return (
                        <Link
                          to={`/movie/${movie.id}`}
                          key={movie.id}
                          className="movie-item"
                        >
                          <img
                            alt={movie.original_title}
                            src={`http://image.tmdb.org/t/p/w342/${
                              movie.poster_path
                            }`}
                            className="movie-search-img"
                          />
                          <div className="movie-search-details">
                            <h3>{movie.original_title}</h3>
                            <p>{movie.overview}</p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        <div className="load">
          {this.state.movies.page < this.state.movies.total_pages && (
            <div className="load-button" onClick={this.loadMore}>
              Load more
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieResults;
