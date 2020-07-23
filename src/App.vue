<template>
  <div class="app">
    <Header />
    <div class="view-wrapper">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
<script>
import fb from "./fb";
import Header from "./components/Header";
import Footer from "./components/Footer";

fb.init();

export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style>
@import "./assets/css/reset.css";
@import "./assets/css/style.css";
</style>
