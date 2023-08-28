<template>
  <div class="container">
    <div class="title">香奈兒神奇轉盤</div>
    <div class="board">
      <!-- <div class="loading" v-show="isLoading">
        <default-loading></default-loading>
      </div> -->
      <transition>
        <div class="xCoord" v-show="isShowCoord">
          <div v-for="(item, index) in matrix" :key="index">{{ index + 1 }}</div>
        </div>
      </transition>
      <transition>
        <div class="yCoord" v-show="isShowCoord">
          <div v-for="(item, index) in matrix" :key="index">{{ index + 1 }}</div>
        </div>
      </transition>
      <div
        v-for="(item, index) in matrix"
        :key="index"
      >
      <!-- :style="{ opacity: isLoading ? '.3': '1' }" -->
        <div
          v-for="(child, childIndex) in item" :key="`${index}_${childIndex}`"
          class="block"
          :style="{ 'background-color': `${child.color}` }"
        ></div>
      </div>
    </div>
    <div class="toolbar">
      <v-btn color="primary" small @click="handleGenCoord" :disabled="isLoading">開獎</v-btn>
      <v-btn class="ml-2" color="warning" small @click="handleRevertCoord" :disabled="blackList.length === 0">上一步</v-btn>
      <v-btn class="ml-2" small @click="handleClearCoord">清空</v-btn>
      <v-btn
        class="ml-2"
        color="secondary"
        small
        @click="handleShowCoord"
      >{{ isShowCoord ? '隱藏': '顯示' }}</v-btn>
    </div>
    <div class="display">開獎結果: {{ lastGenDisplay }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DefaultLoading from '../components/DefaultLoading.vue'
import { $axios } from '~/utils/api'

interface Block {
  color: string
}

interface Coord {
  row: number
  col: number
}

@Component({
  layout: 'default',
  components: {
    DefaultLoading
  }
})
export default class Index extends Vue {
  private matrixLength = 5

  private matrix: Block[][] = []

  private blackList: Coord[] = []

  private isShowCoord = true

  private isLoading = false

  private lastGen: number[] = []

  private get lastGenDisplay() {
    if (this.lastGen.length === 2) {
      return [this.lastGen[0] + 1, this.lastGen[1] + 1]
    }
    return []
  }

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
    this.lastGen = [_row, _col]
    return true
  }

  private setMatrixInit() {
    this.matrix = [...this.getMatrixInterface(this.matrixLength)]
    this.lastGen = []
    this.blackList = []
  }

  private intervalId: any = null

  // private setRandomBlockGen() {
  //   this.intervalId = setInterval(() => {
  //     if (!this.setRandomBlock()) {
  //       this.setRandomBlock()
  //     } else if (this.blackList.length === this.matrix.length * this.matrix[0].length) {
  //       // matrix full
  //       clearInterval(this.intervalId)
  //       this.setMatrixInit()
  //     }
  //   }, 1000)
  // }

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

  private handleShowCoord() {
    this.isShowCoord = !this.isShowCoord
  }

  private handleClearCoord() {
    this.setMatrixInit()
  }

  private handleRevertCoord() {
    if (this.blackList.length) {
      const _row = this.blackList[this.blackList.length - 1].row
      const _col = this.blackList[this.blackList.length - 1].col
      this.matrix[_row][_col].color = ''
      this.blackList.pop()
      if (this.blackList.length) {
        const _rowNew = this.blackList[this.blackList.length - 1].row
        const _colNew = this.blackList[this.blackList.length - 1].col
        this.lastGen = [_rowNew, _colNew]
      } else {
        this.lastGen = []
      }
    }
  }

  private handleGenCoord() {
    this.isLoading = true
    const _timeoutId = setTimeout(() => {
      this.isLoading = false
      if (!this.setRandomBlock()) {
        this.handleGenCoord()
        clearTimeout(_timeoutId)
        return
      }
      clearTimeout(_timeoutId)
    }, 300)
  }

  private created() {
    this.setMatrixInit()
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
.container {
  margin-left: auto;
  margin-right: auto;
  width: 360px;
}

.title {
  text-align: center;
}

.board {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  padding-top: 20px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}

.display {
  margin-top: 16px;
}

.xCoord {
  position: absolute;
  top: 0;
  display: flex;
  min-width: 360px;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 18px;
    font-size: 12px;
    color: rgba(0, 0, 0, .66);
  }
}

.yCoord {
  position: absolute;
  top: 20px;
  left: -36px;
  min-width: 360px;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 18px;
    font-size: 12px;
    color: rgba(0, 0, 0, .66);
  }
}

.block {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, .1);
  transition: background-color .3s;
}
</style>
