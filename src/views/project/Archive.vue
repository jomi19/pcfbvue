<template>
<div className="inner-main">
        <div className="main-header">
          Aktiva projekt
        </div>
        <div className="main-content">
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
              <tbody v-if="info">
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
</template>



<script>
import {API_URL} from "@/config.json";
import axios from "axios";


export default {
  name: 'View project',
  data () {
      return {
          info: null
      }
  },
  methods: {
      formatDate: (date) => {
          let dateArray = date.split("T")
          return dateArray[0];
      },
      getProgressColor: (total, done) => {
          if (total / done >= 0.1) return "green";
          return "red";
      },
      getPercent: (total, part) => {
        if(total === 0) return "-"
        return (part/total * 100).toFixed(0);
      },
      test: function(id) {
        this.$router.push(`/project/view/${id}`)
      }
  },
  beforeMount () {
      axios
        .get(`${API_URL}project/archive`)
        .then(respons => (this.info = respons.data.data))

  }
 
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
  .table {
    width: 100%;
}

table, th, td {
    border-bottom: 1px solid $grey;
    border-collapse: collapse;
}

th, td {
    padding: 15px;
    text-align: left;
}

.green {
  color: green !important;
}

.red {
  color: red !important;
}
.row {
  width: 100%;
  justify-content: space-between;
  line-height: 2.5;

  &:hover {
    background-color: $grey;
  }
}

.row-header {
  width: 100%;

  justify-content: space-between;
  line-height: 2.5;
  font-weight: bold;

}

.box {
 border-bottom: 1px solid $grey;
 width: 100%;


}

</style>