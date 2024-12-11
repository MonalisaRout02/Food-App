import ShimmerUI from "./ShimmerUI";
import RestaurantCard from "./RestaurantCard";

import { useEffect, useState } from "react";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  

  function HandleClick() {
    const filteredData = resList.filter((item) => item.info.avgRating > 4.3);
 
    setFilteredData(filteredData);
  }

  function HandleSearch() {

    
    const searchedData = resList.filter((item) => item.info.name.toLowerCase().includes(input.toLowerCase()));
    setFilteredData(searchedData);

    
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8452145&lng=77.6601695&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json);

    setResList(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 
    
  };

  return filteredData.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="input-button">
          <input
            type="text"
            className="search-box"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              
            }}
          />
          <button className="search-button" onClick={HandleSearch}>
            search
          </button>
        </div>
        <button className="top-button" onClick={HandleClick}>
          Top Restuarants
        </button>
      </div>
      <div className="card-container">
        {filteredData.map((item) => (
          <RestaurantCard key={item.info.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Body;
