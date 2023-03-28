<template>
  <div class="info">
    <div>
      <div >
        <h1>{{ movieInfo.title }}</h1>
        <h2>{{ movieInfo.original_title }}</h2>
        <h3>{{ movieInfo.release_date }}</h3>
        <p>{{ movieInfo.overview }}</p>
        <input type="text" v-model='review'>
        <button @click="setReview">Save</button>
        <button @click="deleteReview">Delete</button>
        <div>
          Your review: {{curUserReview.review}}
          <div v-for="(review, key) in reviews" :key ='key' >
            Other people review:
            <div>
              {{review.review}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import {collection, onSnapshot, doc, getFirestore, addDoc, setDoc, updateDoc, deleteDoc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
//import { assert } from '@vue/compiler-core'
import axios from 'axios'
  export default {
    name: 'CityList',
    data () {
      return {
        apikey: 'e4812b0763e5a2d97cbb969c192759a7',
        movieInfo: {},
        movieId: this.$route.params.movieid,
        reviews: {},
        review: '',
        curUserReview: {},
        curUserId: getAuth().currentUser.uid
      }
    },
    created() {
      let infoUrl = 'https://api.themoviedb.org/3/movie/' + this.movieId + '?api_key=' + this.apikey;
      axios.get(infoUrl)
      .then((response) => {
        this.movieInfo = response.data;
        console.log(this.movieInfo);
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    mounted () {
      console.log('Review List');
      const db = getFirestore();
      const colRef = collection(db, "movies");
      const docRef = doc(colRef, this.movieId);
      const subColRef = collection(docRef, "reviews");
      onSnapshot(subColRef, snapShot => {
        this.reviews = snapShot.docs
          .filter(doc => doc.id !== this.curUserId)
          .map(doc => doc.data());
        const userReview = snapShot.docs
          .filter(doc => doc.id === this.curUserId)
          .map(doc => doc.data())
          .shift();
        this.curUserReview = userReview || {};
      });
    },
    methods: {
      async setReview() {
        const db = getFirestore()
        const docRef = doc(db, "movies", this.movieId);
        const subColRef = collection(docRef, "reviews");
        const subDocRef = doc(subColRef, this.curUserId);
        const dataObj = {review: this.review};
        await setDoc(subDocRef, dataObj);
      },
        async deleteReview(){
        const db = getFirestore()
        const docRef = doc(db, "movies", this.movieId);
        const subColRef = collection(docRef, "reviews");
        const subDocRef = doc(subColRef, this.curUserId);
        await deleteDoc(subDocRef)
      }
    }
  }
  </script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #ffffff;
}
p {
  font-size: 16px;
  margin-top: 10px;
}



</style>
