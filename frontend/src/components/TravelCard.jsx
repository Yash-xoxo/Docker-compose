import React from 'react';

const TravelCard = ({ destination, description, image }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl h-96">
      <img 
        src={image} 
        alt={destination} 
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
        <h3 className="text-2xl font-bold mb-2">{destination}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default TravelCard;