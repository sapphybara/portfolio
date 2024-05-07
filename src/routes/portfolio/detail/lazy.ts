import { Params } from "react-router-dom";
import portfolioCards from "src/assets/portfolio_cards.json";

export const loader = ({ params }: { params: Params<string> }) => {
  const { projectId } = params;
  return portfolioCards.find((card) => card.id === projectId) ?? null;
};
