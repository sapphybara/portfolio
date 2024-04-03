import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";

const portfolioItems = [
  {
    title: "HySCAN",
    subtitle: "Hydrogen Safety Codes & Standards Applicability Navigator",
    affiliation: "Pacific Northwest National Laboratory",
    description:
      "How do I as a developer support those who utilize hydrogen (H2) in identifying relevant codes and standards for their systems? How do we maintain up-to-date compliance? HySCAN, part of H2Tools, simplifies compliance with intuitive workflows. Developed with ReactJS and styled-components, it swiftly identifies areas of compliance and categorizes questions, empowering users with tailored solutions.",
    techStack: ["ReactJS", "styled-components", "Figma"],
  },
];

const Portfolio = () => {
  return (
    <Box className="w-full" component="section">
      <Typography variant="decoration">Check out my</Typography>
      <Typography className="decorated" variant="h1">
        Portfolio
      </Typography>
      <Box className="mt-12 max-w-xl">
        <Typography variant="h2">Overview</Typography>
        <Typography className="mt-8" paragraph>
          As a frontend developer and designer, I bring a versatile skill set
          that combines technical expertise with a keen eye for aesthetics and
          user experience.
        </Typography>
        <Typography paragraph>
          To view more about the individual skills and experience I have,&nbsp;
          <Link href="/resume">click here</Link>.
        </Typography>
      </Box>
      {portfolioItems.map(
        ({ title, subtitle, affiliation, description, techStack }) => (
          <Card className="mb-4" key={title}>
            <CardHeader
              className="mx-4"
              title={title}
              titleTypographyProps={{ variant: "h3", component: "h3" }}
              subheader={subtitle}
              subheaderTypographyProps={{ variant: "h4", component: "h4" }}
            />
            <CardContent className="mx-8">
              <Typography variant="h5">Description</Typography>
              <Typography paragraph>{description}</Typography>
              <Typography variant="h5">Affiliation</Typography>
              <Typography paragraph>{affiliation}</Typography>
              <Typography variant="h5">Tech Stack</Typography>
              <Typography paragraph>{techStack.join(", ")}</Typography>
            </CardContent>
          </Card>
        )
      )}
    </Box>
  );
};

export default Portfolio;
