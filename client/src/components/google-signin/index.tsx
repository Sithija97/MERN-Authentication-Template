import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../config/firebase";

export const SignInWithGoogle = () => {
  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
