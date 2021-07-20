<template>
  <div class="login-page m-0">
    <div class="col-3 pt-lg-4 pb-lg-4 login">
      <form @submit.prevent="logIn" type="submit">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  props: ["isLoggedIn"],
  created() {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)

        .then(() => {
          this.$router.replace({ name: "Stats" });
        })
        .catch(() => {
          alert("you are not administrator!");
        });
    },
  },
};
</script>

<style scoped>
.login {
  border: 1px solid rgb(109, 109, 109);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  max-height: 350px;
  box-shadow: 20px 19px 20px 15px rgb(0 0 0 / 21%);
}

</style>