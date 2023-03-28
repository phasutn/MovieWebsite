<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: black; display: flex;">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/movielist" class="nav-link" style="color: white;">MOVIE</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/signup" class="nav-link" style="color: white;">REGISTER</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/signin" class="nav-link" style="color: white;">LOGIN</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/signout" class="nav-link" style="color: white;">LOGOUT</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import SignOut from '@/views/SignIn.vue'

export default {
  components: {
    SignUp,
    SignIn,
    SignOut,
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToSignUp() {
      this.$router.push('/signup')
    },
    goToSignIn() {
      this.$router.push('/signin')
    }
  }
}
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

nav{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

/* Make sure the parent container has no margin or padding */
body {
  margin: 0;
  padding: 0;
}
</style>