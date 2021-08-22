<template>
    <div class="main-header">Efterkontroll ({{wall?.wallName}})</div>
    <div class="main-content" v-if="wall">
        <div class="first-half halfrow">
            <p><span class="fat">Prokjet: </span>{{wall.projectName}} </p>
            <p><span class="fat">Beställare: </span>{{wall.costumer}}</p>
            <p><span class="fat">Elementnamn: </span>{{wall.wallName}}</p>
        </div>
        <div class="second-half halfrow">
            <p><span class="fat">Kontroll Datum: </span>{{formatDate(wall.followUp)}}</p>
            <p><span class="fat">Gjut Datum: </span>{{formatDate(wall.molded)}}</p>
        </div>
        <table class="table" v-if="wall">
            
            <thead>
                <h2>Mått</h2>
                <tr><th>Kontroll av</th><th>Ritningsns mått</th><th>Väggens mått</th><th>Differans</th></tr>
            </thead>
            
            <tbody>
                <tr class="row">
                    <td>Längd:</td>
                    <td>{{wall.wallLength}}</td>
                    <td>{{wall.length}}</td>
                    <td>{{wall.wallLength - wall.length}}</td>
                </tr>
                <tr class="row">
                    <td>Bredd:</td><td>{{wall.wallWidth}}</td>
                    <td>{{wall.width}}</td>
                    <td>{{wall.wallWidth - wall.width}}</td>
                </tr>
                <tr class="row">
                    <td>Höjd:</td>
                    <td>{{wall.wallHeight}}</td>
                    <td>{{wall.height}}</td>
                    <td>{{wall.wallHeight - wall.height}}</td>
                </tr>
                <tr class="row">
                    <td>Kryssmätning:</td>
                    <td></td>
                    <td></td>
                    <td>{{wall.crossMesure}} </td>
                </tr>
                           </tbody>
        </table>
        <table class="table" v-if="wall">
            <thead>
                <th>Kontroll</th><th>Resultat</th>
            </thead>
            <tbody>

                <tr class="row" v-if="ursparningar">
                    <td>Ursparingar:</td>
                    <td>{{wall.ursparningar}}</td>
                </tr>
                <tr class="row">
                    <td>Lyft:</td>
                    <td>{{wall.lifts}}</td>
                </tr>
                <tr class="row" v-if="wall.castings">
                    <td>Ingjutningsgods:</td>
                    <td>{{wall.castings}}</td>
                </tr>
                <tr class="row">
                    <td>Ytstruktur:</td>
                    <td>{{wall.surface}}</td>
                </tr>
                <tr class="row" v-if="wall.comments">
                    <td>Komentar:</td>
                    <td>{{wall.comments}}</td>
                </tr>
            </tbody>
        </table>
        <div v-else>Kontrollen hittades inte</div>
    </div>
</template>

<script>
// @ is an alias to /src
    import axios from "axios";
    import {API_URL} from "@/config.json"
    import myFunctions from "@/components/functions.js"

    export default {
        name: 'New project',
        components: {

        },
        methods: {
            submitHandler: function() {
            
                
            },
            formatDate: myFunctions.formatDate
        },
        data() {
            return {
                wall: null,
                test: {}
            }
        },
        beforeMount () {
            axios.get(`${API_URL}followup`, {
                params: {
                    id: this.$route.params.id
                }
            }).then(respons => {
                this.wall = respons.data.data
                console.log(respons.data.data)
            })
        }
    }
</script>

<style lang="scss" scoped>
  @import "@/style/table.scss";
  @import "@/style/grid.scss";
    .overview {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;

    }
    .halfrow {
        text-align: center;
        margin-bottom: 2em;
    }
    .fat {
        font-weight: bold;
    }
</style>
