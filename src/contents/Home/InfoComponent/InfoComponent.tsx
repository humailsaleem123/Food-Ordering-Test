import React from "react";
import Image from "next/image";

function InfoComponent({
  title,
  description,
  img,
  height,
  width,
  alt,
  imgPosition,
}: InfoComponentProps) {
  return (
    <div className="md:container md:mx-auto mt-10 mb-10">
      <div className="flex justify-center items-center gap-2 flex-col xl:flex-row p-4">
        {imgPosition === "right" ? (
          <React.Fragment>
            <div className="w-full xl:w-[50rem]">
              <h4 className="text-4xl mb-4">{title}</h4>
              <p>{description}</p>
            </div>
            <div>
              <Image alt={alt} width={width} height={height} src={img} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <Image alt={alt} width={width} height={height} src={img} />
            </div>
            <div className="w-full xl:w-[50rem]">
              <h4 className="text-4xl mb-4">{title}</h4>
              <p>{description}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default InfoComponent;

export interface InfoComponentProps {
  title: string;
  description: string;
  img: string;
  height: number;
  width: number;
  alt: string;
  imgPosition: string;
}
