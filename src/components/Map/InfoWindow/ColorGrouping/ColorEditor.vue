<template>
  <v-card>
    <v-form>
      <v-card-title>{{editId ? 'Edit' : 'New'}} Color</v-card-title>
      <v-card-text>
        <v-color-picker
          mode="hexa"
          canvas-height="300"
          hide-mode-switch
          hide-inputs
          v-model="internalColor"
        />
        <v-text-field
          v-model="internalName"
          label="Label"
        />
      </v-card-text>
      <v-card-actions class="align-right">
        <v-btn
          type="submit"
          color="primary"
          text
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { addDoc, collection, doc, setDoc } from '@firebase/firestore'
import { useAuthStore } from '@/store/authStore'
import { mapState } from 'pinia'

export default {
  name: 'ColorEditor',
  props: {
    editId: {
      type: String,
      required: false
    },
    value: {
      validator(v) {
        return (
          typeof v?.color === 'string' &&
          typeof v?.name === 'string'
        )
      },
      default: () => ({
        color: '#00000000',
        name: ''
      })
    }
  },
  computed: {
    ...mapState(useAuthStore, ['uid'])
  },
  data () {
    return {
      internalColor: this.value.color,
      internalName: ''
    }
  },
  methods: {
    handleSubmit() {
      try {
        const colRef = collection(this.$firebase.db, `userData/${this.uid}/categories`)
        const docValues = { color: this.$data.internalColor, name: this.$data.internalName }
        if (this.editId) {
          setDoc(doc(colRef, this.editId), docValues)
        } else {
          addDoc(colRef, docValues)
        }
      } catch(e) {
        console.error('[color-editor] Failed to save data', e)
      }
      this.$emit('submit')
    }
  }
}
</script>
