<template>
  <section class="container">
    <section class="section">
      <div class="container">
        <ul>
          <li v-for="article in articles" :key="article.id">
            {{article.title}}
          </li>
        </ul>
      </div>
    </section>
  </section>
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
    filteredList() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.query.toLowerCase())
      })
    }, 
    articles() {
      return this.$store.getters['articles/list']
    }
  },
  async fetch({store}) {
    store.commit('articles/emptyList')

    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          articles {
            _id
            title
            description
            thumbnail {
              url
            }
          }
        }
          `
      }
    })

    response.data.articles.forEach(article => {
      article.thumbnail.url = `${apiUrl}${article.thumbnail.url}`
      store.commit('articles/add', {
        id: article.id || article._id, 
        ...article
      })
    })
  }
}


</script>


