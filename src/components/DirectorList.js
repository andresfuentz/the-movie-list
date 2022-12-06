// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

// components
import MovieList from "./MovieList";

const DirectorList = ({ token, favs, addOrRemoveFromFavs }) => {
  const [directorList, setDirectorList] = useState([]);
  const [searchParams] = useSearchParams();

  let personID = searchParams.get("id");
  let personName = searchParams.get("name");

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US`;
    axios
      .get(endPoint)
      .then((response) => {
        setDirectorList(
          response.data.crew.filter((person) => person.job === "Director")
        );
      })
      .catch((err) => {
        swAlert(
          <>
            <h2>An error has occurred</h2>
            {console.log(err.message)}
          </>
        );
      });
  });

  return (
    <div className="row mb-4">
      {!token ? (
        <Navigate to={"/"} />
      ) : directorList.length === 0 ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <>
          <h2 className="d-flex justify-content-center mt-1">
            {personName} filmography:
          </h2>
          <MovieList
            movieList={directorList}
            favs={favs}
            addOrRemoveFromFavs={addOrRemoveFromFavs}
          />
        </>
      )}
    </div>
  );
};

export default DirectorList;