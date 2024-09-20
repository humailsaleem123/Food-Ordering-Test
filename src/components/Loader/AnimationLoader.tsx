import React, { CSSProperties, useContext } from "react";
import HashLoader from "react-spinners/HashLoader";

function AnimationLoader() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="sweet-loading">
      <HashLoader
        color="green"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default AnimationLoader;
