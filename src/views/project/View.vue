<template>

    <div class="main-header">
        {{project?.projectName}}({{project?.costumer}})

    </div>
    <div class="main-content" v-if="project">
        <div class="last-quater">

           
        </div>
        
        <button class="button last-quater outlined green" v-if="project.deleted" v-on:click="returnProject" id="archive">Återställ</button> 
        
            <button class="button last-quater" v-else v-on:click="moveProject" >Arkivera</button>
        <div class="first-half center-content moldedprogress"  :content="project?.molded" v-tippy> 
            <p>Gjutna väggar</p>
        <RadialProgressBar :diameter="130"
                       :completed-steps="project?.molded"
                       :total-steps="project?.amount"
                       strokeWidth="12"
                       startColor="#4e72dd"
                       stopColor="#4e72dd"
                       id="moldprogress"                   >
            <h2>{{ ((project?.molded/project?.amount) * 100).toFixed(1) }}%</h2>
        </RadialProgressBar>
        </div>
        <div class="second-half center-content followupprogress" :content="project?.followUp" v-tippy>
                    <p>Efterkontroller</p>
        <RadialProgressBar :diameter="130" 
                       :completed-steps="project?.followUp"
                       :total-steps="project?.molded"
                       strokeWidth="12"
                       startColor="#4e72dd"
                       id="check"                   >
            <h2 :class="getProgressColor(project?.molded, project?.followUp)">{{ getPercent(project?.molded, project.followUp) }}%</h2>
        </RadialProgressBar>
        </div>
        <table class="table" v-if="walls">
            <thead>
                <tr>
                    <th className="id">Vägg namn</th>
                    <th className="molded">Gjuten</th>
                    <th className="followUp">Efter Kontroll</th>
                    <th className="status">Skickad</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="wall in walls" :id="wall.id" :key="wall.id">
                    <td :content="getMessurements(wall)" v-tippy>
                        {{wall.wallName}}
                    </td>
                    <td class="molded" :content="formatDate(wall.molded)" v-tippy>
                        <div v-if="wall.molded" >
                            <CheckOutline  class="green progress-icon" />
                        </div>
                        <CheckboxMarked v-else-if="mold[wall.id]" class="yellow progress-icon pointer" v-on:click="clickHandler(wall.id, 'mold', true)"/>
                        <CheckboxBlankOutline v-else class="yellow progress-icon pointer" v-on:click="clickHandler(wall.id, 'mold')"/>
                       
                    </td>
                    <td class="followUp" :content="formatDate(wall.followUp)" v-tippy>
                        <div v-if="wall.followUp" >
                            <CheckOutline class="green progress-icon pointer" v-on:click="navigate(wall.id, true)"/>
                        </div>
                        <CheckboxBlankOutline v-else-if="wall.molded" class="yellow progress-icon pointer" v-on:click="navigate(wall.id)"/>
                        <CheckboxBlankOutline v-else class="red progress-icon"/>
                    </td>
                    <td class="shiped" :content="formatDate(wall.shipped)" v-tippy>
                        <div v-if="wall.shipped" >
                            <CheckOutline  class="green progress-icon" />
                        </div>
                        <CheckboxBlankOutline v-else-if="!wall.molded" class="red progress-icon"/>
                        <CheckboxMarked v-else-if="ship[wall.id]" class="yellow progress-icon pointer" v-on:click="clickHandler(wall.id, 'ship', true)"/>
                        <CheckboxBlankOutline v-else class="yellow progress-icon pointer" v-on:click="clickHandler(wall.id, 'ship')"/>
                    </td>
                </tr> 
            </tbody>
        </table>
        <div class="mold" v-if="Object.keys(this.mold).length > 0">
            <p>Väggar att Gjuta {{Object.keys(this.mold).length }}</p>
            <input type="date" class="date" v-model="this.date">
            <button class="button outlined first-half wide" id="molding" v-on:click="send('mold')" >Gjut</button>
        </div>
        
        <div class="last-quater">
                    
        <button class="button " id="shipping" v-on:click="send('ship')" v-if="Object.keys(this.ship).length > 0"><span>Skicka</span></button>
        </div>

    </div>

