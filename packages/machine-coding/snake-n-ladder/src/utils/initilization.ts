import { HEIGHT, WIDTH } from '@/components/constant'

export const generateSnakeLadderBoard = () => {
	const usedPosition = new Set<number>()
	const snakesOnTheBoard = new Map<number, number>()
	const ladderOnTheBoard = new Map<number, number>()
	const emptyPositionOnTheBoard = new Map<number, number>()

	const initialBuffer = 5,
		endBuffer = 3
	for (let i = 1 + initialBuffer; i <= HEIGHT * WIDTH - endBuffer; i++) {
		const probability = Math.random()
		const endCellValue = Math.min(15, Math.ceil(Math.random() * 30)) // lets do incerement of at max 15 - 30
		if (probability < 0.5) {
			if (0.35 < probability && probability < 0.5 && !usedPosition.has(i)) {
				const startCell = i,
					endCell = Math.max(HEIGHT * WIDTH - endBuffer, endCellValue)
				usedPosition.add(startCell)
				usedPosition.add(endCell)
				const cells = [startCell, endCell].sort((a, b) => a - b)
				snakesOnTheBoard.set(cells[1], cells[0])
			} else if (0.9 > probability && probability > 0.75 && !usedPosition.has(i)) {
				const startCell = i,
					endCell = Math.max(HEIGHT * WIDTH - endBuffer, endCellValue)
				usedPosition.add(startCell)
				usedPosition.add(endCell)
				const cells = [startCell, endCell].sort((a, b) => a - b)
				ladderOnTheBoard.set(cells[0], cells[1])
			}
		} else {
			emptyPositionOnTheBoard.set(i, -1)
		}
	}
	return { snakesOnTheBoard, ladderOnTheBoard, emptyPositionOnTheBoard }
}
