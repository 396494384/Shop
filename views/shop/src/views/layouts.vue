<template>
  <div class="layouts">
    <pagehead></pagehead>
    <div class="content" :class="{ 'not_padding' : !this.$store.state.showFootBar }">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <pagefoot v-if="this.$store.state.showFootBar"></pagefoot>
  </div>
</template>
<script>
import pagehead from '../components/pagehead'
import pagefoot from '../components/pagefoot'
export default {
  name: 'layouts',
  components:{
    "pagehead": pagehead,
    "pagefoot": pagefoot
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive: false
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  },
  created(){
    this.reload()
  }
}
</script>
<style>
.content{ padding: 0.88rem 0 1.1rem; }
.not_padding{ padding-bottom: 0; }
</style>

