<template>
  <div class="movie-review">
    <div class="movie-poster">
      <img :src="getPoster()" style="max-width: 400px;"/>
      </div>
      <div class="movie-info">
        <h1 class="movie-title">{{ movieInfo.title }}</h1>
        <div class="movie-rating">Rating: {{ movieInfo.rating }}/100</div>
        <p class="movie-description" style="font-size: 20px">{{ movieInfo.overview }}</p>
        <hr />
        <h2 class="review-title">Comments:</h2>
        <div class="review-form">
          <form @submit.prevent="">
            <textarea v-model="commentText" placeholder="Add your review"></textarea>
            <button type="submit">Submit</button>
        </form>
      </div>
      <div class="review-list" > 
        <ul style="margin: 0; padding: 0;">
          <li style="list-style:none">
          <!-- <li v-for="comment in comments" :key="comment.id"> -->
            <div class="review-section">
              <div class="reviewer-name">User 1</div>
              <div class="review-content">so bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lolso bad lol</div>
            </div>
          </li>
        </ul>
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
        moviePoster: '',
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
      },
    getPoster (){
    if(this.movieInfo.poster_path != null){
      return 'https://image.tmdb.org/t/p/original' + this.movieInfo.poster_path;
    }
    else return 'https://via.placeholder.com/500x750?text=Poster+Not+Available'
      }   
    }
  }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .movie-review {
    display: flex;
    flex-direction: row;
    margin: 20px;
  }

  .movie-container {
    display: flex;
    margin-bottom: 20px;
  }

  .movie-poster{
    margin-right: 20px;
  }

  .movie-rating {
    font-size: 25px;
    margin-bottom: 10px;
  }

  .review-form {
    margin-bottom: 20px;
  }

  .review-form textarea {
    width: 100%;
    height: 100px;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .review-form button {
    font-size: 15px;
    border-width: 5px;
    border-color: grey;
  }
  
  .review-section{
    margin-bottom: 30px;
  }

  .reviewer-name{
    font-size: 25px;
  }

  .review-content{
    font-size: 15px;
  }


</style>
