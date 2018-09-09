<template>
  
    <section class="section">
        <div class="container">
            <div class="columns is-variable is-8">
                <div class="column is-two-thirds ">
                    <h2>{{article.title}}</h2>   
                    <div v-html="article.description">
                    </div>
                </div>
             </div>
        </div>
    </section>
   
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const strapi = new Strapi(process.env.apiUrl)

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
            // store.commit('article/empty')
            console.log(process.env.apiUrl)
            const response = await strapi.request('post', '/graphql', {
                data: {
                    query: `query {
                        article (id: "${params.id}"){
                            _id
                            title
                            description
                        }
                    }`
                }
            })
            console.log(response)
            console.log('are you there')
            store.commit('article/set', {
                id: response.data.article.id || response.data.article._id, 
                ...response.data.article
            })    
        }
    }
</script>

<style scoped>

</style>