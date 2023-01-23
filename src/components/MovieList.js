import React from "react";

function MovieList(props) {
  return (
    <div className="row">
      {props.movies.map((movie, index) => (
        <div className="col-4 col-sm-2 movie-tile" key={index}>
          <img
            className="img-fluid"
            alt="movie"
            src={`/images/${movie["poster-image"]}`}
            onError={(event) =>
              (event.target.src = "/images/placeholder_for_missing_posters.png")
            }
          />
          <p className="movie-name">{movie.name}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
