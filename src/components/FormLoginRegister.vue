<template>
  <div class="form-area-body">
        <div class="form-wrap">
            <div class="form-body">
                <h2 class="text-center">Welcome to Gober's Sporting Goods</h2> <br>
                <input id="tab-1" type="radio" name="tab" class="login-tab" value="true" v-model="$store.state.alreadyRegister"><label for="tab-1" class="tab">Login</label>
                <input id="tab-2" type="radio" name="tab" class="register-tab" value="false" v-model="$store.state.alreadyRegister"><label for="tab-2" class="tab">Register</label>
                <div class="form">
                    <div class="login">
                        <div class="group">
                            <label for="loginEmail" class="label">Email</label>
                            <input id="loginEmail" type="text" class="input" v-model="loginEmail" placeholder="Your Email">
                        </div>
                        <div class="group">
                            <label for="loginPassword" class="label">Password</label>
                            <input id="loginPassword" type="password" class="input" v-model="loginPassword" placeholder="Your Password">
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="Login" @click="login" v-if="!isLoading">
                        </div>
                        <div class="loader d-flex justify-content-center mb-3" v-if="isLoading">
                            <Circle2></Circle2>
                        </div>
                        <div class="foot">
                            <label class="back" @click="backToHomepage"><i class="fas fa-chevron-left"></i> Back to Homepage</label>
                        </div>
                        <div class="hr"></div>
                        <div class="foot">
                            <label><i class="far fa-copyright"></i> Photo by Lukas Hartmann from Pexels</label>
                        </div>
                    </div>
                    <div class="register">
                        <div class="group">
                            <label for="registerName" class="label">Name</label>
                            <input id="registerName" type="text" class="input" v-model="registerName" placeholder="Your Name">
                        </div>
                        <div class="group">
                            <label for="registerEmail" class="label">Email</label>
                            <input id="registerEmail" type="text" class="input" v-model="registerEmail" placeholder="Your Email">
                        </div>
                        <div class="group">
                            <label for="registerPassword" class="label">Password</label>
                            <input id="registerPassword" type="password" class="input" v-model="registerPassword" placeholder="Your Password">
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="Register" @click="register" v-if="!isLoading">
                        </div>
                        <div class="loader d-flex justify-content-center mb-3" v-if="isLoading">
                            <Circle2></Circle2>
                        </div>
                        <div class="foot">
                            <label class="back" @click="backToHomepage"><i class="fas fa-chevron-left"></i> Back to Homepage</label>
                        </div>
                        <div class="hr"></div>
                        <div class="foot">
                            <label><i class="far fa-copyright"></i> Photo by Lukas Hartmann from Pexels</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Circle2 } from 'vue-loading-spinner'
export default {
  name: 'FormLoginRegister',
  components: {
    Circle2
  },
  data () {
    return {
      registerName: '',
      registerEmail: '',
      registerPhone: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    backToHomepage () {
      this.$store.commit('set_registration_status', false)
      this.$store.commit('set_navbar_shown_toggle', true)
      this.$router.push({ name: 'Home' })
    },
    login () {
      const data = {
        email: this.loginEmail,
        password: this.loginPassword
      }

      this.$store.dispatch('login', data)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push({ name: 'Home' })
          this.loginEmail = ''
          this.loginPassword = ''
          this.$store.commit('set_navbar_shown_toggle', true)
          this.$store.commit('set_login_status', true)
          const payload = this.$jwt.decode(localStorage.access_token, this.$store.state.secretKey)
          this.$store.commit('set_current_user', payload.name)
          this.$toasted.show(`Welcome ${payload.name}! Happy Shopping!`, {
            type: 'info'
          })
          this.$store.dispatch('showProducts')
          this.$store.dispatch('getAllCategory')
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error)
        })
        .finally(() => {
          this.$store.commit('set_loading_status', false)
        })
    },
    register () {
      const data = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword,
        phoneNumber: this.registerPhone
      }

      this.$store.dispatch('register', data)
        .then(({ data }) => {
          this.registerName = ''
          this.registerEmail = ''
          this.registerPassword = ''
          this.registerPhone = ''
          this.$store.commit('set_registration_status', true)
          this.$toasted.show('Registration Success! Now login to start your season at Gober\'s Sporting Goods', {
            type: 'info'
          })
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error)
        })
        .finally(() => {
          this.$store.commit('set_loading_status', false)
        })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>

