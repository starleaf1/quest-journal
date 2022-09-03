<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :icon="!isOnPC || $attrs.icon"
  >
    <v-icon :left="isOnPC"><slot name="icon-left"></slot></v-icon>
    <span><slot /></span>
    <v-icon :right="isOnPC"><slot name="icon-right"></slot></v-icon>
  </v-btn>
</template>
