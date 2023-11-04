import { Center, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Center my="10" w="100%" h="100vh">
      <Spinner />
    </Center>
  );
};
