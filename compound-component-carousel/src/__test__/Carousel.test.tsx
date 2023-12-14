import "@testing-library/jest-dom";
import {ReactNode}from "react";
import { render,fireEvent } from "@testing-library/react";
import Carousel from "../carousel/Carousel";
import "../carousel/styles/carousel.scss"

jest.mock("../carousel/styles/carousel.scss",()=>{});


describe("Carousel component", () => {
  const images: ReactNode[] = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];
  it("renders correctly", () => {
    const { container } = render(<Carousel images={images} />);
    expect(container).toMatchSnapshot();
  });

  it("handles click events for slideLeft and slideRight", () => {
    const { getByTestId } = render(<Carousel images={images} />);
    fireEvent.click(getByTestId("left-arrow"));
    // Add assertions for the expected state after clicking left arrow
    fireEvent.click(getByTestId("right-arrow"));
    // Add assertions for the expected state after clicking right arrow
  });

  // it("handles automatic slide rotation", () => {
  //   // Write test to ensure automatic rotation behaves as expected
  // });

  // // Add more tests for error cases, child components, and context as needed
});
