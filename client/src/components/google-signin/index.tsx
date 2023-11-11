import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

type IProps = {
  handleSignInWithGoogle: () => void;
};

export const SignInWithGoogle = ({ handleSignInWithGoogle }: IProps) => {
  return (
    <Button
      w={"full"}
      maxW={"md"}
      variant={"outline"}
      leftIcon={<FcGoogle />}
      onClick={handleSignInWithGoogle}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
};
