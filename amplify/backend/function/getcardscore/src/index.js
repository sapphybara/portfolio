/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const {
    creditLimit,
    minimumPayment,
    balance,
    apr,
    isEarningInterest,
    lastInterestAmount,
  } = event.source;

  // Define maximum thresholds
  const maxMinimumPayment = 500;
  const maxAPR = 35;
  const maxInterestAmount = 500;
  const maxCreditLimit = 50000;

  // Normalizing the values
  const normalizedMinimumPayment = minimumPayment / maxMinimumPayment;
  const normalizedBalance = balance / creditLimit;
  const aprScore = isEarningInterest ? (apr / maxAPR) : 0;
  const normalizedLastInterestAmount = lastInterestAmount / maxInterestAmount;
  const normalizedCreditLimit = creditLimit / maxCreditLimit;

  const score = (0.20 * normalizedMinimumPayment) +
    (0.20 * normalizedBalance) +
    (0.20 * aprScore) +
    (0.20 * normalizedLastInterestAmount) +
    (0.20 * (1 - normalizedCreditLimit));

  return score;
};
