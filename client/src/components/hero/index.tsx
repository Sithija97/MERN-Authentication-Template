import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

export default function Hero() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={700}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Make money from <br />
            <Text as={"span"} color={"facebook.400"}>
              your audience
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"facebook"}
              bg={"facebook.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "facebook.500",
              }}
            >
              Get Started
            </Button>
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
