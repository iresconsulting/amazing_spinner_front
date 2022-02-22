<template>
  <div class="board">
    <div v-for="(item, index) in matrix" :key="index">
      <div
        v-for="(child, childIndex) in item" :key="childIndex"
        class="block"
        :style="{ 'background-color': `${child.color}` }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'

interface Block {
  color: string
}

interface Coord {
  row: number
  col: number
}

@Component({
  layout: 'default'
})
export default class Index extends Vue {
  // please move matrix generation to the backend, frontend is just for display

  private matrixLength = 20

  private matrix: Block[][] = []

  private blackList: Coord[] = []

  private getSquareMatrix = (size: number) => {
    return Array(size)
      .fill(null)
      .map((u, y) => Array(size)
      .fill(null)
      .map((u, x) => y * size + x + 1))
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  private getRandomBlock() {
    const _row = this.getRandomInt(this.matrix.length)
    const _col = this.getRandomInt(this.matrix[_row].length)
    return [_row, _col]
  }

  private setRandomBlock() {
    const [_row, _col] = this.getRandomBlock()
    const _target = this.matrix[_row][_col]
    const _isColorExistInBlock = _target.color !== ''
    if (_isColorExistInBlock) {
      return false
    }
    const _blockColor = this.getRandomColor()
    _target.color = _blockColor
    this.blackList.push({ row: _row, col: _col })
    return true
  }

  private setMatrixInit() {
    this.matrix = [...this.getMatrixInterface(this.matrixLength)]
  }

  private intervalId: any = null

  private setRandomBlockGen() {
    this.intervalId = setInterval(() => {
      if (!this.setRandomBlock()) {
        this.setRandomBlock()
      } else if (this.blackList.length === this.matrix.length * this.matrix[0].length) {
        // matrix full
        clearInterval(this.intervalId)
        // TODO send email
        this.genEmail()
        this.setMatrixInit()
      }
    }, 1000)
  }

  private async genEmail() {
    try {
      // email stored on backend
      await $axios.post('/api/v1/endpoint', { timestamp: '', canvas: this.matrix })
    } catch (e: unknown) {

    }
  }

  private getMatrixInterface(val: number) {
    const _blocks = this.getSquareMatrix(val)
    // @ts-ignore
    const _result: Block[][] = [..._blocks]
    for (let i = 0; i < _blocks.length; i++) {
      for (let j = 0; j < _result[i].length; j++) {
         _result[i][j] = { color: '' }
      }
    }
    return _result
  }

  private created() {
    this.setMatrixInit()
    this.setRandomBlockGen()
  }

  private beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
</script>
<style lang="scss" scoped>
.board {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 360px;
  min-height: 180px;
}

.block {
  width: 18px;
  height: 18px;
}
</style>
