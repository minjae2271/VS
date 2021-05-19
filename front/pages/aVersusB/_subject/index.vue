<template>
  <div>
      {{subjectId}}
  </div>
</template>

<script>
export default {
  asyncData({params}){
    return {
      subjectId: params.subject
    }
  }
}
</script>

<style>

</style>