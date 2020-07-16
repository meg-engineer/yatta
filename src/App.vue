<template>
  <div class="app">
    <Header />
    <div class="view-wrapper">
      <RouterView />
    </div>
    © 2020 Meg.
  </div>
</template>
<script>
import fb from "./fb";
import Header from "./components/Header";

fb.init();

export default {
  components: {
    Header
  }
};
</script>
