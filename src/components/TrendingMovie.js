import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class TrendingMovie extends Component {
  state = {
    trending: undefined,
    loading: true
  };
  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=b0994f6029743a2f030a3fed34413897`
      )
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
            <h2>Trending Movies</h2>
            <div className="trending_movie_list">
              {this.state.trending.map(movie => (
                <Link
                  to={{
                    pathname: `/movie/${movie.id}`,
                    movie: { movieId: movie.id }
                  }}
                >
                  <div key={movie.id}>
                    <img
                      alt={movie.original_title}
                      src={`http://image.tmdb.org/t/p/w185/${
                        movie.poster_path
                      }`}
                    />
                    <p>{movie.original_title}</p>
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
