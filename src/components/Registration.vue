<template>
  <div class="d-flex justify-content-center pt-5">
    <div class="col-5 registration p-4">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="name"
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
            v-model="name"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label"
            >Confirm Password</label
          >
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Registration",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        console.log(user);
        this.$router.replace({ name: "Stats" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.registration {
  border: 1px solid rgb(109, 109, 109);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  max-height: 500px;
  box-shadow: 20px 19px 20px 15px rgb(0 0 0 / 21%);
}
form {
  max-width: 500px;
  width: 100%;
}
</style>