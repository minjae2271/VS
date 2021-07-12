<template>
  <div>
      {{hi}}
  </div>
</template>

<script>
export default {
    asyncData({params}){
        return {
            // postTypeId: params.postType,
            // subjectId: params.subject,
            categoryId: params.category
        }
    },
}
</script>
<style>

</style>