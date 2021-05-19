<template>
  <div>
      <p>subID: {{subjectId}}</p> 
      <p>cateId : {{categoryId}}</p>
  </div>
</template>

<script>
export default {
    asyncData({params}){
        return {
            subjectId: params.subject,
            categoryId: params.category
        }
    }
}
</script>

<style>

</style>