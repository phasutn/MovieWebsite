<template>
  <main>
    <div id="contactlist">
      <div>
        <h1 style="text-align:center">CONTACT LIST<br></h1>
        <div class="list">
          <input type="text" placeholder="Search name" v-model="search">
          <table>
            <tbody>
              <tr v-for="(acontact, index) in filterContacts" :key="acontact.id">
                <div class="contactBox">
                  <div class="contactBoxContent">
                    <img :src="acontact.imageUrl" class="imageHolder">
                    <div style="margin: auto">
                      <div>{{acontact.firstname}} {{acontact.lastname}}</div>
                      <div>Title: {{acontact.mobileNo}}</div>
                      <div>Email: {{acontact.email}}</div>
                      <div>Facebook: {{acontact.facebook}}</div>
                      <div style="display: flex; justify-content: center">
                        <router-link :to="{path:'/contactupdate' , name: 'contactupdate', params: {contactId: acontact._id}}">
                        <button type="button" class="btn btn-warning">UPDATE</button>
                        </router-link >
                        <button @click="deleteContact(acontact._id)" class="btn btn-danger">DELETE</button>
                      </div>
                    </div>
                  </div>
                  <td v-if="index % 2 === 0"></td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

  
<script>
import {collection, onSnapshot, getFirestore} from 'firebase/firestore'
import {getAuth, signOut} from 'firebase/auth'
import { assert } from '@vue/compiler-core'
  export default {
    name: 'CityList',
    data () {
      return {
        msg: 'EGCI427 Practice',
        city: null,
        cities: {},
        cityIds:{},
        editName: [],
        auth: getAuth()
      }
    },
    mounted () {
      console.log('City List')
      const db = getFirestore()
      const colRef = collection(db, "cities")
      onSnapshot(colRef, snapShot => {
        this.cities = snapShot.docs.map(doc => doc.data())
        this.cityIds = snapShot.docs.map(doc => doc.id)
      })
    },
    methods: {
      logout () {
        console.log('logout')
        signOut(this.auth)
      .then(()=>{
        this.$router.replace('/signin')
      })
      .catch((error) => {
        alert(error.message)
      })
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
p.citydetail{
  text-align: justify;
}


</style>
