<template>
    <div class="container" style="box-sizing: content-box;">
      <div class="loginPanel">
        <h1>SIGN OUT</h1><br/>
          <div class="loginText">
            CLICK <a href="/signin">HERE</a> TO CHANGE ACCOUNT
          </div><br/>
        <button type="submit" @click="logout">SIGN OUT</button>
      </div>
    </div>

</template>

<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  methods: {
    async logout() {
      try {
        await signOut(getAuth())
        this.$router.replace('/signin')
      } catch (error) {
        console.error(error)
      }
    }
  }
}

</script>

<style>
.loginText{
  text-align: center;
  max-width: 100%; 
  overflow-wrap: break-word;
  font-size: 25px;
}
</style>