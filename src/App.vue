<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { reqCategoryList, reqFloors } from "./api";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },

  async mounted() {
    // const result = await reqCategoryList();
    // console.log("result", result.data);

    // const result = await reqFloors();
    // console.log("result---", result);
    this.$store.dispatch("getCategoryList");
    // this.$store.dispatch("getBanners"); 测试
    // this.$store.dispatch("getFloors");
  }
};
</script>

<style lang="less" scoped>
</style>
