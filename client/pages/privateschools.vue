<template>
    <div>
        this is private school page
    </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  data() {
    return {
      query: ''
    }
  }, 
  computed: {
  
  },
  async fetch({store}) {
    // store.commit('articles/emptyList')

    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          schools {
            _id,
            name,
            type,
            tuitionranges {
                name,
            }
          }
        }
          `
      }
    })
    console.log(response)

    response.data.schools.forEach(schools=> {
        console.log(schools)
    //   if (article.thumbnail)
    //     article.thumbnail.url = `${apiUrl}${article.thumbnail.url}`
    //   store.commit('articles/add', {
    //     id: article.id || article._id, 
    //     ...article
    //   })
    })
  }
}
</script>

<style scoped>

</style>