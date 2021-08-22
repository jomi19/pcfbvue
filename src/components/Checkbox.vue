<template>
    <td class="shiped">
        <div v-if="wall.shipped" :content="formatDate(wall.shipped)" v-tippy>
            <CheckOutline  class="green progress-icon" />
        </div>
        <CheckboxBlankOutline v-else-if="!wall.molded" class="red progress-icon"/>
        <CheckboxMarked v-else-if="shipping[wall.id]" class="yellow progress-icon pointer" v-on:click="clickHandlerShipping(wall.id, true)"/>
        <CheckboxBlankOutline v-else class="yellow progress-icon pointer" v-on:click="clickHandlerShipping(wall.id)"/>
</template>

<script>
import {API_URL} from "@/config.json";
import axios from "axios";


export default {
  name: 'Checkbox',
  props:[
      wall
  ],
  methods: {
      formatDate: (date) => {
          let dateArray = date.split("T")
          return dateArray[0];
      }
  }
 
}
</script>