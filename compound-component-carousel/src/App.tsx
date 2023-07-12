import { ReactNode } from "react";
import "./App.css";
import Carousel from "./carousel/Carousel";

function App() {
  const images: ReactNode[] = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];

  return (
    <div className="main">
      <Carousel images={images} autoplay interval={3000}>
        <Carousel.SlidesContainer>
          <Carousel.Title text="Carousel" />
          <Carousel.Slides />
          <Carousel.Paging elementStyle="slide-paging-element-square" />
        </Carousel.SlidesContainer>
      </Carousel>
    </div>
  );
}

export default App;