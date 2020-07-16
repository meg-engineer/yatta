<template>
  <div>
    <div class="appTitleContainer">Y A T T A !</div>
    <div class="appMessage">嬉しかったこと、シェアしよう</div>
    <div class="appMessage">▼</div>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style scoped>
.appTitleContainer {
  text-align: center;
  margin: 32px 0 32px 0;
}

.appMessage {
  text-align: center;
  font-size: 20px;
  margin-top: 16px;
  font-weight: 500;
}
</style>
