<template>
  <div class="app">
    <section id="gray-bg">
      <div class="flex-conteiner center">
        <div class="card-container">
          <svg
            ref="svgCard"
            width="800px"
            height="500px"
            viewBox="0 0 1200 630"
          >
            <g>
              <SVGElement name="card1" />
              <g>
                <rect
                  width="1000"
                  height="500"
                  rx="17.23"
                  transform="translate(100 70)"
                  fill="#fff"
                />
                <SVGElement name="title" x="70" y="0" />
                <path
                  id="パス_8"
                  data-name="パス 8"
                  d="M477.52,304.69,467,294.15a6.763,6.763,0,0,1,9.57-9.56h0l1,1,1-1a6.76,6.76,0,0,1,9.56,9.56Z"
                  fill="#e50132"
                />
                <path
                  id="パス_9"
                  data-name="パス 9"
                  d="M538.76,304.69l-10.54-10.54a6.763,6.763,0,0,1,9.57-9.56l1,1,1-1a6.76,6.76,0,0,1,9.56,9.56Z"
                  fill="#e50132"
                />
                <path
                  e
                  id="パス_10"
                  data-name="パス 10"
                  d="M600,304.69l-10.54-10.54a6.763,6.763,0,0,1,9.57-9.56h0l1,1,1-1a6.763,6.763,0,1,1,9.57,9.56h0Z"
                  fill="#e50132"
                />
                <path
                  id="パス_11"
                  data-name="パス 11"
                  d="M661.24,304.69l-10.53-10.54a6.76,6.76,0,0,1,9.56-9.56l1,1,1-1a6.763,6.763,0,1,1,9.57,9.56h0Z"
                  fill="#e50132"
                />
                <path
                  id="パス_12"
                  data-name="パス 12"
                  d="M722.48,304.69,712,294.15a6.76,6.76,0,0,1,9.56-9.56l1,1,1-1a6.763,6.763,0,1,1,9.57,9.56Z"
                  fill="#e50132"
                />
                <SVGElement name="img" x="400" y="150" />
                <text
                  transform="translate(103.29 347.281)"
                  fill="black"
                  font-size="29"
                  font-family="HiraginoSans-W5, Hiragino Sans"
                  letter-spacing="-0.002em"
                  word-break="normal"
                >
                  <!-- <tspan x="200" y="26">
                    {{ text }}
                  </tspan>-->
                  <tspan x="280" y="52">{{ text2 }}</tspan>
                  <tspan x="280" y="78">{{ text3 }}</tspan>
                  <tspan x="280" y="104">{{ text4 }}</tspan>
                  <tspan x="280" y="130">{{ text5 }}</tspan>
                  <!-- <tspan x="50" y="200">
                    {{ tag }}
                  </tspan>-->
                </text>
              </g>
            </g>
          </svg>
        </div>
        <div class="input-container">
          <label>やった！</label>
          <div class="message-input center">
            <textarea
              v-model="text"
              type="text"
              style="width:100%; margin-bottom:10px"
              maxlength="100"
              minlength="1"
              required
              rows="4"
              class="textarea"
              v-on:keyup.enter="regExp"
            ></textarea>
          </div>
        </div>
      </div>
      <div data-v-ee7dc48e class="create-button center">
        <button @click="create" class="button-color">作成する</button>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import SVGElement from "../assets/SVGElement";

const db = firebase.firestore();

const svg2imageData = (svgElement, successCallback, errorCallback) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const context = canvas.getContext("2d");
  const image = new Image();
  const svgData = new XMLSerializer().serializeToString(svgElement);
  image.src =
    "data:image/svg+xml;charset=utf-8;base64," +
    btoa(unescape(encodeURIComponent(svgData)));
  image.onload = () => {
    context.drawImage(image, 0, 0, 1200, 630);
    successCallback(canvas.toDataURL());
  };
  image.onerror = e => {
    errorCallback(e);
  };
};

function getUniqueStr(myStrong) {
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}

export default {
  name: "Home",
  data() {
    return {
      text: "ケーキもらった"
    };
  },
  components: {
    SVGElement
  },
  computed: {
    text2: function() {
      return this.text.substring(0, 15);
    },
    text3: function() {
      return this.text.substring(15, 30);
    },
    text4: function() {
      return this.text.substring(30, 45);
    },
    text5: function() {
      return this.text.substring(45, 60);
    }
  },
  methods: {
    async create() {
      svg2imageData(this.$refs.svgCard, async data => {
        const sRef = firebase.storage().ref();
        var uuid = getUniqueStr();
        const fileRef = sRef.child(`${uuid}.png`);
        // Firebase Cloud Storageにアップロード
        await fileRef.putString(data, "data_url");
        const url = await fileRef.getDownloadURL();
        console.log(url);
        // Firestoreに保存
        const card = db.collection("cards");
        await card.add({
          url,
          text: this.text,
          post_id: uuid,
          created_at: new Date()
        });
        this.text = "";
        this.tag = "";
        this.$router.push({ path: `/post/${uuid}` });
      });
    },
    regExp() {
      return this.text.concat("\n");
    }
  }
};
</script>
<style>
@import "../assets/css/reset.css";
@import "../assets/css/style.css";
</style>

© 2020 Meg.
