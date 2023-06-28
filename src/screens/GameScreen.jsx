/**
 * GameScreen
 */

import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import CardComponent from "../components/CardComponent";
import MusicComponent from "../components/MusicComponent";
import Correct from "/assets/correct.mp3";
import Wrong from "/assets/incorrect.mp3";
import ModalComponent from "../components/ModalComponent";
import TickingMusic from "/assets/ticking.mp3";
import { useNavigate } from "react-router-dom";

/* The `elements` constant is an array of objects. Each object represents a card in a memory game. Each
object has a `type` property, which represents the type of the card (e.g., "Sun", "Moon", "Star",
"Comet"), and an `image` property, which represents the path to the image file for that card. */
const elements = [
  {
    type: "Sun",
    image: "assets/sun.svg",
  },
  {
    type: "Moon",
    image: "assets/moon.svg",
  },
  {
    type: "Star",
    image: "assets/star.svg",
  },
  {
    type: "Comet",
    image: "assets/comet.svg",
  },
];

/**
 * The function `shuffleElements` takes an array of elements and shuffles their order randomly.
 * @returns The function `shuffleElements` returns the shuffled array of elements.
 */
const shuffleElements = (elements) => {
  const length = elements.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = elements[currentIndex];
    elements[currentIndex] = elements[randomIndex];
    elements[randomIndex] = temp;
  }
  return elements;
};

const GameScreen = () => {
  
  const [cards, setCards] = useState(
    shuffleElements.bind(null, elements.concat(elements))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [playSound] = useSound(TickingMusic, {
    volume: 0.25,
  });
  const [type, setType] = useState("");
  const [playCorrect] = useSound(Correct);
  const [playIncorrect] = useSound(Wrong);
  const Navigate = useNavigate();
  const timeout = useRef(null);

  /**
   * The function "disable" sets a variable to disable all cards.
   */
  const disable = () => {
    setShouldDisableAllCards(true);
  };

  /**
   * The function enables all cards by setting the shouldDisableAllCards state to false.
   */
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  /**
   * The function checks if all the cards have been cleared and navigates to a resolve page with a
   * success message if they have.
   */
  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === elements.length) {
      Navigate("/resolve", { state: { message: "You did it!" } });
    }
  };

  /**
   * The function evaluates whether two open cards in a memory game match or not, and performs
   * corresponding actions.
   * @returns nothing (undefined).
   */
  const evaluate = () => {
    const [firstCard, secondCard] = openCards;
    enable();
    if (cards[firstCard].type === cards[secondCard].type) {
      setClearedCards((matchedCards) => ({
        ...matchedCards,
        [cards[firstCard].type]: true,
      }));
      setType("correct");
      setShowModal(true);
      playCorrect();
      setOpenCards([]);
      return;
    }
    setType("incorrect");
    setShowModal(true);
    playIncorrect();
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  };

  /**
   * The function handles the click event on a card and updates the state accordingly.
   */
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((flipped) => [...flipped, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => clearTimeout(timeout);
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  /**
   * The function checks if a given index is included in an array called openCards.
   * @returns The function `checkisFlipped` returns a boolean value indicating whether the given
   * `index` is included in the `openCards` array.
   */
  const checkisFlipped = (index) => {
    return openCards.includes(index);
  };

  /**
   * The function `checkIsInactive` checks if a card is inactive based on its type.
   * @returns a boolean value.
   */
  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    if (seconds <= 10) {
      playSound();
    }
  }, [seconds, playSound]);

  useEffect(() => {
    if (seconds === 0) {
      Navigate("/resolve", {
        state: { message: "Oops you didn't find them all!" },
      });
    }
  }, [seconds, Navigate]);

  return (
    <div className="flex flex-col gap-y-2 h-screen bg-gray-200">
      <div className="flex justify-between items-center w-full p-4">
        <div className="text-5xl font-bold">{seconds}</div>
        <MusicComponent />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 justify-items-center gap-10 px-6 md:gap-4 md:px-4 ">
        {cards.map((element, index) => (
          <CardComponent
            key={index}
            index={index}
            card={element}
            onClick={handleCardClick}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(element)}
            isFlipped={checkisFlipped(index)}
          />
        ))}
      </div>
      <ModalComponent
        show={showModal}
        onClose={setShowModal}
        handleClose={() => setShowModal(false)}
        type={type}
      />
    </div>
  );
};

export default GameScreen;
