import Sorter from './Sorter'

export class SelectionSorter extends Sorter {
  constructor(list, comparingFunc) {
    super(list, comparingFunc)
    this.sortedAmount = 0
  }

  step = () => {
    if (this.sortedAmount === this.list.length) return [this.list, [], false]
    let lowestIndex =
      this.findLowestIndex(this.list.slice(this.sortedAmount)) +
      this.sortedAmount
    this.swap(lowestIndex, this.sortedAmount)
    this.sortedAmount++
    return [this.list.slice(), [lowestIndex, this.sortedAmount - 1], false]
  }
}
