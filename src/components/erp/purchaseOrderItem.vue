<template>
    <div style="background:#fafafa;padding:5px;margin-bottom:5px;border-left-style:solid;border-left-weight:2px;border-left-color:#ffa940">
        <a-avatar icon="user"/>
        <a-divider type="vertical" />
        <span>零件A</span>
        <a-divider type="vertical" />
        <a-input-number :min="1" :max="10" value="0"/>
        <a-divider type="vertical" />
        <a-button shape="circle" icon="delete"  style="float:right"/>
  </div>
</template>
<script>
export default {
    name: "purchaseOrderItem"
}
</script>

