import type { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return <article className="card">{children}</article>;
};

export default Card;
