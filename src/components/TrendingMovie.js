import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

console.log(API_KEY);

class TrendingMovie extends Component {
  state = {
    trending: undefined,
    loading: true
  };
  componentDidMount() {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      .then(res => {
        const trending = res.data.results;
        this.setState({ trending, loading: false });
      });
  }

  render() {
    return (
      <div className="trending">
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <React.Fragment>
            <h3>Trending </h3>
            <div className="movie-list">
              {this.state.trending.map(movie => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div>
                    <img
                      alt={movie.original_title}
                      src={`http://image.tmdb.org/t/p/w342/${
                        movie.poster_path
                      }`}
                      className="movie-img"
                    />
                    <p className="movie-title">{movie.original_title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TrendingMovie;
