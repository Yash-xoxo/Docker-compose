import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';

function App() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        console.log('Fetching destinations from:', `${process.env.REACT_APP_API_URL}/destinations`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/destinations`);
        console.log('Destinations data:', response.data);
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    
    fetchDestinations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Travozom
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Professional travel planning and personalized journey experiences
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
              C T O  
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
              Yash Gupta
            </button>
          </div>
        </div>
      </header>

      {/* Destinations Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most sought-after travel destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{dest.name}</h3>
              <p className="text-gray-600 mb-4">{dest.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Start Your Journey</h2>
              <p className="text-gray-600 mb-8 max-w-3xl">
                Fill out the form and our travel experts will create a personalized itinerary
                just for you. We'll handle all the details so you can focus on the adventure.
              </p>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Data Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <RegistrationList />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Wanderlust Travels</h3>
              <p className="text-gray-400">Professional travel planning services</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p> 2025 Wanderlust Travels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;