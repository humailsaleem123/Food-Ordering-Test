import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import Image from "next/image";
import { Button } from "primereact/button";
import Logo from "@/public/assets/images/spotDeliveryCover.png";

export default function AppBar() {
  const itemRenderer = (item: any) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items: any[] = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
  ];

  const start = (
    <Image
      alt="logo"
      className="mr-2"
      src={Logo.src}
      width={120}
      height={100}
      style={{ width: 120, height: "auto" }}
      priority
    />
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <Button
        icon="pi pi-sign-in"
        className="w-auto p-2 text-white bg-green-500 hover:bg-green-600"
        label="Login"
        severity="success"
        raised
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
}
