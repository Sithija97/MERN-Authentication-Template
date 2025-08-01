import { Button } from "@/atoms";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/atoms/input-otp";
import { cn } from "@/lib/utils";

type IProps = {
  className?: string;
  props?: any;
};

export const VerifyOTP = ({ className, props }: IProps) => {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify Email</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Please introduce the 6-digit code we sent via email to verify your
          account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex justify-center items-center">
          <InputOTP input-otp={" "} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700">
          Verify Email OTP
        </Button>
      </div>
    </form>
  );
};
