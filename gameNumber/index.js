import { prompt } from "./prompt.js";

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const isvalidNumber = (number) => {
  return !Number.isNaN(number) && number >= 0 && number <= 100;
};
const targetNumber = getRandomArbitrary(0, 100);
let userTest = 0;

const answerNumberUser = () => {
  const userGuess = Number(
    prompt("Entre un nombre entre 0 et 100 pour trouver le nombre mystère : ")
  );
  userTest++;
  if (!isvalidNumber(userGuess)) {
    console.log(
      "Le caractère n'est pas valide. Cela doit être un nombre entre 0 et 100"
    );
    answerNumberUser();
    return;
  }
  if (userGuess > targetNumber) {
    console.log(
      "❌ le nombre entré est plus GRAND que le nombre mystère...Recommence !"
    );
    answerNumberUser();
    return;
  }
  if (userGuess < targetNumber) {
    console.log(
      "❌ le nombre entré est plus PETIT que le nombre mystère...Recommence !"
    );
    answerNumberUser();
    return;
  }
  console.log(`✅ 🎊 💪🏻 Bien joué ! Le nombre mystère était : ${userGuess}
  Tu as réussi en ${userTest} essais ! 
  `);
};

answerNumberUser();
