import PropTypes from "prop-types";

const Card = ({ day, img, maxDegrees, minDegrees }) => {
  return (
    <div className="card-container">
      <span className="day">{day}</span>
      <img className="card-img" src={`./public/img/${img}.png`} />
      <div className="max-min-container">
        <div>
          <span className="max-degrees">{maxDegrees}°C</span>
        </div>
        <div>
          <span className="min-degrees">{minDegrees}°C</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  day: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  maxDegrees: PropTypes.number.isRequired,
  minDegrees: PropTypes.number.isRequired,
};
