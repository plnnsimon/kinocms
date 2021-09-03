<template>
  <div class="d-flex justify-content-center pt-5">
    <div class="registration">
      <form @submit.prevent="handleSubmit">
        <div>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="name"
              class="form-control"
              id="name"
              aria-describedby="emailHelp"
              v-model="user.name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="surname" class="form-label">Surname</label>
            <input
              type="surname"
              class="form-control"
              id="surname"
              aria-describedby="emailHelp"
              v-model="user.surname"
              required
            />
          </div>
          <div class="mb-3">
            <label for="nickname" class="form-label">Nickname</label>
            <input
              type="text"
              class="form-control"
              id="nickname"
              aria-describedby="emailHelp"
              v-model="user.nickname"
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              aria-describedby="emailHelp"
              v-model="user.address"
              placeholder="г. Киев, улица Такаято, 1"
            />
          </div>
          <div class="mb-3">
            <label for="cardNumber" class="form-label">Card number</label>
            <input
              type="text"
              class="form-control"
              id="cardNumber"
              aria-describedby="emailHelp"
              v-model="user.cardNumber"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              aria-describedby="emailHelp"
              v-model="user.phoneNumber"
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Birth date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              aria-describedby="emailHelp"
              v-model="user.birthDate"
            />
          </div>
        </div>
        <div>
          <div class="mb-3">
            <label for="city" class="form-label">Город</label>
            <select v-model="user.city" name="city" id="city">
              <option value="Киев">Киев</option>
              <option value="Харьков">Харьков</option>
              <option value="Одесса">Одесса</option>
              <option value="Львов">Львов</option>
              <option value="Чернигов">Чернигов</option>
              <option value="Днепр">Днепр</option>
              <option value="Черновцы">Черновцы</option>
            </select>
          </div>
          <div class="mb-3 container">
            <p>Language:</p>
            <label for="ru" class="form-label">ru</label>
            <input
              name="lang"
              value="ru"
              type="radio"
              class=""
              id="ru"
              aria-describedby="emailHelp"
              v-model="user.language.ru"
            />
            <label for="ua" class="form-label">ua</label>
            <input
              value="ua"
              type="radio"
              name="lang"
              class=""
              id="ua"
              aria-describedby="emailHelp"
              v-model="user.language.ua"
            />
          </div>
          <div class="mb-3 container">
            <p>Sex:</p>
            <label for="man" class="form-label">man</label>
            <input
              value="man"
              type="radio"
              class=""
              id="man"
              name="sex"
              aria-describedby="emailHelp"
              v-model="user.sex.man"
            />
            <label for="woman" class="form-label">woman</label>
            <input
              value="woman"
              type="radio"
              class=""
              id="woman"
              name="sex"
              aria-describedby="emailHelp"
              v-model="user.sex.woman"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model="user.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              @blur="validate"
              v-model="user.password"
              required
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
              v-model="user.confirmPassword"
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">{{ $t('update') }}</button>
        <button type="submit" class="btn btn-primary" @click="closeEditingMenu">{{ $t('cancel') }}</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "EditUsers",
  props: ['user'],
  data() {
    return {
      
    };
  },
  methods: {
    validate() {
      if (this.user.password.length < 6) {
        alert('password must be longer')
      }
    },
    handleSubmit() {
      this.$store.dispatch("updateUser", this.user)
      
      this.$emit('closeEditingMenu', false)
    },
    closeEditingMenu() {
      this.$emit('closeEditingMenu', false)
    }
  },
};
</script>

<style scoped>
.registration {
  border: 1px solid rgb(109, 109, 109);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  box-shadow: 20px 19px 20px 15px rgb(0 0 0 / 21%);
  width: 100%;
}
form {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding: 20px;
}
form button {
  width: 100px;
  height: 40px;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container p {
  margin: 0;
}
.container label {
  margin: 0;
}
</style>