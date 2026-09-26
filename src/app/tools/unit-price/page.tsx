import { ToolShell, toolMetadata } from "@/components/ToolShell";
import { UnitPriceComparer } from "./UnitPriceComparer";

export const metadata = toolMetadata("unit-price");

export default function Page() {
  return (
    <ToolShell slug="unit-price">
      <UnitPriceComparer />
    </ToolShell>
  );
}
