import React from 'react';
import axios from 'axios';
import Form from './Form';

import { Link } from 'react-router-dom';

class MovieResults extends React.Component {
  state = {
    movies: {},
    page: 1,
    loading: true
  };

  getMovie = () => {
    const term = this.props.match.params.term;
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&query=${term}&page=${
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
                <h2>Results:</h2>

                <div className="movie-list">
                  {this.state.movies.results
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
        <div>
          {this.state.movies.page < this.state.movies.total_pages && (
            <div>
              <button onClick={this.loadMore}>Load more</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieResults;
