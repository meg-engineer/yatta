const functions = require("firebase-functions");
const express = require("express");
const app = express();
const admin = require("firebase-admin");

admin.initializeApp({});

const db = admin.firestore();

const url = "https://oiwai-9b69a.firebaseapp.com/post/";
const site_name = "YATTA!";
const title = "YATTA!";
const meta_description = "嬉しいこと、シェアしよう";
const meta_keywords = ["YATTA!"];
const og_description = "嬉しいこと、シェアしよう";
const og_image_width = 1200;
const og_image_height = 630;
const fb_appid = "";
const tw_description = "嬉しいこと、シェアしよう";
const tw_site = "https://https://oiwai-9b69a.firebaseapp.com/post/";
const tw_creator = "";

const genHtml = (image_url, post_id) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content="${meta_description}">
    <meta name="keywords" content="${meta_keywords.join(",")}">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:site_name" content="${site_name}">
    <meta property="og:description" content="${og_description}">
    <meta property="og:image" content="${image_url}">
    <meta property="og:image:width" content="${og_image_width}">
    <meta property="og:image:height" content="${og_image_height}">
    <meta property="fb:app_id" content="${fb_appid}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${tw_description}">
    <meta name="twitter:image" content="${image_url}">
    <meta name="twitter:site" content="${tw_site}${post_id}">
    <meta name="twitter:creator" content="${tw_creator}">
  </head>
  <body>
    <script>
      location.href = '${tw_site}${post_id}';
    </script>
  </body>
</html>
`;

app.get("/s/:id", (req, res) => {
  db.collection("cards")
    .where("post_id", "==", req.params.id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const html = genHtml(doc.data().imageurl, req.params.id);
        res.send(html);
      });
    });
});
exports.s = functions.https.onRequest(app);
