import { useEffect, useState } from "react"

export default function Traits({setData}:any) {
  const [votingList, setVotingList] = useState([{
    optionId: 0,
    value: ""
  },{
    optionId: 1,
    value: ""
  }]);

  const [textArea, setTextArea] = useState("")

  const addOption = () => {
    setVotingList(votingList => [...votingList, {
      optionId: votingList.length,
      value: ""
    }]);
  }

  const removeOption = (id: number) => {
    const z = votingList.filter((z) => z.optionId !== id);
    setVotingList(z);
  }

  const addOptionValue = (optionId: number, value: string) => {
    const updatedOptions = votingList.map((option) =>
      option.optionId === optionId ? { ...option, value: value } : option
    );
    setVotingList(updatedOptions);
  }

  useEffect(() => {
    setData({
      content: textArea,
      voteOptions: votingList,
    })
  }, [votingList, textArea])

  return (
    <div className="text-base-content">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Traits describe attributes of your item. They appear as filters inside your collection page and are also listed out inside your item page.</span>
        </div>
        <div className="flex gap-3 flex-col">
          {votingList.map((voting) => (
            <div key={voting.optionId} className="flex gap-2">
              <input onChange={(e) => addOptionValue(voting.optionId,e.target.value)} type="text" placeholder="Type" className="flex-auto w-fit input input-bordered" />
              <input onChange={(e) => addOptionValue(voting.optionId,e.target.value)} type="text" placeholder="Value" className="flex-auto w-fit input input-bordered" />
              <button onClick={() => removeOption(voting.optionId)} className="btn btn-outline btn-error w-12">x</button>
            </div>
          ))}
          <div onClick={() => addOption()} className="border border-neutral-content border-dashed w-full font-bold text-xl place-items-center px-4 py-2 h-12 rounded-full text-center cursor-pointer"> + </div>
        </div>
      </label>
    </div>
  )
}