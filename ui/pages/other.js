import { useState } from "react";

export default function Other() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "" : "hide"} onClick={toggle}>
      Hello World
    </div>
  );
}
