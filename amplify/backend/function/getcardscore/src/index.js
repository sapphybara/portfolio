

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const { minimumPayment, balance, apr, isEarningInterest, lastInterestAmount } = event.source;

  // Define the minimum and maximum values for each attribute
  const minMaxValues = {
    minimumPayment: [0, 300],
    balance: [0, 15000],
    apr: [0, 40],
    lastInterestAmount: [0, 500],
  };

  // Normalize the attributes
  const normalizedMinimumPayment = (minimumPayment - minMaxValues.minimumPayment[0]) / (minMaxValues.minimumPayment[1] - minMaxValues.minimumPayment[0]);
  const normalizedBalance = (balance - minMaxValues.balance[0]) / (minMaxValues.balance[1] - minMaxValues.balance[0]);
  const normalizedApr = (apr - minMaxValues.apr[0]) / (minMaxValues.apr[1] - minMaxValues.apr[0]);
  const normalizedLastInterestAmount = (lastInterestAmount - minMaxValues.lastInterestAmount[0]) / (minMaxValues.lastInterestAmount[1] - minMaxValues.lastInterestAmount[0]);

  // Assign weights to each attribute
  const weights = {
    minimumPayment: 0.1,
    balance: 0.2,
    apr: 0.4,
    lastInterestAmount: 0.3
  };

  // Compute score as a weighted sum of normalized attributes
  const score = weights.minimumPayment * normalizedMinimumPayment +
    weights.balance * normalizedBalance +
    weights.apr * normalizedApr +
    weights.lastInterestAmount * normalizedLastInterestAmount +
    (isEarningInterest ? 0.05 : 0); // bonus points for earning interest

  return score;
};
