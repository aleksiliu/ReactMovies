import React from 'react';
import axios from 'axios';
import Error from './Error';

import { Link } from 'react-router-dom';

class Actor extends React.Component {
  state = {
    actor: undefined,
    loading: true,
    sortedBy: 'rating',
    error: false
  };

  componentDidMount() {
    const id = this.props.match.params.actorId;

    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=b0994f6029743a2f030a3fed34413897&language=en-US&&append_to_response=movie_credits`
      )
      .then(res => {
        const actor = res.data;
        this.setState({ actor, loading: false });
      })
      .catch(error => {
        console.log('error: ' + error);
        this.setState({ error: true });
      });
  }

  handleChange = event => {
    this.setState({ sortedBy: event.target.value });
  };

  ellipsis = string => {
    if (string.length > 422) return string.substring(0, 422) + '...';
    else return string;
  };

  render() {
    if (this.state.error) {
      return <Error />;
    }

    return (
      <div className="wrapper">
        {this.state.loading ? (
          <div className="loader" />
        ) : (
          <React.Fragment>
            <div className="actor">
              <div className="actor-bio flex">
                <h1> {this.state.actor.name} </h1>
                <h3> {this.state.actor.birthday} </h3>
                {this.state.actor.biography === '' ? (
                  <p>No bio</p>
                ) : (
                  <p>{this.ellipsis(this.state.actor.biography)}</p>
                )}
              </div>
              <div className="actor-img flex">
                <img
                  alt={this.state.actor.name}
                  src={`http://image.tmdb.org/t/p/w500/${
                    this.state.actor.profile_path
                  }`}
                  className="movie-img"
                />
              </div>
            </div>
            <h3>Filmography</h3>
            <div className="sort">
              <p>Sort by</p>
              <select value={this.state.sortedBy} onChange={this.handleChange}>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="movie-list">
              {[...this.state.actor.movie_credits.cast]
                .sort((a, b) => {
                  switch (this.state.sortedBy) {
                    case 'newest':
                      return (
                        new Date(b.release_date) - new Date(a.release_date)
                      );
                      break;
                    case 'oldest':
                      return (
                        new Date(a.release_date) - new Date(b.release_date)
                      );
                      break;
                    default:
                      return b.vote_average - a.vote_average;
                  }
                })
                .filter(img => img.poster_path)
                .map(movie => {
                  return (
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
                        <p className="movie-title">
                          {movie.release_date.substring(0, 4)}
                        </p>
                        {movie.vote_average !== 0 && (
                          <p className="movie-title">{movie.vote_average}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Actor;
