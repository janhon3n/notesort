import Sorter from './Sorter'

export class QuickSorter extends Sorter {
  constructor(list, comparingFunc) {
    super(list, comparingFunc)
    this.tree = this.createNewBranch([0, list.length - 1])
    this.activePath = []
  }

  getActiveBranch = () => {
    return this.getBranchByPath(this.activePath)
  }

  getBranchByPath = path => {
    let t = this.tree
    for (let i = 0; i < path.length; i++) {
      if (path[i] === 'left') t = t.left
      if (path[i] === 'right') t = t.right
    }
    if (t === undefined || t === null) return null
    return t
  }

  createNewBranch(range) {
    return {
      left: null,
      right: null,
      lowerAmount: 0,
      higherAmount: 0,
      range: range,
    }
  }

  changeActiveBranch = () => {
    let moveUp = path => {
      if (path[path.length - 1] === 'right') {
        //time to move up 1 layer
        this.activePath.slice(-1)
      } else {
        //switch to right leaf
        this.path[path.length - 1] = 'right'
      }
    }

    let p = this.activePath.slice()
    while (p === null) {
      p = moveUp(p)
    }
    this.activePath = p
  }

  handleSortingFinished = branch => {
    if (branch.range[1] - branch.range[0] < 3) {
      // whole branch is sorted
      this.changeActiveBranch()
    } else {
      // time to branch even more
      if (branch.lowerAmount > 1) {
        this.activePath.push('left')
        branch.left = this.createNewBranch([
          branch.range[0],
          branch.range[0] + branch.lowerAmount,
        ])
      }
      if (branch.higherAmount > 1) {
        this.activePath.push('left')
        branch.right = this.createNewBranch([
          branch.range[0] + branch.lowerAmount + 1,
          branch.range[1],
        ])
      }
    }
  }

  step = () => {
    let branch = this.getActiveBranch(this.tree)
    let indexToCheck = branch.range[0] + branch.lowerAmount
    let limitIndex = branch.range[1] - branch.higherAmount

    if (!this.comparingFunc(this.list[indexToCheck], this.list[limitIndex])) {
      this.shiftItem(indexToCheck, limitIndex - indexToCheck)
      branch.higherAmount++
    } else {
      branch.lowerAmount++
    }

    let leftToSort =
      branch.range[1] -
      branch.higherAmount -
      (branch.range[0] + branch.lowerAmount) -
      1

    if (leftToSort <= 0) {
      this.handleSortingFinished(branch)
    }
    return [this.list.slice(), [limitIndex], false]
  }
}
