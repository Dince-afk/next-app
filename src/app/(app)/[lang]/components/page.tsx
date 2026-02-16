import { BadgeDemo } from "@/components/demos/badges-demo";
import { AccordionDemo } from "@/components/demos/accordion-demo";
import { ButtonGroupDemo } from "@/components/demos/button-group-demo";
import { AvatarDemo } from "@/components/demos/avatar-demo";
import { AlertDialogDemo } from "@/components/demos/alert-dialog-demo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ItemDemo } from "@/components/demos/item-demo";
import { CalendarDemo } from "@/components/demos/calendar-demo";
import { CardDemo } from "@/components/demos/card-demo";
import { ComboboxDemo } from "@/components/demos/combobox-demo";
import { CommandDialogDemo } from "@/components/demos/command";
import { ContextMenuDemo } from "@/components/demos/context-menu-demo";
import { DataTableDemo } from "@/components/demos/data-table-demo";
import { Calendar22 } from "@/components/demos/date-picker-demo";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-10 py-16">
      <div className="flex gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </div>
      <ButtonGroupDemo />
      <div className="flex flex-col gap-4">
        <Input placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="file" placeholder="File" />
      </div>
      <Toggle>Toggle</Toggle>
      <div className="flex gap-3">
        <Checkbox id="checkbox" />
        <Label htmlFor="checkbox">Checkbox</Label>
      </div>
      <ComboboxDemo />
      <CardDemo />
      <AvatarDemo />
      <BadgeDemo />
      <AlertDialogDemo />
      <ItemDemo />
      <AccordionDemo />
      <Calendar22 />
      <CalendarDemo />
      <CommandDialogDemo />
      <ContextMenuDemo />
      <DataTableDemo />
    </div>
  );
}
