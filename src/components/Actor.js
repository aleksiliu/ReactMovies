import React from 'react';
import axios from 'axios';
import Error from './Error';

import { Link } from 'react-router-dom';

class Actor extends React.Component {
  state = {
    actor: undefined,
    loading: true,
    cast: undefined,
    value: 'popular',
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
        const cast = res.data.movie_credits.cast.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        this.setState({ actor, cast, loading: false });
      })
      .catch(error => {
        console.log('error: ' + error);
        this.setState({ error: true });
      });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    switch (event.target.value) {
      case 'newest':
        this.setState({
          cast: this.state.cast.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          )
        });

        break;
      case 'popular':
        this.setState({
          cast: this.state.cast.sort((a, b) => b.vote_average - a.vote_average)
        });

        break;
    }
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
              <p>Sort by: </p>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="movie-list">
              {this.state.cast.filter(img => img.poster_path).map(movie => {
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
                      <p className="movie-title">{movie.release_date}</p>
                      <p className="movie-title">{movie.vote_average}</p>
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
