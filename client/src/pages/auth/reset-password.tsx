import { Button, Input, Label } from "@/atoms";
import { cn } from "@/lib/utils";

type IProps = {
  className?: string;
  props?: any;
};

export const ResetPassword = ({ className, props }: IProps) => {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"> Reset Password</h1>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to reset your password
        </p> */}
      </div>
      <div className="grid gap-6">
        {/* <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div> */}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
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
          Submit
        </Button>
      </div>
    </form>
  );
};
