import { Params } from "react-router-dom";
import portfolioCards from "src/assets/json/portfolio_cards.json";

const loader = ({ params }: { params: Params<string> }) => {
  const { projectId } = params;
  return portfolioCards.find((card) => card.id === projectId) ?? null;
};

export default loader;
