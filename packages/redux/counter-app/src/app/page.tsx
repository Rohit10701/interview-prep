"use client"
import { decrement, increment, selectCount } from "@/redux/counterSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch()
  const counter = useSelector(selectCount)


  const handleIncrement = () => {
    dispatch(increment())
  }
  const handleDecrement = () => {
   dispatch(decrement())
  }

  return (
    <>
      <h1>Counter App</h1>
      <div>{counter}</div>
      <div>
        <button onClick={() => handleIncrement()}>+</button>
        <button onClick={() => handleDecrement()}>-</button>
        </div>
    </>
  );
}
