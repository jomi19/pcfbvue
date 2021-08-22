<template>
<div className="inner-main" v-if="info">
        <div className="main-header">
          Aktiva projekt
        </div>
        <div className="main-content" >
          <div className="row-header"></div>
          <table className="table">
            <thead>
              <tr>
              <th>
                  Projekt
              </th>
              <th>
                  Kund

              </th>

              <th>
                  Order datum

              </th>
              <th>
                  Väggar gjorda

              </th>
              <th>
                  Kontroller
  
              </th>
              
              </tr>
            </thead>
              <tbody>
                <tr v-for="project in info" :id="project.id" :key="project.id" class="row" v-on:click="test(project.id)">
                  <td>{{project.projectName}}</td>
                  <td>{{project.costumer}}</td>
                  <td>{{formatDate(project.created)}}</td>
                  <td>{{project.molded}} / {{project.amount}}</td>
                  <td :class="getProgressColor(project.amount, project.molded)">
                    {{project.controlls}}({{getPercent(project.molded, project.controlls)}}%)</td>
                </tr>

            </tbody>
          </table>
      </div>
      </div>
      <div v-else>
                <div className="main-header">
          Kan inte hitta några aktiva projekt
        </div>
      </div>
</template>


<script>
import axios from "axios";
import { API_URL} from "@/config.json";
import myFunctions from "@/components/functions.js"

export default {
  name: 'Home',
  data () {
      return {
          info: null
      }
  },
  methods: {
      formatDate: myFunctions.formatDate,
      getProgressColor: myFunctions.getProgressColor,
      getPercent: (total, part) => {
        if(total === 0) return "-"
        return (part/total * 100).toFixed(0);
      },
      test: function(id) {
        this.$router.push(`/project/view/${id}`)
      }
  },
  mounted () {
    
      axios
        .get(`${API_URL}project/all`)
        .then(response => (this.info = response.data.data))
  }
 
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/table.scss"

</style>
