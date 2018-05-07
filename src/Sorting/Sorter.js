export default class Sorter {
  constructor(list, comparingFunc) {
    this.list = list.slice()
    this.comparingFunc = comparingFunc
  }

  swap = (index1, index2) => {
    let temp = this.list[index1]
    this.list[index1] = this.list[index2]
    this.list[index2] = temp
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
