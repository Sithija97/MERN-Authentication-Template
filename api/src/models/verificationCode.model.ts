import mongoose, { Date, Document } from "mongoose";
import VerificationCodeType from "../constants/enums";

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  createdAt: Date;
  expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  "VerficationCode",
  verificationCodeSchema,
  "verification_codes"
);
export default VerificationCodeModel;
