import { useRouter } from 'next/router';

// Define the CreateNFTPage component
const CreateNFTPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-main">
      <div className="container mx-auto px-4">
        <div className='grid grid-cols-4 text-center'>
            <div className='border-base-content/20 hover:border-base-content/40 border col-span-1 p-6 flex text-center'>
                <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center">
                    Create Your NFT
                </h1>
                <div className='h-60 w-60 bg-cover bg-center' style={{ backgroundImage : `url('../imgs/studio-create.png')`}} />
            </div>


            <div className="grid col-span-3 grid-row-2 text-start">
                {/* Deploy Contract Button */}
                <div
                    className="p-8 row-span-1 border-base-content/20 hover:border-base-content/40 border cursor-pointer"
                    onClick={() => router.push('/studio/deploy-contract')}
                >
                    <h2 className="text-2xl font-semibold text-purple-600 mb-4">
                    Deploy Contract
                    </h2>
                    <p className="text-gray-700">
                    Set up and deploy your own smart contract for managing your NFTs.
                    </p>
                </div>

                {/* Mint NFT Button */}
                <div
                    className="p-8 row-span-1 border-base-content/20 hover:border-base-content/40 border cursor-pointer"
                    onClick={() => router.push('/studio/mint')}
                >
                    <h2 className="text-2xl font-semibold text-purple-600 mb-4">
                    Mint NFT
                    </h2>
                    <p className="text-gray-700">
                    Create a new NFT under your deployed contract with ease.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFTPage;
