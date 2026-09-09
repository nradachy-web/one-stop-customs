import { cn } from "@/lib/utils";

interface ChipBoxProps {
  name: string;
  value: string;
  label: string;
  id: string;
  defaultChecked?: boolean;
  type?: "checkbox" | "radio";
  className?: string;
}

/**
 * A chip checkbox (docs/DESIGN.md 5.17): a real input, visually hidden, inside
 * a label that is the chip. Keyboard toggles it, screen readers announce a
 * checkbox (or radio), and :checked draws the 3px signal tab and the ink
 * border through .chipbox in globals.css. Uncontrolled on purpose: the form
 * posts natively with JavaScript off and defaultChecked carries a service
 * page's preset into the static HTML.
 */
export default function ChipBox({ name, value, label, id, defaultChecked, type = "checkbox", className }: ChipBoxProps) {
  return (
    <label htmlFor={id} className={cn("chipbox", className)}>
      <input type={type} id={id} name={name} value={value} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}
