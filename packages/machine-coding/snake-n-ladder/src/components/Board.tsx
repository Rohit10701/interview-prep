import React from 'react'
import { HEIGHT, WIDTH } from './constant'

type Props = {}





const Board = (props: Props) => {

  return (
    <div className='flex flex-col'>
        {
            Array.from({length: HEIGHT}, (_, i) => {
                return (
                    <div className='flex'>
                        {Array.from({length: WIDTH}, (_, j) => {
                            return (
                                <Cell index={HEIGHT*WIDTH -( i%2 !== 0 ? (i * HEIGHT + HEIGHT) -  (j + 1) : i * HEIGHT + j)} />
                            )
                        })}
                    </div>
                )
            })
        }
    </div>
  )
}

const Cell = ({index} : {index : number}) => {
    const cellNumber = index
    return (
        <div className={`w-16 h-16 flex justify-center items-center ${index%2 === 1 ? "bg-pink-500" : "bg-black"}`}> 
            <Player index={cellNumber} />
        </div>
    )
}


const Player = ({index} : {index : number}) => {
    return (
        <div className={`w-8 h-8 bg-green-500 rounded-full flex justify-center items-center`}> 
            {index}
        </div>
    )
}

export default Board