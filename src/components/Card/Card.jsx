import { useState } from "react";
import Button from "../Button/Button";
const Card = () => {
  const [count, setCount] = useState(1);
  const [price] = useState(12000);

  return (
    <div>
      <div>{price * count}</div>
      <Button
        type="gray"
        size="small"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </Button>
      {count}
      <Button
        type="gray"
        size="small"
        onClick={() => {
          setCount(count > 1 ? count - 1 : count);
        }}
      >
        -
      </Button>{" "}
      <br />
      <Button>افزودن به سبد خرید</Button>
    </div>
  );
};

export default Card;