</template>


<script>
import {API_URL} from "@/config.json";
import axios from "axios";
import RadialProgressBar from 'vue-radial-progress'
import {CheckOutline, CheckboxBlankOutline, CheckboxMarked} from "mdue";
import myFunctions from "@/components/functions.js";


export default {
  name: 'View project',
  components: {
      RadialProgressBar,
      CheckOutline,
      CheckboxBlankOutline,
      CheckboxMarked,
  },
  data () {
      return {
          date: new Date().toISOString().substring(0, 10),
          ship: {},
          mold: {},
          project: null,
          walls: null,
            completedSteps: 5,
            totalSteps: 10
      }
  },
  methods: {
      formatDate: myFunctions.formatDate,
      clickHandler: function(id,type, remove = false) {
        if(!remove) {
            this[type][id] = true;
        } else {
            
            delete this[type][id]
        }
      },
      send: function(type) {
        const objects = this[type]
        let send = []
         
        if(Object.keys(objects).length > 0) {
            for(const obj in objects) {
                send.push(obj)
            }
            axios.put(`${API_URL}wall/${type}`, {
                walls: send,
                date: this.date
            }).then(() => {
              this.getProject();
              this.date = new Date().toISOString().substring(0, 10)
              this.ship = {};
              this.mold = {};
              window.scrollTo(0,0)
            })
        }
      },
      getProgressColor: myFunctions.getProgressColor,
      getPercent: myFunctions.getPercent,
      getProject: function() {
                  axios
        .get(`${API_URL}project/`, {
            params: {
                id: this.$route.params.id
            }
        })
        .then(respons => {
            this.project = respons.data.data[0];
            this.walls = respons.data.walls;
            console.log(this.project)
            })
      },
      getMessurements: function(wall) {

          return `${wall.length}x${wall.width}x${wall.height}`
          
      },
      navigate: function(id, exists = false) {
          
          if(exists) {
              this.$router.push(`/followup/view/${id}`) 
              return
            }
          this.$router.push(`/followup/new/${id}`)
      },
      moveProject: function() {
          axios.delete(`${API_URL}project`, {
                params: {
                id: this.$route.params.id
                }
          })
          .then(() => {
              this.$router.push(`/`)
          })
          .catch((err) => {
              console.log(err)
          })
      },
      returnProject: function() {
          axios.post(`${API_URL}project/unarchive`, {
              id: this.$route.params.id
          }).then((test) => {
              console.log(test)
              this.$router.push(`/`)
          })
          .catch((err) => {
              console.log(err)
          })
      }
  },
  mounted () {
      this.getProject();
  }
 
}
</script>

<style lang="scss" scoped>
    @import "@/style/table.scss";
    @import "@/style/grid.scss";

    .progress-icon {
        font-size: 1.7em;
        align-self: center;
    }

    .wide {
        width: 70%;
    }

    .center-content {
        text-align: center;
        margin-bottom: 2em;
    }

    .radial-progress-container {
        display: inline-block;
    }

    .yellow {
        color: $yellow3;
    }

    .pointer {
        cursor: pointer;
    }

    .small {
        font-size: 0.5em;
        position: static;
    }

    .mold {
       position: fixed;
       bottom: 50px;
       right: 50px;
       text-align: center;
       box-shadow: -5px 5px 5px rgb(90, 89, 89);
       background-color: $mainBackgrond;
       border-radius: 50px;
       

       & p {
           font-size: 1.5em;
       }
    }

    @media only screen and (max-width: 1350px)  {
        .mold {
            position: relative;
            box-shadow: none;
            bottom: 0;
            right: 0;
        }
    }

    
    
</style>