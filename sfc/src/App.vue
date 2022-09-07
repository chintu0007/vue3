<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="mb-4">
    <AddTaskInput @added="taskAdded"></AddTaskInput>
    <BaseCheckbox 
        class="mb-4 p-4 text-gray-600 text-sm font-weight-100" 
        v-model="onlyPending">
        <b>Only Pending tasks</b>
    </BaseCheckbox>
  </div>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <ToDoListItem 
            v-for="task in displayedTasks" 
            :task="task" 
            :key="task.id" 
            :done="task.done"
            :priority="task.priority"
            @update:done="taskUpdated(task, { done: $event })"
            @update:priority="taskUpdated(task, { priority: $event })">
    </ToDoListItem>
  </div>
  <SummeryLine class="mt-8"></SummeryLine>
</template>
<script>
let nextTaskId = 100;
import AddTaskInput from "./components/AddTaskInput.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";
import ToDoListItem from "./components/ToDoListItem.vue";
import SummeryLine from "./components/SummeryLine.vue";

export default {
  name: "App",
  components: {
    ToDoListItem,
    BaseCheckbox,
    AddTaskInput,
    SummeryLine,
  },
  data() {
    return {};
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    displayedTasks() {
      return [...this.tasks]
        .sort((a, b) => Number(b.priority) - Number(a.priority))
        .filter((task) => !this.onlyPending || !task.done);
    },
    onlyPending: {
      get() {
        return this.$store.state.onlyPending;
      },
      set(newValue) {
        this.$store.commit("setOnlyPending", newValue)
      },      
    },
  },
  methods: {

    taskAdded(task) {
      this.$store.commit(
        "addTask",
        {
          id: nextTaskId++,
          description: task,
          done: false,
          priority: false,
        }
      )
      // this.tasks.push({
      //   id: nextTaskId++,
      //   description: task,
      //   done: false,
      //   priority: false,
      // });
    },
    taskUpdated(task, changes) {
      this.$store.commit("updateTask", Object.assign(task, changes));
    },
  },
};
</script>