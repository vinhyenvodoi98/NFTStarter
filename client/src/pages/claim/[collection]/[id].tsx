'use client';

import Loading from '@/components/Loading';
import Traits from '@/components/Traits';
import UploadImage from '@/components/UploadImage';
import { useAccount } from '@/hooks/useAccount';
import { uploadWeb3Storage, web3StorageLink } from '@/services/web3Storage';
import { useSendTransaction, useUniversalDeployerContract } from '@starknet-react/core';
import { useState } from 'react';

export default function Mint() {
  const [image, setImage] = useState<File | null>(null);
  const [collection, setCollection] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [traits, setTraits] = useState<any>([])
  const [status, setStatus] = useState(0)
  const { udc } = useUniversalDeployerContract();
  const { address } = useAccount();

  // const { send, isPending, error, data } = useSendTransaction({
  //   calls:
  //     udc && address
  //       ? [
  //           udc.populate("deploy_contract", [
  //             ERC20_CLASS_HASH,
  //             23, // salt
  //             false, // fromZero
  //             getConstructorCalldata(address),
  //           ]),
  //         ]
  //       : undefined,
  // });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to a server
    console.log({ image, collection, name, description });
    setStatus(1) // start upload
    const cid = await uploadWeb3Storage(image)
    console.log(web3StorageLink(cid))
    setStatus(2) // set contract
    // send()
  };

  return (
    <div className="min-h-main flex items-center justify-center">
      <Loading state={status}/>
      <div className="container mx-auto px-4 max-w-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Claim your NFT
        </h1>
        <div className="card bg-base-100 w-96 shadow-xl mb-8">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
        <div className='w-96'>
          <button className='btn btn-primary w-full'>Claim</button>
        </div>
      </div>
    </div>
  );
};