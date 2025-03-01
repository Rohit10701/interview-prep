'use client'
/*

    need to store each player position in the board -> DONE
    need a function to initialize the board, player and dice
    need a function to choose and show player turn 
    need a update function to update the player based on the board state and player id
    need a function to check if the player has won

    need a board state to store the position of snake and ladder based on Cell of the board as (startCell, endCell)
        - create a function to genreate new board state randomly

    need a dice function to roll the dice and return the Cell of the board 
        - 1, 6 as value and endCell for that player id by taking the startCell and endCell
        - if endCell has snake then get the endCell for that snake and dice will reutrn the Cell of the board same goes for ladder
        - if dice is lets say around Cell 97 and i got 4 which gives endCell 101 which isnt not value and hence ll reutrn -1
    
    

*/

import React, { useEffect, useState } from 'react'
import { HEIGHT, WIDTH } from './constant'
import { generateSnakeLadderBoard } from '@/utils/initilization'
const diceValues = [1, 2, 3, 4, 5, 6] as const

type Dice = (typeof diceValues)[number]
enum Entity {
    L = "L", // Ladder
    S = "S", // Snake
    N = "N" // None
  }
  

const BoardContext = React.createContext(null)

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [boardState, setBoardState] = useState<[keyof typeof Entity, number, number][]>([]);
	const [dice, setDice] = useState<Dice>(1)
	const [playerState, setPlayerState] = useState<Map<number, number>>(new Map<number, number>()) // playerId -> Cell
    const [resetSession, setResetSession] = useState(true)


    const initializeBoard = () => {
        const { snakesOnTheBoard, ladderOnTheBoard, emptyPositionOnTheBoard } = generateSnakeLadderBoard();
      
        const initialBoardState: [keyof typeof Entity, number, number][] = [];
      
        snakesOnTheBoard.forEach((value, key) => initialBoardState.push([Entity.S, key, value]));
        ladderOnTheBoard.forEach((value, key) => initialBoardState.push([Entity.L, key, value]));
        emptyPositionOnTheBoard.forEach((value, key) => initialBoardState.push([Entity.N, key, value ?? -1]));
      
        setBoardState(initialBoardState);
      };

    
    useEffect(()=> {
        if(resetSession){
            initializeBoard()
            setResetSession(false)
        }
    }, [resetSession])
      
}
