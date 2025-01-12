'use client';

import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import Layout from '@/components/layout/Layout';
import { useAccount } from '@/hooks/useAccount';
import { BlockieAvatar } from '@/components/BlockieAvatar';
import Collections from '@/components/Collections';
import NFTs from '@/components/NFTs';

export default function Profile() {
  const router = useRouter();
  const { address } = router.query;
  const tabs = ['Collections', 'NFTs'];
  const account = useAccount();

  const [currentTab, setCurrentTab] = useState<number>(0);

  const isProfile = useMemo(() => {
    if (!address || !account) {
      return false;
    }
    return (
      String(address).toLowerCase() === String(account.address).toLowerCase()
    );
  }, [address, account.address]);

  return (
    <Layout>
      <div className='container mx-auto conflex py-8 justify-between'>
        {address && (
          <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-2">
            <BlockieAvatar address={address as string} size={160} ensImage={""} />
          </div>
        )}
      </div>
      <div role='tablist' className='container mx-auto tabs tabs-lifted tabs-lg flex'>
        {tabs.map((tab, index) => (
          <h1
            key={index}
            role='tab'
            className={`tab text-gray-500 ${
              currentTab === index && 'tab-active'
            }`}
            onClick={() => setCurrentTab(index)}
          >
            {tab}
          </h1>
        ))}
        <div className='border-b w-full'></div>
      </div>
      <div className='container mx-auto py-8'>
        {currentTab === 0 ? (
          <Collections/>
        ) : (
          <NFTs/>
        )}
      </div>
    </Layout>
  );
}