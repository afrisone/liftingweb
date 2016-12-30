import {observable} from 'mobx'

class State {
  constructor() {
    this.selected = observable({sel: 'Abs'})
  }
  
  setSel(value) {
    this.selected.sel = value
  }
  
  getSel(value) {
    return this.selected.sel
  }
}

export default new State()
