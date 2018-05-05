function swap(list, index1, index2) {
    var temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
}

export default class Sorter {

    constructor(list, comparingFunc){
        this.list = list
        this.comparingFunc = comparingFunc
    }
    swap = (index1, index2) => {
        let temp = this.list[index1]
        this.list[index1] = this.list[index2]
        this.list[index2] = temp
    }
    step = () => {
        return this.list.slice()
    }
}

export class BubbleSorter extends Sorter {
    constructor(list, comparingFunc){
        super(list, comparingFunc)
        this.currentListIndex = 0
    }

    step = () => {
        let activeNotes = []
        if (!this.comparingFunc(this.list[this.currentListIndex], this.list[this.currentListIndex+1])){
            this.swap(this.currentListIndex, this.currentListIndex+1)
            activeNotes = [this.list[this.currentListIndex], this.list[this.currentListIndex + 1]]
        }
        this.currentListIndex = (this.currentListIndex + 1) % (this.list.length - 1)
        return [this.list.slice(), activeNotes, false]
    }
}