'use client';

import Loading from '@/components/Loading';
import { useAccount } from '@/hooks/useAccount';
import { uploadWeb3Storage, web3StorageLink } from '@/services/web3Storage';
import { shortenAddress } from '@/utils/string';
import { useSendTransaction, useUniversalDeployerContract } from '@starknet-react/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Mint() {
  const [nft, setNft] = useState<any>()
  const [status, setStatus] = useState(0)
  const { address } = useAccount();
  const router = useRouter()
  const { collection, tokenid } = router.query;

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

  useEffect(() => {
    const getNFT = async (collection: string) => {
      const bgResponse = await fetch(`/api/nft?contractAddress=${collection}&tokenId=${tokenid}`);
      const response = await bgResponse.json()
      setNft(response.token)
    }

    if(collection) getNFT(collection as string)
  }, [collection])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to a server
    setStatus(1) // start upload
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
          <figure className='h-80'>
            {nft ? <img
              src={`${nft.image}`}
              alt="Shoes"
              className='h-full w-full object-contain' /> :
              <div className='skeleton w-full h-full'></div>
            }
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {nft ? nft.name : <div className='skeleton w-36 h-8'/>}
            </h2>
            <p>{nft ? nft.description : <div className='skeleton w-full h-20'></div>}</p>
            <div className="card-actions justify-between">
              <div>{collection && shortenAddress(collection as string)}</div>
              <div className="badge badge-outline">{nft ? nft.id : <div className='skeleton w-10 h-3'/>}</div>
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
