import { Button, Input, Label } from "@/atoms";
import { cn } from "@/lib/utils";
import { SIGN_UP } from "@/router";
import { Link } from "react-router-dom";

type IProps = {
  className?: string;
  props?: any;
};

export const ForgetPassword = ({ className, props }: IProps) => {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"> Forget Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to reset your password
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
          Submit
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
