

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const { minimumPayment, balance, apr, isEarningInterest, lastInterestAmount } = event.source;
    return .2 * minimumPayment * (balance - lastInterestAmount) + (apr / 12) * (balance - lastInterestAmount) + (isEarningInterest ? lastInterestAmount : 0);
};
