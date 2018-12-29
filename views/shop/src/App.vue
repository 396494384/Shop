<template>
  <div id="app">
    <layouts></layouts>
  </div>
</template>
<script>
import layouts from './views/layouts'
export default {
  name: 'app',
  components:{
    'layouts' : layouts
  }
}
</script>

<style>
  #app{ width: 100%; height: 100%; font-size: 0.28rem; }
</style>
