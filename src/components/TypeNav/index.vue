<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideSubCategorys" @mouseenter="showFirstCategorys">
        <h2 class="all">全部商品分类</h2>

        <transition name="move">
          <!-- 需要关注对象 -->
          <div class="sort" v-show="isShowFirst">
            <!-- isShowFirst 大块的显示与否 -->
            <div class="all-sort-list2" @click="toSearch2">
              <!-- 一级列表 -->
              <div
                class="item"
                :class="{item_on: index === currentIndex}"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="showSubScategorys(index)"
              >
                <h3>
                  <!-- 路由跳转 -->
                  <!-- <router-link
                  :to="'/search' + '?categoryName=' + 
                   c1.categoryName + '&category1Id='+ c1.categoryId"
                  >{{c1.categoryName}}</router-link>-->
                  <!-- <a
                  href="javascript:"
                  @click="toSearch({
                    categoryName: c1.categoryName, 
                    category1Id: c1.categoryId})"
                  >{{c1.categoryName}}</a>-->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- nav导航栏 -->
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2,
      isShowFirst: this.$route.path === "/"
    };
  },
  mounted() {
    // 通过store对象的dispatch()来触发异步action getCategoryList执行请求获取数据
    // this.$store.dispatch("getCategoryList"); // 数据从接口中转移到vuex的state中
    // this.getCategoryList(); 在app中处理
  },
  computed: {
    /* 
      3级分类列表的计算属性
      */
    categoryList1() {
      return this.$store.state.home.categoryList;
    }, // categoryList () {return this.$store.state['categoryList']}

    // 一旦使用vuex多模块编程 ==> mapState通过数组中的名称直接读取不行
    // ...mapState(['categoryList'])  // categoryList () {return this.$store.state['categoryList']}
    /* ...mapState({
        categoryList: 'categoryList'
    })  */
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    ...mapActions(["getCategoryList"]), // getCategoryList () {this.$store.dispatch('getCategoryList')}

    // 鼠标移入 showFirstCategorys 显示大块div
    showFirstCategorys() {
      // 把isShowFirst改为true
      this.isShowFirst = true;
      // 把currentIndex改为-1
      this.currentIndex = -1;
    },

    // 鼠标移出 hideSubCategorys 隐藏大块div
    hideSubCategorys() {
      this.currentIndex = -2;
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },

    //一级菜单控制 二级菜单的显示与否
    showSubScategorys: throttle(function(index) {
      // console.log(index);

      if (this.currentIndex !== -2) {
        this.currentIndex = index;
      }
    }, 200),

    // 发送对应的路由事件
    // toSearch({ categoryName, category1Id, category2Id, category3Id }) {
    //   const location = {
    //     name: "search"
    //   };
    //   const query = {categoryName};

    //   //判断
    //   if (category1Id) {
    //     query.category1Id = category1Id;
    //   } else if (category2Id) {
    //     query.category2Id = category2Id;
    //   } else if (category3Id) {
    //     query.category3Id = category3Id;
    //   }

    //   location.query = query;

    //   // 发送路由
    //   this.$router.path(location);
    // }
    toSearch2(event) {
      const {
        categoryname,
        category1id,
        category2id,
        category3id
      } = event.target.dataset;

      // 如果点击的不 是分类项, 直接结束
      if (!categoryname) return;

      // 准备query
      const query = {
        categoryName: categoryname
      };
      if (category1id) {
        query.category1Id = category1id;
      } else if (category2id) {
        query.category2Id = category2id;
      } else if (category3id) {
        query.category3Id = category3id;
      }

      // 准备跳转路由的location
      const location = {
        name: "search",
        query
      };
      // 取出当前params中的keyword, 如果有值, 携带上
      const keyword = this.$route.params.keyword;
      if (keyword) {
        location.params = { keyword };
      }

      // 跳转到Search
      this.$router.push(location);

      // 自动隐藏列表
      this.hideSubCategorys();
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.move-enter-active {
        transition: all 0.4s;
      }
      // 指定隐藏时的样式
      &.move-enter,
      &.move-leave-to {
        opacity: 0;
        height: 0;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            .item-list {
              display: block;
            }
          }
          &:hover {
            background: #dddddd;
          }
        }
      }
    }
  }
}
</style>