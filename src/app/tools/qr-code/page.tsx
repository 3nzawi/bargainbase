import { ToolShell, toolMetadata } from "@/components/ToolShell";
import { QrGenerator } from "./QrGenerator";

export const metadata = toolMetadata("qr-code");

export default function Page() {
  return (
    <ToolShell slug="qr-code">
      <QrGenerator />
    </ToolShell>
  );
}
