import { Button, FormControl, Input, InputLabel, Stack } from "@mui/material";
import { useState } from "react";
import { useAuth } from "src/hooks/useAuth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Stack
      alignItems="flex-start"
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        signIn(username, password);
      }}
    >
      <FormControl>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          className="w-[200px]"
          id="username"
          type="text"
          onChange={handleFormChange}
          value={username}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          className="w-[200px]"
          id="password"
          type="password"
          onChange={handleFormChange}
          value={password}
        />
      </FormControl>
      <Button color="primary" type="submit" variant="contained">
        Sign In
      </Button>
    </Stack>
  );
};

export default SignIn;
