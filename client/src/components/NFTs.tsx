import Card from "./Card"

export default function NFTs({collections}:any) {
  const array = [1,2,3,4]
  return (
    <div className="grid grid-cols-5 gap-4">
      {collections.map((value:any) =>
        value.tokens.map((nft:any,index:any)=>
          <Card key={index} image={nft.image} name={nft.name} description={`#${nft.id}`}/>
        )
      )}
    </div>
  )
}