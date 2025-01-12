import Card from "./Card"

export default function NFTs() {
  const array = [1,2,3,4]
  return (
    <div className="grid grid-cols-5 gap-4">
      {array.map((value,index) =>
        <Card key={index} />
      )}
    </div>
  )
}