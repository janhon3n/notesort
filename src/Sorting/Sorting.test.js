import Sorter from './Sorter'
import { QuickSorter } from './QuickSorter'

test('Sorter shiftItem test 1', () => {
  let sorter = new Sorter([1, 2, 3, 4, 5, 6], (a, b) => {
    return a < b
  })
  sorter.shiftItem(2, 2)
  expect(sorter.list).toEqual([1, 2, 4, 5, 3, 6])
})

test('Sorter shiftItem test 2', () => {
  let sorter = new Sorter([1, 2, 3, 4, 5, 6], (a, b) => {
    return a < b
  })
  sorter.shiftItem(4, -2)
  expect(sorter.list).toEqual([1, 2, 5, 3, 4, 6])
})

test('QuickSort test', () => {
  let quickSorter = new QuickSorter(
    [6, 3, 5, 4, 1, 8, 7, 9, 2, 10, 12, 11],
    (a, b) => {
      return a < b
    }
  )
  let keepSorting = true
  while (keepSorting) {
    let sortingFinished = quickSorter.step()[3]
    keepSorting = !sortingFinished
  }
  expect(quickSorter.list).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
})
