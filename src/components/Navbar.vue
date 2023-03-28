<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #111; display: flex;">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/contactlist" class="nav-link" style="color: white;">CONTACTLIST</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contactadd" class="nav-link" style="color: white;">ADD</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/register" class="nav-link" style="color: white;">REGISTER</router-link>
          </li>
          
          <li class="nav-item">
            <router-link to="/login" class="nav-link" style="color: white;">LOGIN</router-link>
          </li>   

          <li class="nav-item">
            <router-link to="/logout" class="nav-link" style="color: white;">LOGOUT</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>



    
<script>
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

export default {
  components: {
    Register,
    Login
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToSignUp() {
      this.$router.push('/register')
    },
    goToSignIn() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.navbar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

nav{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}


</style>