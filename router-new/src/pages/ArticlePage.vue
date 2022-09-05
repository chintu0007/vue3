<template>
    <div>
        Article Id parameter vue is {{ $route.params.id }}
        <div v-if="article">{{ article.title }}</div>
    </div>
</template>

<script>

import { articles } from "./../data";

export default {
    data() {
        return {
            article: null,
        }
    },
    watch: {
        '$route.params': {
            handler: function (newVal) {
                if (undefined !== newVal.id && undefined === articles[newVal.id]) { 
                    return this.$router.push({
                        name: "not-found",
                        params: {
                            url: "wrong",
                        },
                    });
                }
                this.article = articles[newVal.id];
            },
            immediate: true,
        }
    }
};

</script>