<template>
  <c-form :model="form" :rules="rules" @validate-success="onSubmit">
    <c-form-item label="Activity name" prop="name">
      <input v-model="form.name" type="text" />
    </c-form-item>
    <c-form-item label="Activity zone" prop="region">
      <CSelect v-model="selection" :option="['Zone One', 'Zone Two', 'Zone Three']" />
      {{ selection }}
    </c-form-item>
    <c-form-item label="Active type" prop="delivery">
      <Checkbox v-model="form.delivery" size="small" text="Online activities" />
      <Checkbox v-model="form.delivery" size="small" text="Promotion activities" />
    </c-form-item>
    <c-form-item label="Instant delivery" prop="delivery">
      <CSwitch v-model="disabledSwitchValue" />
    </c-form-item>
    <c-form-item label="Resources" prop="resource">
      <div>
        <label>
          <input type="radio" v-model="form.resource" value="Sponsor" /> Sponsor
        </label>
        <label>
          <input type="radio" v-model="form.resource" value="Venue" /> Venue
        </label>
      </div>
    </c-form-item>
    <c-form-item label="Activity form" prop="desc">
      <CTextarea v-model="form.desc" placeholder="Enter your text here" maxLength="100"></CTextarea>
    </c-form-item>
    <div>
      <CButton type="submit">Create</CButton>
      <CButton type="info">Cancel</CButton>
    </div>
  </c-form>
</template>

<script setup>
import { ref } from 'vue'
const disabledSwitchValue = ref(false);
const selection = ref('')
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: [],
  resource: '',
  desc: '',
})

const rules = {
  name: [
    { required: true, message: 'Please input the activity name' },
    { min: 3, message: 'The activity name must be at least 3 characters' },
  ],
  region: [
    { required: true, message: 'Please select the activity zone' },
  ],
  date1: [
    { required: true, message: 'Please select the start date' },
  ],
  date2: [
    { required: true, message: 'Please select the end time' },
  ],
  resource: [
    { required: true, message: 'Please choose a resource' },
  ],
  desc: [
    { required: true, message: 'Please input the activity form' },
    { min: 10, message: 'The description must be at least 10 characters' },
  ],
}

const onSubmit = () => {
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

input[type="checkbox"],
input[type="radio"] {
  margin-right: 5px;
}
</style>
