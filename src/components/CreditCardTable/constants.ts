import { CCScoreLevel } from "types/global";

export const levels: CCScoreLevel[] = [1, 2, 3, 4];
export const levelColors: {
  [K in CCScoreLevel]: {
    color: "success" | "info" | "warning" | "error";
    label: string;
  };
} = {
  1: { color: "success", label: "low priority" },
  2: { color: "info", label: "mid priority" },
  3: { color: "warning", label: "high priority" },
  4: { color: "error", label: "max priority" },
};
