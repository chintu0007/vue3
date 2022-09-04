<template>
    <div>
        Article Id parameter vue is {{ $route.params.id }}
        <div v-if="article">{{ article.title }}</div>
    </div>
</template>

<script>

    const articles = {
        1: {"title": "the article is 1"},
        2: {"title": "the article is 2"},
        3: {"title": "the article is 3"},
    };

    export default {
        data() {
            return {
                article: null,
            }
        },
        watch: {
        '$route.params': {
            handler: function (newVal) {                
                if(undefined === articles[newVal.id]) {
                    return this.$router.puhs({
                        name: "not-found",
                        params: {
                            url:"wrong",
                        },
                    });
                }   
                  this.article = articles[newVal.id];               
            },
            immediate:true,
        }
    }
    };   

</script>