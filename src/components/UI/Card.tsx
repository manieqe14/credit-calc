import "./Card.css";
import React, {ReactNode} from 'react';

const Card: React.FC<{children: ReactNode, className?: string}> = (props) => {
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
