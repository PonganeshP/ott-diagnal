import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";

import InfiniteScroll from "react-infinite-scroll-component";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";

function App(props) {
  const [movies, setmovies] = useState([]);
  const [response, setresponse] = useState({});
  const [title, settitle] = useState("");
  const [hasMore, sethasMore] = useState(true);
  const [apiCount, setapiCount] = useState(1);

  const [searchvalue, setsearchvalue] = useState("");
  const [filteredList, setFilteredList] = useState(movies);

  const getResponseAPI = async () => {
    let count = apiCount;
    count++;
    setapiCount(count);
    if (apiCount >= 3) {
      sethasMore(false);
    }
    const url = `/API/CONTENTLISTINGPAGE-PAGE${apiCount}.json`;
    const resp = await fetch(url);
    const responseJson = await resp.json();
    if (responseJson) {
      let moviesList = await responseJson.page["content-items"].content;
      let title = await responseJson.page.title;

      setresponse({ ...response, ...responseJson });
      setmovies([...movies, ...moviesList]);
      setFilteredList([...movies, ...moviesList]);
      settitle(title);
    }
  };

  useEffect(() => {
    getResponseAPI();
  }, [searchvalue]);

  return (
    <div className="container-fluid">
      <NavBar
        searchvalue={searchvalue}
        setsearchvalue={setsearchvalue}
        setFilteredList={setFilteredList}
        title={title}
        movies={movies}
      />
      <InfiniteScroll
        dataLength={movies.length}
        next={getResponseAPI}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <MovieList movies={filteredList} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
