import "./style.css";
import confetti from "canvas-confetti";

document.addEventListener("DOMContentLoaded", () => {
  let count = 0;
  let numberGuess = null;
  let targetNumber = null;
  let userTest = 0;
  let restartClick = 0;

  const button = document.querySelector("#button");
  const resultDiv = document.querySelector("#result");
  const developper = document.querySelector("#developper");
  const reward = document.querySelector("#reward");
  const containerForm = document.querySelector("#container-form");
  let score = document.querySelector("#score");

  const handleFormSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    numberGuess = parseInt(formData.get("number"));
    console.log({ numberGuess });
    console.log("Bien le bonjour à toi ! ");
    game(numberGuess);
    score.textContent = numberGuess
      ? `Score : ${userTest}`
      : `Score : ${userTest + 0}`;
  };

  button.addEventListener("click", () => {
    count += 1;
    if (count === 1) {
      targetNumber = getRandomArbitrary(0, 500);
      console.log({ targetNumber });
      // score.textContent = "Score = 0";
      createForm();
    }
  });

  const createForm = () => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const submitButton = document.createElement("button");
    form.setAttribute("id", "form");
    form.classList.add("flex", "justify-center", "gap-5", "mt-10");
    input.placeholder = "Entre ton nombre";
    input.setAttribute("name", "number");
    input.setAttribute("id", "number");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("type", "number");
    input.setAttribute("min", "0");
    input.setAttribute("max", "500");
    submitButton.classList.add("mt-5");
    submitButton.textContent = "Envoyer";
    containerForm.innerHTML = "";

    form.append(input, submitButton);
    containerForm.append(form);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleFormSubmit(event);
      input.value = "";
    });
    button.remove();
  };

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const isvalidNumber = (number) => {
    return !Number.isNaN(number) && number >= 0 && number <= 500;
  };

  const game = (number) => {
    const answerNumberUser = () => {
      userTest++;

      let resultMessage = "";

      if (!isvalidNumber(number)) {
        resultMessage =
          "❌ Le caractère n'est pas valide. Cela doit être un nombre entre 0 et 500";
      } else if (number > targetNumber) {
        resultMessage =
          "❌ Le nombre entré est plus GRAND que le nombre mystère... Recommence !";
      } else if (number < targetNumber) {
        resultMessage =
          "❌ Le nombre entré est plus PETIT que le nombre mystère... Recommence !";
      } else {
        let essai = userTest === 1 ? "essai" : "essais";

        resultMessage = `✅ 🎊 💪🏻 Bien joué ! Le nombre mystère était : ${number}. Tu as réussi en ${userTest} ${essai} !`;
        reward.textContent =
          "💶 Tu as gagné 20% à la boutique Séphora de Vincennes ou Cours Saint Emillion";

        for (let i = 0; i < 8; i++) {
          confetti();
        }
        setTimeout(() => {
          developper.textContent = "Développé par Cédric C.";
        }, 1000);
        restartGame();
      }
      resultDiv.classList.add("text-white", "text-2xl");
      resultDiv.textContent = resultMessage;
    };

    answerNumberUser();
  };

  const restartGame = () => {
    restartClick += 1;
    if (restartClick === 1) {
      const restart = document.querySelector("#restart");
      const buttonRestart = document.createElement("button");
      buttonRestart.classList.add("text-2xl", "mt-10", "mb-10");
      buttonRestart.textContent = "Réessayer !";
      restart.append(buttonRestart);

      buttonRestart.addEventListener("click", () => {
        location.reload();
        //équivalent :
        // count = 0;
        // numberGuess = null;
        // getRandomArbitrary(0, 500);
        // userTest = 0;
        // resultDiv.textContent = "";
        // restart.innerHTML = "";
        // createForm();
      });
    }
  };
});
