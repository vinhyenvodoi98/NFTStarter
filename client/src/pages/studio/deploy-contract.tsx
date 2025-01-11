'use client';

import UploadImage from '@/components/UploadImage';
import { useState } from 'react';

export default function DeployContract() {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission logic, e.g., sending data to a server
      console.log({ image, name, symbol });
    };

    return (
      <div className="min-h-main flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Let's create a smart contract for your drop.
          </h1>
          <p className='mb-4'>You will need to deploy an ERC-721 contract onto the blockchain before you can create a drop.</p>

          <form className="p-6 rounded-lg" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="mb-10">
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                Upload logo Image
              </label>
              <UploadImage setFile={setImage}/>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Contract Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter contract name"
              />
            </div>

            {/* Symbol Input */}
            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                Contract Symbol
              </label>
              <input
                type="text"
                id="symbol"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter contract symbol"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary text-white py-2 px-4 rounded-full transition"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  };