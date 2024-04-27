import { Roles } from "types/global";

export const isRole = (role: unknown): role is Roles => {
  console.log(role);
  return (
    typeof role === "string" &&
    ["developer", "designer"].includes(role.toLowerCase())
  );
};
