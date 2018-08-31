<template>
 <section class="section">
    <div class="container">
      <div class="columns is-variable is-8">
        <div class="column is-two-thirds ">
          <!-- school Header Section Starts -->
          <div class="schools">
            <div class="yuna-block yuna-bottom-border">
              <div class="level schools-filters">
                <div class="level-left">
                  <div class="level-item">
                    <i class="fas fa-circle title-icon"></i>
                    <div class="title">所有私校</div>
                  </div>
                </div>
              </div>
            </div>
        
          <!-- school Header Section Ends -->
          
          <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <li v-for="(school, index) in schools" :key="index" class="school-item">
              <div class="school-image" v-bind:style="{backgroundImage: 'url(' + school.thumbnail.url +')'}" >
                
              </div>
              <div class="school-title">
                <div class="title">
                  <nuxt-link :to="{name: 'school', params: {id: school.id}}">{{school.name}}</nuxt-link>
                </div>
                <div class="subtitle"></div>
                <div class="description">
                  <ul>
                    <li>
                      学费: {{school.tuition}}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div class="column">
            <div class="container">
              <div class="title">私校Top10</div>
            </div>
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
      query: '',
      busy: false, 
      start: 0, 
      limit: 20
    }
  }, 
  methods: {
    loadMore: function() {
      this.busy = true

      setTimeout(() => {
        this._loadMore()
        this.busy = false
      }, 1000)
    }, 

    _loadMore: function() {
      this.start += 20
      let response = null
      strapi.request('post', '/graphql', {
      
      data: {
        query: `query {
          schools (limit: ${this.limit}, start: ${this.start}) {
            _id,
            name,
            type,
            tuition,
            website, 
            language, 
            grade,
            tuitionranges {
                name,
            }
          }
        }  `
      }
    }).then((res)=> {
      response = res
      response.data.schools.forEach(school=> {
      if (school.thumbnail)
        school.thumbnail.url = `${apiUrl}${school.thumbnail.url}`
      else {
        school.thumbnail = {}
        school.thumbnail.url = ''
      }
        
      this.$store.commit('schools/add', {
        id: school.id || school._id,
        ...school
      })
    })
    })
  }
},

  computed: {
       filteredList() {
        return this.schools.filter(school => {
          return school.title.toLowerCase().includes(this.query.toLowerCase())
        })
      },
      schools() {
        return this.$store.getters['schools/list']
      }
  },
  async fetch({store}) {
    // store.commit('schools/emptyList')

    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          schools (limit: 20) {
            _id,
            name,
            type,
            tuition,
            website, 
            language, 
            grade,
            tuitionranges {
                name,
            }
          }
        }
          `
      }
    })

    response.data.schools.forEach(school=> {
      if (school.thumbnail)
        school.thumbnail.url = `${apiUrl}${school.thumbnail.url}`
      else {
        school.thumbnail = {}
        school.thumbnail.url = ''
      }
        
      store.commit('schools/add', {
        id: school.id || school._id,
        ...school
      })
    })
  }
}
</script>

<style scoped>

</style>