// "use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const Table = ({channel}) => {
    const router = useRouter();
    const truncate = (words, length) => {
        const wordArray = words.split(" ");
        let truncated = "";
        if (wordArray.length == length) {
          truncated = words;
          return truncated;
        } else {
          wordArray.map((items) => {
            if (truncated.split(" ").length + 1 <= length) {
              truncated = truncated + (truncated ? " " : "") + items;
            }
          });
          return truncated + "...";
        }
      };

      const navigator = () =>{
        localStorage.setItem("channelID", channel._id);
        router.push("/main/channel-profile");
      }


  return (
    
      <div
      onClick={navigator} 
      className="cursor-pointer bg-white shadow-md hover:scale-105 transition-all rounded-xl overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Subscribers</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={channel.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{channel.name}</div>    
                  </div>
                </div>
              </td>
              <td className='w-[40vw] text-wrap' >
                {truncate(channel.description,20)}
                <br />
              </td>
              <td>{channel.subscriber.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
  )
}

export default Table
