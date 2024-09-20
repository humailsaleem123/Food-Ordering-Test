import React from "react";

function Loader({
  classes,
  isShow,
  loadingText,
  instanceId,
  loaderId,
}: LoaderComponentsProps) {
  return (
    isShow &&
    instanceId === loaderId && (
      <div className={classes}>
        <div className="flex flex-col justify-center items-center">
          <span className="text-black text-2xl relative inline-flex space-x-1">
            <span className="inline-block w-[0.4rem] h-[0.4rem] bg-lime-400 rounded-full animate-bounce-1"></span>
            <span className="inline-block w-[0.4rem] h-[0.4rem] bg-lime-400 rounded-full animate-bounce-2"></span>
            <span className="inline-block w-[0.4rem] h-[0.4rem] bg-lime-400 rounded-full animate-bounce-3"></span>
          </span>
          {loadingText && (
            <p className="text-xl mt-3 text-black">{loadingText}</p>
          )}
        </div>
      </div>
    )
  );
}
export default Loader;

interface LoaderComponentsProps {
  classes: string;
  isShow: boolean;
  loadingText?: string;
  // DIFFERENT BEHAVIOR OF LOADER..
  loaderId: string;
  instanceId: string;
}
