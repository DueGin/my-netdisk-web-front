<template>
  <div
      :class="['piece', {'piece-rectangle-medium' : size === 'medium',
      'piece-rectangle-small' : size === 'small',
      'piece-rectangle-large' : size === 'large'
      }]"
      v-if="type || (type && type === 'rectangle')"
  >
    <slot/>
  </div>
  <div
      :class="['piece', {'piece-square-medium' : size === 'medium',
      'piece-square-small' : size === 'small',
      'piece-square-large' : size === 'large'
      }]"
      v-else-if="type && type === 'square'"
  >
    <slot/>
  </div>
</template>


<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large' | 'unset',
  type?: 'square' | 'rectangle',
}

// @ts-ignore
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  type:'rectangle'
})

</script>

<style scoped>
.piece {
  border-radius: 8px;
  border: 1px solid gray;
  overflow: hidden;
}

.piece-rectangle-large {
  width: 208px;
  height: 117px;
}

.piece-rectangle-medium {
  width: 208px;
  height: 130px;
  //width: 16vw;
  //height: 9vw;
}

.piece-rectangle-small {
  width: 112px;
  height: 63px;
}

.piece-square-large {
  width: 117px;
  height: 117px;
}

.piece-square-medium {
  width: 90px;
  height: 90px;
}

.piece-square-small {
  width: 63px;
  height: 63px;
}
</style>
