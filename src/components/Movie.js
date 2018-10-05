import React from 'react';
import axios from 'axios';

class Movie extends React.Component {
  state = {
    singleMovie: null,
    loading: true
  };

  componentDidMount() {
    const movieId = this.props.location.state.movieId;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US`
      )
      .then(res => {
        const singleMovie = res.data;
        this.setState({ singleMovie, loading: false });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="singleMovie">
          {this.state.loading ? (
            <div className="loader" />
          ) : (
            <React.Fragment>
              <img
                src={`http://image.tmdb.org/t/p/w185/${
                  this.state.singleMovie.poster_path
                }`}
                alt={this.state.singleMovie.original_title}
              />
              <p>{this.state.singleMovie.vote_average}</p>
              <h1>{this.state.singleMovie.original_title}</h1>
              <p>{this.state.singleMovie.release_date}</p>
              <p>{this.state.singleMovie.overview}</p>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Movie;
