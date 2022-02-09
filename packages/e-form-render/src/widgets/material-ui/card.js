import React from "react";
import "./card.less";

const Card = ({ title, column = 1, layout = "vertical", children }) => {
  return (
    <div className={`v-card-container v-card-container-${layout}`}>
      {title && (
        <div className="v-card-head">
          <div className="v-card-head-wrapper">
            <div className="v-card-title">{title}</div>
            {/* <div className="v-card-extra">{extra}</div> */}
          </div>
        </div>
      )}
      <div className={`v-card-body`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
