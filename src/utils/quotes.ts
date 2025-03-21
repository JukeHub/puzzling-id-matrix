
export const quotes = [
  "You've got skills that would make a calculator jealous!",
  "If puzzles were people, you'd be their favorite human.",
  "Your brain just bench-pressed this puzzle like it was nothing!",
  "Einstein would be giving you a standing ovation right now.",
  "You solved that faster than I can find matching socks!",
  "Your puzzle skills are so sharp, they could cut through diamonds!",
  "If determination was currency, you'd be a billionaire.",
  "Not all heroes wear capes, some just solve puzzles really well.",
  "You've got more problem-solving skills than a Swiss Army knife has tools!",
  "That wasn't just a win, that was a brain slam dunk!",
  "You didn't just solve it, you conquered it with style!",
  "Your persistence could give a stubborn mule lessons!",
  "Puzzles tremble at the mention of your name.",
  "Your brain cells just had an awesome party!",
  "If life gives you puzzles, solve them like you just did!",
  "That's not sweat on your brow, it's your awesome leaking out.",
  "You make solving puzzles look like a piece of cake... mmm, cake.",
  "Success is a puzzle, and you just found all the pieces!",
  "Your focus is so strong it could bend spoons!",
  "The puzzle gods are nodding in approval.",
  "You're not just smart, you're puzzle-solving smart!",
  "That wasn't luck – that was pure skill and awesomeness.",
  "Your brain just did a victory lap around this puzzle!",
  "If patience was an Olympic sport, you'd have gold medals!",
  "Challenges are just opportunities in disguise, and you just seized this one!",
  "You don't find solutions, solutions find you!",
  "That puzzle never stood a chance against your mighty brain!",
  "Your problem-solving skills are off the charts!",
  "Obstacles are those frightful things you see when you take your eyes off your goal – and you never did!",
  "The only puzzle you can't solve is how you got so good at solving puzzles!"
];

/**
 * Returns a random quote from the quotes array
 */
export const getRandomQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
