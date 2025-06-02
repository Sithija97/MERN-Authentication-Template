import { Button, Input, Label } from "@/atoms";
import { cn } from "@/lib/utils";
import { FORGOT_PASSWORD, SIGN_UP } from "@/router";
import { Link } from "react-router-dom";

type IProps = {
  className?: string;
  props?: any;
};

export const SignIn = ({ className, props }: IProps) => {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"> Sign in to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to sign in to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to={FORGOT_PASSWORD}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
          Sign in
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={SIGN_UP} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
};
