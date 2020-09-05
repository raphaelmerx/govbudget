<template>
    <div class="sidebar-item">
      <div class="dot-content">
        <div class="main-dot"></div>
        <transition name="fade">
          <div v-if="this.hasNext" class="dot-trail"><div class="small-dot"></div><div class="small-dot"></div><div class="small-dot"></div><div class="small-dot"></div><div class="small-dot"></div><div class="small-dot"></div></div>
        </transition>
      </div>
      <div class="item-content">
        <div class="label">
            {{ this.label }}
        </div>
        <div class="value">
            {{ this.value }}
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "SidebarItem",
  props: ["label", "value", "hasNext"],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: flex-start;
  padding: 0.5rem 2rem;
}

.sidebar-item .dot-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidebar-item .item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  text-align: left;
}

.sidebar-item .label {
  color: #9bdaf1;
  font-size: 1rem;
  text-transform: uppercase;
  font-size: 14px;
  text-align: left;
}

.sidebar-item .value {
  font-weight: bold;
}

</style>
