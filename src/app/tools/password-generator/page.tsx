import { ToolShell, toolMetadata } from "@/components/ToolShell";
import { PasswordGenerator } from "./PasswordGenerator";

export const metadata = toolMetadata("password-generator");

export default function Page() {
  return (
    <ToolShell slug="password-generator">
      <PasswordGenerator />
    </ToolShell>
  );
}
