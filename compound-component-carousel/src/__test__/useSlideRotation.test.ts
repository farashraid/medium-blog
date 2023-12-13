// useSlideRotation.test.ts
import { renderHook } from '@testing-library/react';
import useSlideRotation from '../carousel/hooks/useSlideRotation';
import { useState,useEffect, ReactNode } from 'react';

it("sss",()=>{

    const {result} = renderHook(() => {
        const [name, setName] = useState('')
        useEffect(() => {
          setName('Alice')
        }, [])
      
        return name
      })
      
      expect(result.current).toBe('Alice')
})
it("test",()=>{
  const images: ReactNode[] = [

    // <img src="https://picsum.photos/800/301/?random" alt="2" />,
    // <img src="https://picsum.photos/800/302/?random" alt="3" />,
    // <img src="https://picsum.photos/800/303/?random" alt="4" />,
    // <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];
  const interval = 1000
  const autoplay = true
  // const { currentSlideIndex, slides, slideLeft, slideRight, nextRef } = useSlideRotation({
    const { currentSlideIndex, slides, slideLeft, slideRight, nextRef } = useSlideRotation({
    images,
    interval,
    autoplay,
  });
  console.log(currentSlideIndex.current)
})