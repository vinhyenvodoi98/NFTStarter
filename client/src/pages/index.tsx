import Layout from '@/components/layout/Layout';

import Link from 'next/link';
import { useAccount } from '@starknet-react/core';
import { CustomConnectButton } from '@/components/CustomConnectButton';

export default function HomePage() {
  const {address} = useAccount()
  return (
    <Layout>
      <div className="flex items-center justify-center mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 items-center">
            {/* Feature 1 */}
            <div className="p-6 h-52 transform border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-1">

            </div>

            <div className="p-6 h-52 flex items-center transform border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-1">
              <h2 className="text-5xl font-bold text-center">NFTStarter</h2>
            </div>

            {/* Feature 2 */}
            <div className="p-6 h-52 transform border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-2">
              <h2 className="font-semibold mb-4 text-3xl">Lazy mint NFT on Startnet</h2>
            </div>

            <div className="h-52 transform border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-1">
              <div className='h-full w-full bg-cover bg-center' style={{ backgroundImage : `url('./imgs/man.png')`}} />
            </div>

            {/* Central Feature */}
            <div className="p-8 h-full transform border-base-content/20 hover:border-base-content/40 border row-span-2 col-span-2">
              <h2 className="text-2xl font-semibold text-purple-600 mb-4">Explore Our App Features 🎉🎉🎉</h2>
              <div className='h-full flex items-center'>
                {address ?
                  <Link href={`/profile/${address}`}>
                    <button className="btn btn-primary w-36">Start mint</button>
                  </Link>
                :
                  <CustomConnectButton />
                }
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 transform h-52 border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-1">

            </div>

            {/* Feature 4 */}
            <div className="ransform h-52 border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-2">
              <div className='h-full w-full bg-cover bg-center' style={{ backgroundImage : `url('./imgs/starknet-big.png')`}} />
            </div>

            <div className="p-6 transform h-full border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-1">

            </div>

            <div className="p-6 transform h-full border-base-content/20 hover:border-base-content/40 border row-span-1 col-span-1">

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
