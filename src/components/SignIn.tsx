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
import { Form, useActionData, useLocation } from "react-router-dom";
import { LoaderActionError } from "types/global";

const SignIn = () => {
  const actionData = useActionData() as LoaderActionError | undefined;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

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
    <Stack alignItems="flex-start" component={Form} method="post" replace>
      <Typography variant="decoration">Please</Typography>
      <Typography variant="h1">Sign In</Typography>
      <Input name="tabIndex" type="hidden" value={tabIndex} />
      <Input name="redirectTo" type="hidden" value={from} />
      <Typography color="error">{actionData?.status}</Typography>
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
          name="email"
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
          name="password"
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
            name="confirmPassword"
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
