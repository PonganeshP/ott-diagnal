import React, { useEffect } from "react";

function NavBar(props) {
  let { movies, searchvalue, setFilteredList, setsearchvalue, title } = props;

  useEffect(() => {
    const searchList = movies.filter((item) => {
      return item.name.toLowerCase().indexOf(searchvalue.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  }, [searchvalue]);

  const handleChange = (event) => {
    setsearchvalue(event.target.value);
  };

  return (
    <div className="row mt-2 mb-2 nav-bar">
      <div className="col-1 col-sm-1 back-icon">
        <img
          src="/images/Back.png"
          className="backIcon img-fluid"
          alt="back icon"
        />
      </div>

      <div className="col-6 col-sm-7 heading">
        <h4>{title}</h4>
      </div>

      <div className="col-5 col-sm-4 search-input">
        <input
          type="input"
          value={searchvalue}
          onChange={handleChange}
          placeholder="...search..."
        />
      </div>
    </div>
  );
}

export default NavBar;
