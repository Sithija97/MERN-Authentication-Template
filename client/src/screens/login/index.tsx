import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Link,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DASHBOARD, REGISTER } from "../../routes";
import { loginInputs } from "../../models";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../../store/auth/authslice";
import { Loader, SignInWithGoogle } from "../../components";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading } = useAppSelector((state: RootState) => state.auth);

  const bgColorFlex = useColorModeValue("gray.50", "gray.800");
  const bgColorBox = useColorModeValue("white", "gray.700");

  const handleSubmit = async (values: loginInputs) => {
    const response = await dispatch(login(values));
    if (response.meta.requestStatus === "fulfilled") {
      formik.resetForm();
      navigate(DASHBOARD);
    }
    if (response.meta.requestStatus === "rejected") {
      toast({
        title: response.payload,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColorFlex}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={bgColorBox} boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="email"
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"facebook.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"facebook.400"}
                  color={"white"}
                  _hover={{
                    bg: "facebook.500",
                  }}
                >
                  Sign in
                </Button>
                <SignInWithGoogle />
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account?{" "}
                  <Link as={RouterLink} to={REGISTER} color={"facebook.400"}>
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
