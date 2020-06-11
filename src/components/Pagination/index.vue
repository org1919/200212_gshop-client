<template>
  <div class="pagination">
    <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
    <button v-if="startEnd.start>1" @click="setCurrentPage(1)">1</button>
    <button v-if="startEnd.start>2" disabled>···</button>

    <button
      v-for="(item, index) in startEnd.end"
      :key="index"
      v-if="item>=startEnd.start"
      :class="{active:item===myCurrentPage}"
      @click="setCurrentPage(item)"
    >{{item}}</button>

    <button v-if="startEnd.end<totalPages-1">···</button>
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <button :disabled="myCurrentPage===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>

    <button disabled style="margin-left: 30px">共 {{totalPages}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // currentPage: 当前页码
    currentPage: {
      type: Number,
      default: 1
    },
    // pageSize: 每页数量
    pageSize: {
      type: Number,
      default: 10
    },
    // total: 总数量
    total: {
      type: Number,
      default: 0
    },
    // showPageNo: 连续页码数 (一般是奇数)
    showPageNo: {
      type: Number,
      default: 5
    }
  },
  //组件内部的可变数据
  data() {
    return {
      //用来维护当前页码
      myCurrentPage: this.currentPage //父组件来指定初始值
    };
  },
  computed: {
    //总页数
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    //开始页码与结束页码
    startEnd() {
      let start, end;
      const { myCurrentPage, showPageNo, totalPages } = this;
      //计算start
      start = myCurrentPage - Math.floor(showPageNo / 2);
      //如果start的值小于1
      if (start < 1) {
        start = 1;
      }
      //计算end
      end = start + showPageNo - 1;
      if (end > totalPages) {
        end = totalPages;
        start = end - showPageNo + 1;

        if (start < 1) {
          start = 1;
        }
      }
      return { start, end };
    }
  },
  methods: {
    setCurrentPage(page) {
      if (page === this.myCurrentPage) return;

      this.myCurrentPage = page;

      this.$emit("currentChange", page);
    }
  },
  watch: {
    currentPage(value) {
      this.myCurrentPage = value;
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
