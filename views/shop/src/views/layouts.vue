<template>
  <div class="layouts">
    <pagehead></pagehead>
    <div class="content" :class="{ 'not_padding' : !this.$store.state.showFootBar }">
      <router-view></router-view>
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
  data(){
    return {}
  }
}
</script>
<style>
.content{ padding: 0.98rem 0 1.1rem; }
.not_padding{ padding-bottom: 0; }
</style>

