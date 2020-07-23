<template>
  <div class="post-container center">
    <div>
      <img class="card-img" :src="post.url" alt="Card image cap" />
    </div>
    <div class="post-buttons">
      <a :href="tw_url" class="tweet-button" target="_blank">
        <font-awesome-icon
          :icon="{ prefix: 'fab', iconName: 'twitter' }"
        ></font-awesome-icon
        >twitterで共有する
      </a>
      <a href="/" class="button-color">もどる</a>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

const db = firebase.firestore();

export default {
  name: "Post",
  data() {
    return {
      post: "",
      tw_url: ""
    };
  },
  created() {
    db.collection("cards")
      .where("post_id", "==", this.$route.params["post_id"])
      .get()
      .then(querySnapshot => {
        // this.loading = false;
        // this.counter = 0;
        querySnapshot.forEach(doc => {
          let data = {
            url: doc.data().url,
            post_id: doc.data().post_id,
            created_at: doc.data().created_at
          };

          this.post = data;
          console.log(doc.data());
          this.tw_url = `https://twitter.com/intent/tweet?text=YATTA%EF%BC%81+%E5%AC%89%E3%81%97%E3%81%84%E3%81%93%E3%81%A8%E3%80%81%E3%82%B7%E3%82%A7%E3%82%A2%0D%0A&url=https://oiwai-9b69a.firebaseapp.com/s/${this.post.post_id}&hashtags=YATTA%EF%BC%81%0D%0A&via=MegEngineer`;
        });
      });
  },
  methods: {}
};
</script>
<style scoped>
@import "../assets/css/reset.css";
@import "../assets/css/style.css";
.btn {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
