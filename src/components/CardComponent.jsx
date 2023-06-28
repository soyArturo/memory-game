/**
 * CardComponent component.
 * 
 * @param {Function} onClick - The onClick function.
 * @param {Object} card - The card object.
 * @param {Number} index - The index of the card.
 * @param {Boolean} isInactive - The isInactive boolean.
 * @param {Boolean} isFlipped - The isFlipped boolean.
 * @param {Boolean} isDisabled - The isDisabled boolean.
 */

import ReactCardFlip from "react-card-flip";

const CardComponent = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}) => {
  /**
   * The handleFlip function checks if a card is not flipped and not disabled, and then calls the
   * onClick function with the index as an argument.
   */
  const handleFlip = () => {
    if (!isFlipped && !isDisabled) {
      onClick(index);
    }
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div
        className={
          isInactive
            ? "opacity-0"
            : "flex justify-center items-center h-40 w-28 md:h-48 md:w-36 text-5xl text-yellow-300 rounded-md bg-blue-800 shadow-xl hover:cursor-pointer"
        }
        onClick={handleFlip}
      >
        ?
      </div>
      <div
        className={
          isInactive
            ? "opacity-0"
            : "flex justify-center items-center h-40 w-28 md:h-48 md:w-36 text-5xl text-black rounded-md bg-white hover:cursor-pointer p-4"
        }
        onClick={handleFlip}
      >
        <img src={card.image} className="object-cover" />
      </div>
    </ReactCardFlip>
  );
};

export default CardComponent;