.form-area-body {
    background:#f5efef;
}

*,:after,:before{
    box-sizing:border-box;
    margin: 0;
}

.form-wrap{
  color:#c7c4c4;
  font:600 16px/18px 'Open Sans',sans-serif;
  width:100%;
  margin:auto;
  max-width:525px;
  min-height:670px;
  position:relative;
  background:url(../assets/bg-log.jpg) no-repeat center;
  background-size: 1000px;
  -webkit-box-shadow: 0px 2px 20px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 2px 20px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 2px 20px -2px rgba(0,0,0,0.75);
}

.form-body{
  width:100%;
  height:100%;
  position:absolute;
  padding:50px 70px 50px 70px;
  background:rgba(2, 12, 22, 0.75);
}

.form-body .login,
.form-body .register{
  top:0;
  left:0;
  right:0;
  bottom:0;
  position:absolute;
  transform:rotateY(180deg);
  backface-visibility:hidden;
  transition:all .4s linear;
}

.form-body .login-tab,
.form-body .register-tab,
.form .group .check{
  display:none;
}

.form-body .tab{
  font-size:22px;
  margin-right:15px;
  padding-bottom:5px;
  margin:0 15px 10px 0;
  display:inline-block;
  border-bottom:2px solid transparent;
}

.form-body .login-tab:checked + .tab,
.form-body .register-tab:checked + .tab{
  color:#fff;
  border-color:#1161ee;
  }

.form{
  min-height:345px;
  position:relative;
  perspective:1000px;
  transform-style:preserve-3d;
}

.form .group{
  margin-bottom:15px;
}

.form .group .label,
.form .group .input,
.form .group .button{
  width:100%;
  color:#fff;
  display:block;
}

.form .group .input,
.form .group .button{
  border:none;
  padding:15px 20px;
  border-radius:30px;
  background:rgba(255,255,255,.1);
}

.form .group .label{
  color:rgb(236, 221, 221);
  font-size:15px;
}

.form .group .button{
  background:#1161ee;
}

.form .group label .icon{
  width:15px;
  height:15px;
  border-radius:2px;
  position:relative;
  display:inline-block;
  background:rgba(255,255,255,.1);
}

.form .group label .icon:before,
.form .group label .icon:after{
  content:'';
  width:10px;
  height:2px;
  background:#fff;
  position:absolute;
  transition:all .2s ease-in-out 0s;
}

.form .group label .icon:before{
  left:3px;
  width:5px;
  bottom:6px;
  transform:scale(0) rotate(0);
}

.form .group label .icon:after{
  top:6px;
  right:0;
  transform:scale(0) rotate(0);
}

.form .group .check:checked + label{
  color:#fff;
}

.form .group .check:checked + label .icon{
  background:#1161ee;
}

.form .group .check:checked + label .icon:before{
  transform:scale(1) rotate(45deg);
}

.form .group .check:checked + label .icon:after{
  transform:scale(1) rotate(-45deg);
}

.form-body .login-tab:checked + .tab + .register-tab + .tab + .form .login{
  transform:rotate(0);
}

.form-body .register-tab:checked + .tab + .form .register{
  transform:rotate(0);
}

.hr{
  height:2px;
  margin:30px 0;
  background:rgba(255,255,255,.2);
}

.foot {
  text-align:center;
}

.back:hover {
  cursor: pointer;
}

.button:hover {
  cursor: pointer;
  background-color: #0a409e;
}

.input {
    font-size: 18px;
}
</style>
