import PropTypes from "prop-types";

const Card2 = ({ title2, dataN, unit, element }) => {
  return (
    <div className="cardContainerA">
      <div className="title2-container">
        <span>{title2}</span>
      </div>
      <div className="dataN-container">
        <span className="dataN">{dataN}</span>
        <span>{unit}</span>
      </div>
      <div className="element">{element}</div>
    </div>
  );
};

export default Card2;

Card2.propTypes = {
  title2: PropTypes.string.isRequired,
  dataN: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  element: PropTypes.element,
};
