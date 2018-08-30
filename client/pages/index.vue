<template>
  <section class="section">
    <div class="container">
      <div class="columns is-variable is-8">
        <div class="column is-two-thirds ">
          <!-- Article Header Section Starts -->
          <div class="articles">
            <div class="yuna-block yuna-bottom-border">
              <div class="level articles-filters">
                <div class="level-left">
                  <div class="level-item">
                    <i class="fas fa-circle title-icon"></i>
                    <div class="title">最新文章</div>
                  </div>
                </div>
              </div>
            </div>
        
          <!-- Article Header Section Ends -->
          
          <ul>
            <li v-for="article in articles" :key="article.id" class="article-item">
              <div class="article-image" v-bind:style="{backgroundImage: 'url(' + article.thumbnail.url +')'}" >
                
              </div>
              <div class="article-title">
                <div class="title">
                  <router-link :to="{name: 'articles-id', params: {id: article.id}}">{{article.title}}</router-link>
                </div>
                <div class="subtitle">这是个测试</div>
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div class="column">
          Auto
        </div>
      </div>

    </div>
    </div>
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
    async fetch({
      store
    }) {
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
        if (article.thumbnail)
          article.thumbnail.url = `${apiUrl}${article.thumbnail.url}`
        else {
          article.thumbnail = {}
          article.thumbnail.url = ''
        }
         
        store.commit('articles/add', {
          id: article.id || article._id,
          ...article
        })
      })
    }
  }

</script>
