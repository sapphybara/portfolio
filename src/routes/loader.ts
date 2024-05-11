import { username } from "@utils/AuthProvider";

const loader = async () => {
  const user = await username();
  return { user };
};

export default loader;
