import Sorter from './Sorter'

export class QuickSorter extends Sorter {
  constructor(list, comparingFunc) {
    super(list, comparingFunc)
    this.quickSort(list.slice(), 0)
  }

  step = () => {
    if (this.actionBuffer.length > 0) {
      let action = this.actionBuffer.shift()
      let activeIndicies = this.executeAction(action)
      return [
        this.list.slice(),
        action.activeIndicies !== undefined
          ? action.activeIndicies
          : activeIndicies,
        false,
      ]
    }
    return [this.list, [], true]
  }

  quickSort(list, startIndex) {
    console.log(
      'Area to operate: ' + startIndex + ' -> ' + (startIndex + list.length)
    )
    if (list.length === 0 || list.length === 1) return
    let limitIndex = list.length - 1
    let higher = []
    let lower = []
    for (let i = 0; i < list.length - 1; i++) {
      if (!this.comparingFunc(list[i], list[limitIndex])) {
        this.actionBuffer.push({
          type: 'shift',
          index: startIndex + (i - higher.length),
          offset: limitIndex - (i - higher.length) - 1,
          activeIndicies: [
            startIndex + limitIndex - 1,
            startIndex + limitIndex,
          ],
        })
        console.log(
          startIndex + (i - higher.length),
          startIndex +
            (i - higher.length) +
            limitIndex -
            (i - higher.length) -
            1
        )
        higher.push(list[i])
      } else {
        lower.push(list[i])
      }
    }

    this.actionBuffer.push({
      type: 'shift',
      index: startIndex + limitIndex,
      offset: -higher.length,
    })

    this.quickSort(lower, startIndex)
    this.quickSort(higher, startIndex + lower.length + 1)
    return
  }
}
