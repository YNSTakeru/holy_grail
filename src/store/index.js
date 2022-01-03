import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videoList: [],
  },
  mutations: {
    updateVideoList(state, videoList) {
      state.videoList = videoList;
    },
  },
  actions: {
    async searchAction({ commit }, request) {
      // firebaseに登録されているか確認する
      const db = getFirestore();

      const docRef = doc(
        db,
        "videoList",
        request.params.q + request.params.publishedBefore
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        commit("updateVideoList", docSnap.data().videoList);
      } else {
        axios
          .get(`https://www.googleapis.com/youtube/v3/search?`, {
            params: request.params,
          })
          .then((response) => {
            const items = response.data.items;
            const videoList = [];

            items.forEach((item) => {
              videoList.push({
                videoId: item.id.videoId,
                publishedAt: item.snippet.publishedAt,
                title: item.snippet.title,
                description: item.snippet.description,
                image: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
              });
            });
            const videosRef = collection(db, "videoList");

            setDoc(
              doc(videosRef, request.params.q + request.params.publishedBefore),
              {
                videoList: videoList,
              }
            );
            commit("updateVideoList", videoList);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
  modules: {},
});
