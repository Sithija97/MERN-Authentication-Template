import { Button, Input, Label } from "@/atoms";
import { cn } from "@/lib/utils";
import { SIGN_IN } from "@/router";
import { Link } from "react-router-dom";

type IProps = {
  className?: string;
  props?: any;
};

export const SignUp = ({ className, props }: IProps) => {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign up to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to sign up to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="user" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="*********"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="*********"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
          Sign up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to={SIGN_IN} className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
};
