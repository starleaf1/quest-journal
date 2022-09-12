<template>
  <v-card>
    <v-card-title>Manage Tags</v-card-title>
    <v-card-text>
      <v-list dense>
        <TagItem
          v-for="tag in tags"
          :key="tag.id"
          :tag-id="tag.id"
          :name="tag.name"
        />
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn text>Add new</v-btn>
      <v-btn text :disabled="!checkedIds.length">Delete <span v-if="checkedIds?.length" selected>{{ checkedIds?.length }} items</span></v-btn>
      <v-spacer />
      <v-btn color="primary" @click="handleCloseClicked">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { collection, query, getDocs } from '@firebase/firestore'
import { useAuthStore } from '@/store/authStore'
import { useTagsStore } from '@/store/tagsStore'
import { mapState } from 'pinia'
import TagItem from './TagItem.vue'

export default {
  components: { TagItem },
  name: 'TagManager',
  computed: {
    ...mapState(useAuthStore, ['uid']),
    ...mapState(useTagsStore, ['tags'])
  },
  data () {
    return {
      checkedIds: []
    }
  },
  methods: {
    handleCloseClicked () {
      this.$emit('close')
    },
    async fetchTags () {
      try {
        const tagsQuery = query(collection(this.$firebase.db, `userData/${this.uid}`))
        const querySnapshot = await getDocs(tagsQuery)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (e) {
        console.warn('[fetch-tags] Failed to fetch tags', e)
      }
    }
  }
}
</script>