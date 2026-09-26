import { ToolShell, toolMetadata } from "@/components/ToolShell";
import { DiscountCalculator } from "./DiscountCalculator";

export const metadata = toolMetadata("discount-calculator");

export default function Page() {
  return (
    <ToolShell slug="discount-calculator">
      <DiscountCalculator />
    </ToolShell>
  );
}
