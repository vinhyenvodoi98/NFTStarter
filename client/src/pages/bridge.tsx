'use client';

import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Bridge() {
  const [collection, setCollection] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

  const [from, setFrom] = useState({
    name: "Statknet",
    image: "/svg/starknet.svg"
  });
  const [to, setTo] = useState({
    name: "Ethereum",
    image: "/svg/ethereum.svg"
  });

  const swapStates = () => {
    setFrom((prev) => ({ ...to }));
    setTo((prev) => ({ ...from }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ collection, tokenId , recipientAddress,  from, to});
  };

  return (
  <div className="min-h-main mt-8 flex items-center justify-center">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800 text-start mb-4">
        NFT Bridges
      </h1>
      <p className='mb-4'>
        Easy to transfer NFTs Across Starknet and Ethereum.
      </p>

      <form className="grid grid-cols-3 gap-6" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="h-96 w-full col-span-2 flex items-center justify-center">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label htmlFor="collection" className="block text-gray-700 font-semibold mb-2">
              From *
            </label>
            <div className='flex gap-2 border rounded-full items-center p-2 '>
              <img src={`${from.image}`} className='w-10 h-10 rounded-full'/>
              <p>{from.name}</p>
            </div>
          </div>

          <div className='flex justify-center'>
            <button className="btn btn-circle btn-secondary"
              onClick={swapStates}
            >
              <ArrowsUpDownIcon className='h-6 w-6'/>
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="collection" className="block text-gray-700 font-semibold mb-2">
              To *
            </label>
            <div className='flex gap-2 border rounded-full items-center p-2'>
              <img src={`${to.image}`} className='w-10 h-10 rounded-full'/>
              <p>{to.name}</p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="collection" className="block text-gray-700 font-semibold mb-2">
              Collection *
            </label>
            <input
              type="text"
              id="collection"
              className="input input-bordered block w-full text-gray-700 border border-gray-300"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              placeholder="Enter contract address: 0x"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Token Id *
            </label>
            <input
              type="text"
              id="name"
              className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter token id: 1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
              Recipient address *
            </label>
            <input
              type="text"
              id="name"
              className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient address: 0x"
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary text-white py-2 px-4 rounded-full transition"
          >
            Bridge
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
