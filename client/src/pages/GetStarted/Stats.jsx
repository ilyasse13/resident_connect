import React, { useEffect, useState } from 'react';

const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const easeOut = (t) => t * (2 - t); // Custom easing function for deceleration
    const updateCount = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= duration * 1000) {
        setCount(end); // Ensure the final value is reached
      } else {
        const progress = elapsedTime / (duration * 1000);
        const easedProgress = easeOut(progress);
        const newValue = Math.floor(easedProgress * end);
        setCount(newValue);
        requestAnimationFrame(updateCount); // Request next animation frame
      }
    };
    updateCount();
  }, [end, duration]);

  return <span>{count}</span>;
};

const Stats = () => {
  return (
    <div className="bg-gray-900 text-white py-20 text-center my-5 mx-2 rounded-xl">
      <h2 className="text-4xl font-bold mb-6">Our Achievements</h2>
      <div className="flex justify-center space-x-8">
        <div>
          <h3 className="text-6xl font-bold">
           +<Counter end={50} duration={9} />
          </h3>
          <p className='mt-3 text-lg font-semibold'>Residence using our App</p>
        </div>
        <div>
          <h3 className="text-6xl font-bold">
           +<Counter end={1000} duration={10} />
          </h3>
          <p className='mt-3 text-lg font-semibold'> Total users as Residents </p>
        </div>
        
      </div>
    </div>
  );
};

export default Stats;
