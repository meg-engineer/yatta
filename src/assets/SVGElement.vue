<template>
  <component :is="svg" />
</template>

<script>
export default {
  name: "SVGElement",
  props: {
    name: {
      type: String
    }
  },
  computed: {
    svg() {
      return () => import(`./img/${this.name}.svg`);
    }
  }
};
</script>
