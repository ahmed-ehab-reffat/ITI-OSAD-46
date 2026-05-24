<script setup>
//
import { computed, reactive, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
const name = "Ahmed Ghoraba";
const faculty = "Faculty of Pharmacy";
const nameRef = ref("Ahmed Ghoraba");
console.log(nameRef);
setTimeout(() => {
  nameRef.value = "Ahmed Ghorabaaaaaaaaaaaaaaaaaaa";
}, 3000);

const studentsArr = reactive([
  { id: 1, name: "Ahmed Ghoraba", age: 27, faculty: "Faculty of Pharmacy" },
  { id: 2, name: "Mahmoud Ahmed", age: 17, faculty: "Faculty of Science" },
]);

const myNumber = ref(0);

// FUNCTION
const getFacultyColor = (faculty) => {
  return faculty.includes("Pharmacy") ? "bg-green-400" : "bg-red-400";
};

// computed
const facultyColor = computed(() => {
  return name.includes("Pharmacy") ? "bg-green-400" : "bg-red-400";
});

const alerter = () => {
  alert("YAY we are going to take a break soon");
};

const navItems = ref([
  { type: "single", url: "/", name: "Home from props" },
  {
    type: "parent",
    childItems: [
      { url: "/", name: "Item 111" },
      { url: "/", name: "Item 2111" },
    ],
  },
]);
</script>

<template>
  <NavBar :nav-items="navItems" :title="'Custom'" />
  <div>
    <h1>{{ name }}</h1>
    <h2>{{ faculty }}</h2>
    <h3>{{ nameRef }}</h3>
  </div>

  <div
    class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
  >
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Faculty</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="student in studentsArr">
          <th>{{ student.id }}</th>
          <td>{{ student.name }}</td>
          <td v-if="student.age > 18">{{ student.age }} Adult</td>
          <td v-else>{{ student.age }} Child</td>
          <td :class="getFacultyColor(student.faculty)">
            {{ student.faculty }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="alerter">Click</button>
</template>
