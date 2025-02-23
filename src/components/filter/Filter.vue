<template>
  <ASpace>
    <!-- Province selection -->
    <label for="local">Khu vực: </label>
    <ASelect
      id="local"
      v-model:value="province"
      style="width: 120px"
      :options="provinceData.map((pro) => ({ value: pro.value, label: pro.label }))"
    >
    </ASelect>

    <!-- Second-level city selection -->
    <label for="city">Thành phố/Tỉnh: </label>
    <ASelect
      id="city"
      v-model:value="secondCity"
      style="width: 120px"
      :options="cities.map((city) => ({ value: city.value, label: city.label }))"
    >
    </ASelect>

    <!-- Third-level city (district/farm) selection -->
    <label for="farm">Trang trại: </label>
    <ASelect
      id="farm"
      v-model:value="thirdCity"
      style="width: 120px"
      :options="thirdCities.map((city) => ({ value: city, label: city }))"
    >
    </ASelect>
    <AButton class="bg-blue-500 text-white">Tìm kiếm</AButton>
  </ASpace>
</template>

<script>
const provinceData = [
  { label: 'Miền Bắc', value: 'MB' },
  { label: 'Miền Trung', value: 'MT' },
  { label: 'Miền Nam', value: 'MN' },
]

const cityData = {
  MB: [
    { label: 'Hà Nội', value: 'HaNoi' },
    { label: 'Thái Nguyên', value: 'ThaiNguyen' },
    { label: 'Vĩnh Phúc', value: 'VinhPhuc' },
  ],
  MT: [
    { label: 'Thanh Hóa', value: 'ThanhHoa' },
    { label: 'Nghệ An', value: 'NgheAn' },
    { label: 'Hà Tĩnh', value: 'HaTinh' },
  ],
  MN: [
    { label: 'TP. Hồ Chí Minh', value: 'HCM' },
    { label: 'Long An', value: 'LongAn' },
    { label: 'Cần Thơ', value: 'CanTho' },
  ],
}

const farmData = {
  HaNoi: ['Thường Tín', 'Phú Xuyên', 'Hoài Đức', 'Đan Phượng'],
  ThaiNguyen: ['Sông Công', 'Phổ Yên', 'Đại Từ'],
  VinhPhuc: ['Vĩnh Tường', 'Sông Lô'],
  ThanhHoa: ['Sầm Sơn', 'Thọ Xuân'],
  NgheAn: ['Vinh', 'Cửa Lò'],
  HaTinh: ['Hồng Lĩnh', 'Kỳ Anh'],
  HCM: ['Bình Thạnh', 'Thủ Đức', 'Gò Vấp'],
  LongAn: ['Tân An', 'Bến Lức'],
  CanTho: ['Ninh Kiều', 'Bình Thủy'],
}

import { defineComponent, reactive, toRefs, computed, watch } from 'vue'

export default defineComponent({
  setup() {
    // Default province is based on provinceData[0].value
    const province = provinceData[0].value
    const state = reactive({
      province,
      provinceData,
      cityData,
      farmData,
      secondCity: cityData[province][0].value, // Default secondCity (city value)
      thirdCity: farmData[cityData[province][0].value][0], // Set default thirdCity based on first secondCity's farm data
    })

    // Compute cities based on the selected province
    const cities = computed(() => {
      return cityData[state.province] // Directly map from cityData based on province
    })

    // Compute third-level cities based on the selected second-level city
    const thirdCities = computed(() => {
      return farmData[state.secondCity] || [] // Get the third-level (farm areas) from farmData
    })

    // Watch for changes to the selected province
    watch(
      () => state.province,
      (val) => {
        // Reset secondCity and thirdCity based on selected province
        state.secondCity = cityData[val][0].value // Default second city value
        state.thirdCity = farmData[state.secondCity][0] // Default third city value based on secondCity
      },
    )

    // Watch for changes to the secondCity
    watch(
      () => state.secondCity,
      (val) => {
        // Update thirdCity based on the selected second city
        state.thirdCity = farmData[val][0] // Set default thirdCity value for the secondCity
      },
    )

    return {
      ...toRefs(state),
      cities,
      thirdCities,
    }
  },
})
</script>
