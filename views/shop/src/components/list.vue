<template>
  <div class="list">
    <router-link v-for="(item, index) in goods" :key="index" :to="{ path : '/goods_details', query:{ id: item._id } }">
      <img :src="item.image" />
      <p>{{ item.name }}</p>
      <span>价格:{{ item.saleState ? item.salePrice : item.price | money }} <i v-if="item.saleState">{{ item.price | money }}</i></span>
    </router-link>
  </div>
</template>
<script>
export default {
  name:"list",
  props:{
    goods:{
      type: Array
    }
  },
  methods:{ }
}
</script>
<style scoped>
.list{ padding: 0.3rem 0.3rem 0; overflow: hidden; }
.list a{ float: left; width: 3.3rem; padding: 0.2rem; box-sizing: border-box; margin: 0 0.3rem 0.3rem 0; box-shadow: 0 0 10px 1px #ddd; border-radius: 0.2rem; background-color: #fff; }
.list a:nth-child(2n){ margin-right: 0; }
.list a img{ display: block; width: 100%; height: 2.9rem; box-shadow: 0 0 1px 1px #eee inset; }
.list a p{ line-height: 2; margin-top: 0.1rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: #666; }
.list a span{ font-size: 0.2rem; color: #FF6867; }
.list a span i{ text-decoration: line-through; margin-left: 0.05rem; color: #999; font-size: 0.2rem; }
</style>
