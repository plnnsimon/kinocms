<template>
  <div class="login-page m-0" @click="closeLogin">
    <div @click.stop v-if="!loading" class="login">
      <form @submit.prevent="onLogIn" type="submit">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            required
            v-model="email"
            @blur="validateEmail"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            :class="{ red: errLoginMessage }"
          />
          <p style="color: red; font-weight: bold" v-if="errLoginMessage">
            Write correct email...
          </p>
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            required
            v-model="password"
            @blur="validatePassword"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            :class="{ red: errPasswordMessage }"
          />
          <p style="color: red; font-weight: bold" v-if="errPasswordMessage">
            Write correct password...
          </p>
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      email: "",
      password: "",
      errLoginMessage: false,
      errPasswordMessage: false,
    };
  },
  computed: mapGetters(["isLoggedIn", "loading"]),
  methods: {
    onLogIn() {
      this.$store.dispatch("logIn", {
        email: this.email,
        password: this.password,
      })
      this.$emit("closeLogin", false);
    },
    closeLogin() {
      this.$emit("closeLogin", false);
    },
    validateEmail() {
      if (this.email.length <= 0) {
        this.errLoginMessage = true;
      } else {
        this.errLoginMessage = false;
      }
    },
    validatePassword() {
      if (this.password.length <= 0) {
        this.errPasswordMessage = true;
      } else {
        this.errPasswordMessage = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  max-height: 350px;
  background: #e5e5e5;
  padding: 30px 0;
  width: 30%;
  box-shadow: 6px 8px 20px 5px rgb(255 255 255 / 39%);
}
.login-page {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #000000ba;
  z-index: 11;
}
.red {
  border: 4px solid red;
  box-shadow: 0px 0px 12px 2px red;
}
</style>