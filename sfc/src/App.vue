<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="flex flex-col md:flex-row">
    <div class="
    w-full
        md:w-1/3
        xl:w-1/5
        mr-4
        px-0
        md:px-4
        mb-4
        h-full
        text-lg
        md:text-sm
      ">
      <ProjectList :projects="projects" />
    </div>
    <div class="w-full md:w-2/3 xl:w-4/5">
      <div class="mb-4">
        <AddTaskInput @added="taskAdded"></AddTaskInput>
        <BaseCheckbox class="mb-4 p-4 text-gray-600 text-sm font-weight-100" v-model="onlyPending">
          <b>Only Pending tasks</b>
        </BaseCheckbox>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ToDoListItem v-for="task in displayedTasks" :task="task" :key="task.id" :done="task.done"
          :priority="task.priority" @update:done="taskUpdated(task, { done: $event })"
          @update:priority="taskUpdated(task, { priority: $event })">
        </ToDoListItem>
      </div>
      <SummeryLine class="mt-8"></SummeryLine>
    </div>
  </div>
</template>
<script>
let nextTaskId = 100;
import AddTaskInput from "./components/AddTaskInput.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";
import ToDoListItem from "./components/ToDoListItem.vue";
import SummeryLine from "./components/SummeryLine.vue";
import ProjectList from "./components/ProjectList.vue";

import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
} from "./store/mutation-types";

import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    ToDoListItem,
    BaseCheckbox,
    AddTaskInput,
    SummeryLine,
    ProjectList,
  },
  data() {
    return {};
  },

  // computed: mapState([]),
  computed: {
    ...mapState(["activeProjectId"]),
    ...mapGetters({
      projects: "projectsWithStats",
      // activeProject: "activeProject",
      tasks: "activeProjectTasks",
    }),
    // ...mapState({ activeId: "activeProjectId" }),
    // ...mapState({
    // activeId: (state) => state.activeProjectId ?? 1,
    // activeId(state) {
    //   this.projects
    // }
    // }),
    // projects() {
    //   return this.$store.getters.projectsWithStats;
    // },
    // tasks() {
    //   // return this.$store.state.tasks;
    //   return this.activeProject?.tasks ?? [];
    // },
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
        //this.$store.commit(SET_ONLY_PENDING, newValue)
        this[SET_ONLY_PENDING](newValue);
      },
    },
    activeProjectId() {
      return this.$store.state.activeProjectId;
    },
  },
  methods: {

    ...mapMutations([ADD_TASK, UPDATE_TASK, SET_ONLY_PENDING]),

    taskAdded(task) {
       this[ADD_TASK]({
          projectId: this.activeProjectId,
          task: {
            id: nextTaskId++,
            description: task,
            done: false,
            priority: false,
          },
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
      //this.$store.commit("updateTask", Object.assign(task, changes));
      this[UPDATE_TASK]({
        projectId: this.activeProjectId,
        task: Object.assign(task, changes),
      });
    },
  },
};
</script>