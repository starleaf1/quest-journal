<template>
  <v-card>
    <v-card-title>Manage Tags</v-card-title>
    <v-card-text>
      <v-data-table
        dense
        show-select
        :headers="headers"
        :items="tags"
        v-model="checkedIds"
        mobile-breakpoint="300"
        :items-per-page="itemsPerPage"
        :page="page"
        hide-default-footer
        :search="search"
      >
        <template #footer>
          <v-pagination
            v-if="pageCount >= 2"
            v-model="page"
            :length="pageCount"
            :total-visible="isOnPC ? 10 : 5"
          />
        </template>
        <template #top>
          <v-toolbar flat>
            <v-text-field
              label="Search"
              prepend-inner-icon="mdi-magnify"
              v-model="search"
            />
            <v-spacer />
            <v-btn
              text
              color="danger"
              :loading="isLoading"
              :disabled="!checkedIds.length"
              @click="handleDeleteClicked"
            >
              Delete <fragment v-if="checkedIds?.length" selected>{{ checkedIds?.length }} item{{checkedIds.length === 1 ? '' : 's'}}</fragment>
            </v-btn>
            <v-menu v-model="addNewMenuOpen" :close-on-content-click="false">
              <NewTag @submit="handleNewTagSubmitted" @cancel="handleNewTagSubmitted" />
              <template #activator="{ on }">
                <v-btn
                  color="accent"
                  v-on="on"
                  :disabled="isLoading"
                >
                  <span>Add new</span>
                  <v-icon small right>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-menu>
          </v-toolbar>
        </template>
        <template #[`item.name`]="props">
          {{props.item.name}}
          <v-menu :close-on-content-click="false">
            <NewTag :editId="props.item.id" :name="props.item.name" />
            <template #activator="{ on }">
              <v-btn
                icon
                small
                v-on="on"
                :disabled="isLoading"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="isLoading" @click="handleCloseClicked">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useAuthStore } from '@/store/authStore'
import { useTagsStore } from '@/store/tagsStore'
import { mapActions, mapState } from 'pinia'
import NewTag from './NewTag.vue'

export default {
  components: { NewTag },
  name: 'TagManager',
  computed: {
    ...mapState(useAuthStore, ['uid']),
    ...mapState(useTagsStore, ['tags']),
    pageCount() { return Math.ceil(this.tags?.length / 6) }
  },
  data () {
    return {
      isLoading: false,
      addNewMenuOpen: false,
      checkedIds: [],
      headers: [
        {
          text: 'Name',
          sortable: true,
          value: 'name'
        }
      ],
      page: 1,
      itemsPerPage: 6,
      search: ''
    }
  },
  methods: {
    ...mapActions(useTagsStore, ['remove']),
    handleNewTagSubmitted () {
      this.$data.addNewMenuOpen = false
    },
    handleCloseClicked () {
      this.$emit('close')
    },
    async handleDeleteClicked () {
      try {
        this.$data.isLoading = true
        await Promise.all(this.checkedIds.map(tag => this.remove(tag.id)))
        this.$data.checkedIds = []
      } catch (e) {
        console.error(e)
      } finally {
        this.$data.isLoading = false
      }
    }
  }
}
</script>