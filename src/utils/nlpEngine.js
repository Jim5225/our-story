import stringSimilarity from 'string-similarity';

/**
 * Normalizes text to improve matching accuracy.
 * Handles lowercasing, basic punctuation removal.
 */
function normalizeText(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ");
}

/**
 * Compares a user's answer against a list of expected answers.
 * Returns an object containing the match score (0-100) and the best matching expected string.
 * 
 * @param {string} userAnswer - The text the user typed.
 * @param {Array<string>} expectedAnswers - Array of acceptable answers from the config.
 * @returns {Object} { score: number, matchedAnswer: string }
 */
export function evaluateAnswer(userAnswer, expectedAnswers) {
  if (!userAnswer || !expectedAnswers || expectedAnswers.length === 0) {
    return { score: 0, matchedAnswer: null };
  }

  const normalizedUser = normalizeText(userAnswer);
  
  // Also normalize expected answers for comparison
  const normalizedExpected = expectedAnswers.map(ans => normalizeText(ans));

  // Find the best match using Dice's Coefficient (string-similarity)
  const matches = stringSimilarity.findBestMatch(normalizedUser, normalizedExpected);
  
  const bestMatchIndex = matches.bestMatchIndex;
  
  // Calculate a final score from 0 to 100 based on the similarity rating
  // We boost it slightly to be generous for small typos.
  let rating = matches.bestMatch.rating;
  
  // If the user's answer includes the expected word (or vice versa), bump the score
  if (normalizedUser.includes(normalizedExpected[bestMatchIndex]) || 
      normalizedExpected[bestMatchIndex].includes(normalizedUser)) {
      rating = Math.max(rating, 0.75);
  }

  let finalScore = Math.round(rating * 100);
  
  // Cap at 100
  if (finalScore > 100) finalScore = 100;

  return {
    score: finalScore,
    matchedAnswer: expectedAnswers[bestMatchIndex] // Return original casing for matched answer
  };
}

/**
 * Calculate cumulative category scores based on all answered questions.
 * @param {Array<Object>} answers - Array of answer results [{ questionId, score }]
 * @param {Array<Object>} questionsConfig - The questions array from config
 */
export function calculateCategoryScores(answers, questionsConfig) {
  const categories = {
    emotional: { totalWeight: 0, achieved: 0 },
    memory: { totalWeight: 0, achieved: 0 },
    communication: { totalWeight: 0, achieved: 0 },
    future: { totalWeight: 0, achieved: 0 },
    comfort: { totalWeight: 0, achieved: 0 },
    support: { totalWeight: 0, achieved: 0 },
    understanding: { totalWeight: 0, achieved: 0 },
    observation: { totalWeight: 0, achieved: 0 },
    loveLanguage: { totalWeight: 0, achieved: 0 }
  };

  answers.forEach(ans => {
    const question = questionsConfig.find(q => q.id === ans.questionId);
    if (!question) return;

    // Distribute the score across the question's weights
    Object.keys(question.weights).forEach(category => {
      if (categories[category]) {
        const weight = question.weights[category];
        categories[category].totalWeight += weight;
        // The points achieved for this category is (score % * weight)
        categories[category].achieved += (ans.score / 100) * weight;
      }
    });
  });

  // Calculate final percentages per category
  const finalCategoryScores = {};
  Object.keys(categories).forEach(cat => {
    if (categories[cat].totalWeight > 0) {
      finalCategoryScores[cat] = Math.round((categories[cat].achieved / categories[cat].totalWeight) * 100);
    } else {
      finalCategoryScores[cat] = 0;
    }
  });

  return finalCategoryScores;
}
