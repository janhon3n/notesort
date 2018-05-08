export default class Sorter {
  constructor(list, comparingFunc) {
    this.list = list.slice()
    this.comparingFunc = comparingFunc
    this.actionBuffer = []
  }

  executeAction = action => {
    switch (action.type) {
      case 'swap':
        this.swap(action.index1, action.index2)
        return [action.index1, action.index2]
      case 'shift':
        this.shiftItem(action.index, action.offset)
        return [action.index, action.index + action.offset]
      default:
        break
    }
  }

  swap = (index1, index2) => {
    let temp = this.list[index1]
    this.list[index1] = this.list[index2]
    this.list[index2] = temp
  }

  shiftItem = (index, offset) => {
    let itemToOffset = this.list[index]
    for (let i = 0; i < Math.abs(offset); i++) {
      let indexToShift = offset >= 0 ? index + i : index - i
      this.list[indexToShift] = this.list[
        offset >= 0 ? indexToShift + 1 : indexToShift - 1
      ]
    }
    this.list[index + offset] = itemToOffset
  }

  findLowestIndex = list => {
    let lowestIndex = 0
    for (let i = 1; i < list.length; i++) {
      if (!this.comparingFunc(list[lowestIndex], list[i])) {
        lowestIndex = i
      }
    }
    return lowestIndex
  }

  findHighestIndex = list => {
    let highestIndex = 0
    for (let i = 1; i < list.length; i++) {
      if (this.comparingFunc(list[highestIndex], list[i])) {
        highestIndex = i
      }
    }
    return highestIndex
  }

  step = () => {
    // Always return [the list, list of updated indicies, sorting is ready]
    return [this.list.slice(), [], false]
  }
}
