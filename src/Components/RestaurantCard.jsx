import Img_url from "../utils/url";

const RestaurantCard = ({data}) => {

 const {name, cloudinaryImageId, costForTwo, cuisines, avgRating} = data?.info;

  return (
    <div className="restaurant-card">
        <img className="res-img" src={Img_url+cloudinaryImageId}/>
        <div className="res-info">
            <h3 className="text-large">{name}</h3>
            <h4 className="text-semibold">{costForTwo}</h4>
            <h4 className="text-regular">{cuisines.join(", ")}</h4>
            <h4 className="text-regular">{avgRating}</h4>
         
        </div>
      
    </div>
  )
}

export default RestaurantCard
