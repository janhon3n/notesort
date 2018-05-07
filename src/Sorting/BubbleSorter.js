import Sorter from './Sorter'

export class BubbleSorter extends Sorter {
  constructor(list, comparingFunc) {
    super(list, comparingFunc)
    this.currentListIndex = 0
  }

  step = () => {
    let activeIndicies = []
    if (
      !this.comparingFunc(
        this.list[this.currentListIndex],
        this.list[this.currentListIndex + 1]
      )
    ) {
      this.swap(this.currentListIndex, this.currentListIndex + 1)
      activeIndicies = [this.currentListIndex, this.currentListIndex + 1]
    }
    this.currentListIndex = (this.currentListIndex + 1) % (this.list.length - 1)
    return [this.list.slice(), activeIndicies, false]
  }
}
