<template>
    <div class="main-header">Efterkontroll ({{wall?.wallName}})</div>
    <form class="main-content" v-on:submit="submitHandler">
        <label for="length" class="first-quater">Längd</label>
        <input type="number" id="length" class="last-three" v-model="followUp.length" :placeholder="wall?.length" required>

        <label for="width" class="first-quater">Bredd</label>
        <input type="number" id="width" class="last-three" v-model="followUp.width" :placeholder="wall?.width" required>

        <label for="height" class="first-quater">Höjd</label>
        <input type="number" id="height" class="last-three" v-model="followUp.height" :placeholder="wall?.height" required>
        
        <label for="crossMessure" class="first-quater">Kryssmätning</label>
        <input type="number" id="crossMessure" class="last-three" v-model="followUp.crossMesure"  required>
        
        <label for="ursparningar" class="first-quater">Ursparningar</label>
        <input type="text" id="ursparningar" class="last-three" v-model="followUp.ursparningar">

        <label for="crossMessure" class="first-quater">Lyft:</label>
        <select name="lifts" id="lifts" class="last-three" v-model="followUp.lifts" required>
            <option value=""></option>
            <option value="Ok">Ok</option>
            <option value="Hänger snett">Hänger snett</option>
            <option value="Saknas">Saknas</option>
            <option value="Skadad">Skadad</option>
        </select>

        <label for="castings" class="first-quater">Ingjutningsgods:	</label>
        <input type="text" id="castings" class="last-three" v-model="followUp.castings">

        <label for="surface" class="first-quater">Ytstruktur</label>
        <select name="surface" id="surface" class="last-three"  v-model="followUp.surface" required>
            <option value=""></option>
            <option value="Ok">Ok</option>
            <option value="Mindre bubblor">Mindre bubblor</option>
            <option value="Bubblor">Bubblor</option>
        </select>

        <label for="comments" class="first-quater">Komentar</label>
        <textarea v-model="followUp.comments" class="last-three"></textarea>

    <button type="submit">Skicka</button>
    </form>
</template>

<script>
// @ is an alias to /src
    import axios from "axios";
    import {API_URL} from "@/config.json"
    export default {
    
    name: 'New followup',
    components: {

    },
    methods: {
        submitHandler: function(event) {
            event.preventDefault()
            console.log(this.followUp)
            axios.put(`${API_URL}followup/`, {
                height: this.followUp.height,
                width: this.followUp.width,
                length: this.followUp.length,
                castings: this.followUp.castings,
                comments: this.followUp.comments,
                lifts: this.followUp.lifts,
                crossMessure: this.followUp.crossMesure,
                surface: this.followUp.surface,
                ursparningar: this.followUp.ursparningar,
                id: this.followUp.followUpId
            })
                .then(() => {
                    console.log("test")
                    
                })
                .catch((err) => {
                    console.log(err)
                })
            this.$router.push(`/followup/view/${this.followUp.id}`)
        },

    },
    data() {
        return {
            wall: null,
            followUp: {id: this.$route.params.id},
        }
    },
    beforeMount () {
        axios.get(`${API_URL}followup`, {
            params: {
                id: this.$route.params.id
            }
        }).then(respons => {
            this.followUp = respons.data.data
            console.log(this.followUp)
        })
    },

    }
</script>

<style lang="scss" scoped>
@import "@/style/grid.scss";
    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
        padding: 5px;
    }
    label {
        padding: 12px 12px 12px 0;
        display: inline-block;
        font-weight: bold;
    }
    textarea {
        height: 100px;
        resize: none;
        padding: 5px;
    }
</style>