<!-- eslint-disable prettier/prettier -->
<template>
    <div class="flex items-center">
        <input type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2" :checked="modelValue"
            @change="onChange" />
        <label>
            <slot>Checkbox</slot>
        </label>
    </div>
</template>

<script>

export default {
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        // label: {
        //   type: String,
        // },
    },
    methods: {
        onChange() {
            this.$emit("update:modelValue", !this.modelValue);
        },
    },
}

</script>