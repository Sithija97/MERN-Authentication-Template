import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
// import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import { changePassword, updateUser } from "../../store/auth/authslice";
import { LOGIN } from "../../routes";

const validationSchema = Yup.object().shape({
  username: Yup.string(),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  oldPassword: Yup.string().min(6, "Password must be at least 6 characters"),
});

export const Profile = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);

  const bgColorFlex = useColorModeValue("gray.50", "gray.800");
  const bgColorBox = useColorModeValue("white", "gray.700");

  const handlePasswordChange = async () => {
    const { oldPassword, password } = formik.values;
    const response = await dispatch(changePassword({ oldPassword, password }));
    if (response.meta.requestStatus === "fulfilled") {
      formik.resetForm();
      navigate(LOGIN);
      toast({
        title: response.payload.message,
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
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

  const handleProfileUpdate = async () => {
    const { username } = formik.values;
    await dispatch(updateUser({ username }));
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      photo: "https://i.ibb.co/4pDNDk1/avatar.png",
      password: "",
      oldPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  if (isLoading) return <Loader />;

  return (
    <Flex minH={"90vh"} align={"center"} justify={"center"} bg={bgColorFlex}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={bgColorBox}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userIcon">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={formik.values.photo}>
                {/* <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                /> */}
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl
          id="userName"
          isInvalid={formik.errors.username ? true : false}
        >
          <FormLabel>User name</FormLabel>
          <Input
            name="username"
            placeholder="user name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="oldPassword"
          isInvalid={formik.errors.oldPassword ? true : false}
        >
          <FormLabel>Old Password</FormLabel>
          <Input
            name="oldPassword"
            placeholder="old password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
          />
          <FormErrorMessage>{formik.errors.oldPassword}</FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          isInvalid={formik.errors.password ? true : false}
        >
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => {
              handlePasswordChange();
            }}
          >
            Change Password
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => {
              handleProfileUpdate();
            }}
          >
            Update Profile
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
