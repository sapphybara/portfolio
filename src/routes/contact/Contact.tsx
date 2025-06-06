import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Form, useActionData } from "react-router-dom";
import { ContactFormField, LoaderActionError } from "types/global";
import DecoratedHeader from "@/components/DecoratedHeader";

const formFields: ContactFormField[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "subject", label: "Subject", type: "text" },
  { key: "message", label: "Message", type: "text" },
];

const Contact = () => {
  const actionData = useActionData() as LoaderActionError | null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (actionData?.status === "success") {
    return (
      <>
        <DecoratedHeader
          decoration="thanks for"
          header="Reaching Out"
          level={1}
        />
        <Typography className="mt-4" paragraph>
          Your message has been sent successfully. I'll get back to you as soon
          as possible.
        </Typography>
      </>
    );
  }

  return (
    <section>
      <DecoratedHeader decoration="get in" header="Contact" level={1} />
      <Typography paragraph>
        If you'd like to get in touch with me, please fill out the form below. I
        am currently accepting freelance work and am open to new opportunities.
        Reach out to me and I'll get back to you as soon as possible.
      </Typography>
      <Stack
        component={Form}
        direction="row"
        flexWrap="wrap"
        gap={2}
        method="post"
        onSubmit={() => setIsSubmitting(true)}
      >
        {actionData?.status && (
          <Typography className="w-full" color="error">
            {actionData.status}
          </Typography>
        )}
        {formFields.map(({ key, label, type }) => {
          const isMessage = key === "message";

          return (
            <TextField
              fullWidth={isMessage}
              id={key}
              key={key}
              label={label}
              minRows={isMessage ? 4 : undefined}
              multiline={isMessage}
              name={key}
              required={!isMessage}
              type={type}
            />
          );
        })}
        <Button disabled={isSubmitting} type="submit" variant="contained">
          Send
        </Button>
      </Stack>
    </section>
  );
};

export default Contact;
