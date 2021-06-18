const maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],

  ['#', '+', '#', '#', '#', '+', '#', '+', '#'],

  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],

  ['#', '#', '#', '+', '#', '#', '#', '#', '#'],

  ['#', '#', '0', '+', '+', '#', '#', '#', '#'],

  ['#', '#', '+', '#', '+', '#', '#', '#', '#'],

  ['#', '#', '#', '#', '+', '#', '#', '#', '#'],
]

// a copy of the original maze with a 'visited' attribute to track paths leading to a dead end
const historyMaze = []

// solution
let way = []

// getting the entry position
const findStartingPoint = (maze) => {
  let pos = {
    posX: 0,
    posY: 0,
  }
  maze.some((line) => {
    let found = line.some((element) => {
      if (element === '0') {
        return true
      }
      pos.posX++
    })
    if (found) {
      return true
    } else {
      pos.posX = 0
    }
    pos.posY++
  })
  return pos
}

const findTheWayOut = async (posX, posY) => {
  if (
    posY === historyMaze.length - 1 ||
    posY === 0 ||
    posX === historyMaze[posY].length - 1 ||
    posX === 0
  ) {
    return true
  } else {
    if (
      historyMaze[posY][posX - 1].val === '+' &&
      !historyMaze[posY][posX - 1].visited
    ) {
      historyMaze[posY][posX - 1].visited = true
      if (await findTheWayOut(posX - 1, posY)) {
        way.push('left')
        return true
      }
    }

    if (
      historyMaze[posY][posX + 1].val === '+' &&
      !historyMaze[posY][posX + 1].visited
    ) {
      historyMaze[posY][posX + 1].visited = true
      if (await findTheWayOut(posX + 1, posY)) {
        way.push('right')
        return true
      }
    }

    if (
      historyMaze[posY - 1][posX].val === '+' &&
      !historyMaze[posY - 1][posX].visited
    ) {
      historyMaze[posY - 1][posX].visited = true
      if (await findTheWayOut(posX, posY - 1)) {
        way.push('top')
        return true
      }
    }

    if (
      historyMaze[posY + 1][posX].val === '+' &&
      !historyMaze[posY + 1][posX].visited
    ) {
      historyMaze[posY + 1][posX].visited = true
      if (await findTheWayOut(posX, posY + 1)) {
        way.push('bottom')
        return true
      }
    }

    return false
  }
}

const initHistoryMaze = () => {
  let temp = []
  maze.forEach((line) => {
    line.forEach((cell) => {
      temp.push({ val: cell, visited: false })
    })
    historyMaze.push(temp)
    temp = []
  })
}

// entry function
async function find() {
  const entryPoint = findStartingPoint(maze)
  initHistoryMaze()

  historyMaze[entryPoint.posY][entryPoint.posX].visited = true

  if (await findTheWayOut(entryPoint.posX, entryPoint.posY)) {
    console.log('The path is:')
    console.log(way.reverse())
  } else {
    console.log('There is no way out :(')
  }
}

find()
