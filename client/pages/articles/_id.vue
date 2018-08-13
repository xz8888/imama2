<template>
    <div>
        <section class="container">
            {{article.title}}
   
        </section>
    </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

    export default {
        data() {
            return {
                loaded: false
            }
        },
        computed: {
            article() {
                return this.$store.getters['article/article']
            }
        },
        async fetch ({ store, params }) {
            store.commit('article/empty')
            const response = await strapi.request('post', '/graphql', {
                data: {
                    query: `query {
                        article (id: "${params.id}"){
                            _id
                            title
                        }
                    }`
                }
            })
            
            store.commit('article/set', {
                id: response.data.article.id || response.data.article._id, 
                ...response.data.article
            })    
        }
    }
</script>

<style scoped>

</style>