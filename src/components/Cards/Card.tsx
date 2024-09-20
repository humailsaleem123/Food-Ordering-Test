import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Badge } from "primereact/badge";
import { Chip } from "primereact/chip";
import Image from "next/image";

export default function CardComponent({
  title,
  rating,
  icon,
  iconColor,
  placeId,
  categories,
  userRating,
}: CardsComponentProps) {
  const header = (
    <div className="w-max p-2">
      <Image alt="icon" src={icon} width={20} height={20} />
    </div>
  );

  const footer = (
    <Button
      className="w-full p-1 mt-2 text-white bg-green-500 hover:bg-green-600"
      label="Show On Map"
      severity="success"
      raised
    />
  );

  const categoriesChip = (
    <div className="card flex flex-wrap gap-2">
      {categories &&
        categories.map((category, index) => (
          <React.Fragment key={index}>
            <Chip label={category} icon="pi pi-apple" />
          </React.Fragment>
        ))}
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={<div className="truncate w-full">{title}</div>}
        subTitle={categoriesChip}
        // header={header}
        footer={footer}
        className="w-[15rem] md:w-[20rem] h-[15rem] flex flex-col justify-between"
        id={placeId}
      >
        <div className="flex justify-center items-center gap-2">
          <Rating value={rating} readOnly cancel={false} />
          <Badge value={userRating || 0} severity="success"></Badge>
        </div>
      </Card>
    </div>
  );
}

interface CardsComponentProps {
  title: string;
  rating: number;
  icon: string;
  iconColor: string;
  placeId: string;
  categories: string[];
  userRating: number;
}
