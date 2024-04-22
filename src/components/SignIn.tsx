import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SignIn = (props: {
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  return (
    <Stack
      alignItems="flex-start"
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (tabIndex === 0) {
          props.signIn(email, password);
        } else {
          props.signUp(email, password, confirmPassword);
        }
      }}
    >
      <Typography color="error">{props.error?.toString()}</Typography>
      <Tabs
        className="mb-4"
        onChange={(_e, value) => setTabIndex(value)}
        value={tabIndex}
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          className="w-[200px]"
          id="email"
          type="text"
          onChange={handleFormChange}
          value={email}
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
      {tabIndex === 1 && (
        <FormControl>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            className="w-[200px]"
            id="confirmPassword"
            type="password"
            onChange={handleFormChange}
            value={confirmPassword}
          />
        </FormControl>
      )}
      <Button
        color="primary"
        disabled={
          !email || !password || (tabIndex === 1 ? !confirmPassword : false)
        }
        type="submit"
        variant="contained"
      >
        Sign {tabIndex === 0 ? "In" : "Up"}
      </Button>
    </Stack>
  );
};

export default SignIn;
