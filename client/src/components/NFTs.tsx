import { useRouter } from "next/router"
import Card from "./Card"

export default function NFTs({collections}:any) {
  const route = useRouter()
  return (
    <div className="grid grid-cols-5 gap-4">
      {collections.map((value:any) =>
        value.tokens.map((nft:any,index:any) =>
          <div onClick={()=> route.push(`/claim/${value.contractAddress}/${nft.id}`)}>
            <Card key={index} image={nft.image} name={nft.name} description={`#${nft.id}`}/>
          </div>
        )
      )}
    </div>
  )
}
