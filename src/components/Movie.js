import React from 'react';
import axios from 'axios';

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
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Movie;
