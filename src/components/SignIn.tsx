import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";

const SignIn = (props: {
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmail(value);
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
        if (tabIndex === 0) {
          props.signIn(email, password);
        } else {
          props.signUp(email, password);
        }
      }}
    >
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
      <Button color="primary" type="submit" variant="contained">
        Sign In
      </Button>
    </Stack>
  );
};

export default SignIn;
