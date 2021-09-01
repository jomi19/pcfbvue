<template>
    <div class="main-header">Nytt projekt </div>
        
        <form class="main-content" v-on:submit="submitHandler" >
            <label for="costumer" class="first-quater">Kund</label>
            <input type="text" name="costumer" id="costumer" class="last-three" v-model="project.costumer">

            <label for="project" class="first-quater">Projekt namn</label>
            <input type="text" name="project" id="project" class="last-three" v-model="project.project">
        </form>
        <form class="main-content" v-on:submit="submitWall" >
            <h2 class="wide">Väggar</h2>
            <label for="wallname" class="first-quater">Vägg namn</label>
            <input type="text" name="wallname" id="wallname" class="last-three" v-model="wall.wallName" required>

            <label for="length" class="first-quater">Längd</label>
            <input type="number" name="length" id="length" class="last-three" v-model="wall.length" required>

            <label for="width" class="first-quater">Bredd</label>
            <input type="number" name="width" id="width" class="last-three" v-model="wall.width" required>

            <label for="height" class="first-quater">Höjd</label>
            <input type="number" name="height" id="height" class="last-three" v-model="wall.height" required>

            <label for="height" class="first-quater">Ingjutningsgods</label>
            <input type="text" name="height" id="height" class="last-three" v-model="wall.castings">

            <label for="other" class="first-quater">Övrigt</label>
            <textarea name="other" id="other" class="last-three" v-model="wall.other" > </textarea>

            <label for="amount" class="first-quater">Antal</label>
            <input type="number" name="amount" id="amount" class="last-three" v-model="wall.amount" required>
            <button type="submit">Lägg till vägg</button>
    </form>
    <table class="table" v-if="walls.length > 0">
        <thead><th>Väggnamn</th><th>Längd</th><th>Bredd</th><th>Höjd</th><th>Antal</th>
        <th>Övrigt</th><th>Tabort</th></thead>
            <tr class="row " v-for="wall in walls" :key="wall.wallName" >
            <td>{{wall.wallName}}</td>
            <td>{{wall.length}}</td>
            <td>{{wall.width}}</td>
            <td>{{wall.height}}</td>
            <td>{{wall.amount}}</td>
            <td><InformationOutline :content="`Ingutningsgods: ${wall.castings}
                                                Övring: ${wall.other}`" v-tippy/></td>
            <th><TrashCanOutline class="red pointer" v-on:click="removeWall(wall.wallName)"/></th>
            
        </tr>
        <button v-on:click="submitHandler" v-if="project.costumer && project.project">Lägg till projekt</button>
        <span v-else>Kund Namn eller projekt namn</span>
    </table>


</template>

<script>
// @ is an alias to /src
    import axios from "axios";
    import {API_URL} from "@/config.json"
    import {InformationOutline, TrashCanOutline} from "mdue";
    export default {
  
        name: 'New project',
            
        components: {
            InformationOutline,
            TrashCanOutline
        },
        methods: {
            submitHandler: function(event) {
                event.preventDefault()
                console.log(this.followUp)
                axios.post(`${API_URL}project/`, {
                    costumer: this.project.costumer,
                    project: this.project.project,
                    walls: this.walls
                })
                    .then(() => {
                        this.$router.push(`/project`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            submitWall: function(event) {
                event.preventDefault();
                this.walls.push(this.wall)
                this.wall = {wallName: null, height: null, width: null, length: null, castings: null, other: null, amount: null}
            },
            removeWall: function(wallName) {
                console.log(this.walls)
                for(let x = 0; x < this.walls.length; x ++) {
                    console.log(this.wall[x])
                    if(this.walls[x].wallName === wallName) {
                        this.walls.splice(x, 1)
                        break
                    }
                }

            } 
        },
        data() {
            return {
                project: {},
                wall: {},
                walls: []
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/style/grid.scss";
@import "@/style/table.scss";
    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
        padding: 5px;
    }
    .table {
        width: 100%;
    }
    .pointer{
        cursor: pointer;
    }
    label {

        display: inline-block;
        font-weight: bold;
    }
    textarea {
        height: 75px;
        resize: none;
        padding: 5px;
    }
</style>