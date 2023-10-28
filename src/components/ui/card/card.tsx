import { ReactNode } from "react";
import "./card.scss";

const Card = ({ children }: { children: ReactNode }) => (
  <div className="card">{children}</div>
);

const CardHeader = ({ children }: { children: ReactNode }) => (
  <div className="card__header">{children}</div>
);

const CardContent = ({ children }: { children: ReactNode }) => (
  <div className="card__content">{children}</div>
);

const CardFooter = ({ children }: { children: ReactNode }) => (
  <div className="card__footer">{children}</div>
);

export { Card, CardHeader, CardContent, CardFooter };
