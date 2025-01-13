'use client';

import Loading from '@/components/Loading';
import Traits from '@/components/Traits';
import UploadImage from '@/components/UploadImage';
import { uploadWeb3Storage, web3StorageLink } from '@/services/web3Storage';
import { useState } from 'react';

export default function Mint() {
  const [image, setImage] = useState<File | null>(null);
  const [collection, setCollection] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [traits, setTraits] = useState<any>([])
  const [status, setStatus] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to a server
    console.log({ image, collection, name, description });
    setStatus(1) // start upload
    const cid = await uploadWeb3Storage(image)
    console.log(web3StorageLink(cid))
    setStatus(2) // set contract
  };

  return (
    <div className="min-h-main mt-8 flex items-center justify-center">
      <Loading state={status}/>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-start mb-4">
          Create an NFT
        </h1>
        <p className='mb-4'>
          Once your item is minted you will not be able to change any of its information.
        </p>

        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="h-96 w-full">
            <UploadImage size="big" setFile={setImage}/>
          </div>

          <div>
            <div className="mb-4">
              <label htmlFor="collection" className="block text-gray-700 font-semibold mb-2">
                Collection *
              </label>
              <input
                type="text"
                id="collection"
                className="input input-bordered block w-full text-gray-700 border border-gray-300"
                value={name}
                onChange={(e) => setCollection(e.target.value)}
                placeholder="Enter contract name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name *
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

            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="symbol"
                className="textarea h-28 block w-full text-gray-700 border border-gray-300 p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                External link
              </label>
              <input
                type="text"
                id="symbol"
                className="input input-bordered block w-full text-gray-700 border border-gray-300 p-2"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="Enter external link"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="symbol" className="block text-gray-700 font-semibold mb-2">
                Traits
              </label>
              <Traits setData={setTraits}/>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn btn-primary text-white py-2 px-4 rounded-full transition"
          >
            Create Contract
          </button>
        </form>
      </div>
    </div>
  );
};