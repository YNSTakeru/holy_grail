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
import config from "./config";

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
      const requestParams =
        request.params.q +
        request.params.publishedBefore +
        request.params.order;
      const docRef = doc(db, "videoList", requestParams);
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

            setDoc(doc(videosRef, requestParams), {
              videoList: videoList,
            });
            commit("updateVideoList", videoList);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
  getters: {
    videoList(state) {
      return state.videoList;
    },
    order() {
      return config.state.order;
    },
  },
  modules: {
    config,
  },
});
