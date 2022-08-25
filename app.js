let nextTaskId = 100;
const app = Vue.createApp({
  data() {
    return {
      onlyPending: false,
      tasks: [
        {
          id: 1,
          description: "Buy food for the dog",
          priority: false,
          done: false,
        },
        {
          id: 2,
          description: "Pay the bills",
          priority: true,
          done: false,
        },
        {
          id: 3,
          description: "Buy some computer games",
          priority: false,
          done: false,
        },
        {
          id: 4,
          description: "Go to the gym",
          priority: false,
          done: false,
        },
      ],
    };
  },
  computed: {
    displayedTasks() {
      return [...this.tasks]
        .sort((a, b) => Number(b.priority) - Number(a.priority))
        .filter((task) => !this.onlyPending || !task.done);
    },
  },
  methods: {
    taskAdded(task) {
      this.tasks.push({
        id: nextTaskId++,
        description: task,
        done: false,
        priority: false,
      });
    },
  },
});

app.component("todo-list-item", {
  props: {
    task: {
      type: Object,
      required: true,
      // validator(value) {
      //     return "Okay" === value;
      // }
    },
    // id:{
    //     type:Number,
    //     required:true,
    //     validator(value) {
    //         return value >=1 && value <=100;
    //     },
    //     // default() {
    //         // return [];
    //     // },
    // },
    done: Boolean,
    priority: Boolean,
  },
  emits: ["update:done", "update:priority"],
  template: `<div
    class="bg-white shadow-sm rounded-md text-gray-700 text-xs md:text-sm p-4"
    :class="{'opacity-25 line-through': task.done}">
        <div>{{task.description}}</div>
        <div class="py-4 bg-white">
        <base-checkbox class="mb-2"
          label="Done"
          @update:model-value="$emit('update:done', $event)"
          :model-value="done"></base-checkbox>
        <base-checkbox
          label="Prioritized"
          @update:model-value="$emit('update:priority', $event)"
          :model-value="priority"></base-checkbox>
      </div>
    </div>`,
});

app.component("add-task-input", {
  emits: ["added"],
  data() {
    return {
      task: "",
    };
  },
  methods: {
    add() {
      this.$emit("added", this.task);
      this.task = "";
    },
  },
  template: `<input type="text"
        placeholder="Enter task and hit enter"
        @keyup.enter="add" 
        v-model="task"
        class="block w-full rounded-sm text-lg p-4" />`,
});

app.component("base-checkbox", {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },

  methods: {
    onChange() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
  emits: ["update:modelValue"],
  template: `<div class="flex items-center">
            <input type="checkbox" 
            :checked="modelValue"
            @change="onChange"
            class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
            />
            <label>{{label}}</label>
        </div>`,
});

app.mount("#app");