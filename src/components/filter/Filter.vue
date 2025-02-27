<template>
  <ASpace>
    <!-- Province selection -->
    <label for="local">Khu vực: </label>
    <ASelect
      id="local"
      v-model:value="province"
      mode="multiple"
      style="min-width: 120px"
      :options="provinceData.map((pro) => ({ value: pro.value, label: pro.label }))"
    >
    </ASelect>

    <!-- Second-level city selection -->
    <label for="city">Thành phố/Tỉnh: </label>
    <ASelect
      id="city"
      v-model:value="secondCity"
      style="min-width: 120px"
      mode="multiple"
      :options="cities.map((city) => ({ value: city.value, label: city.label }))"
    >
    </ASelect>

    <!-- Third-level city (district/farm) selection -->
    <label for="farm">Trang trại: </label>
    <ASelect
      id="farm"
      v-model:value="thirdCity"
      style="min-width: 120px"
      mode="multiple"
      :options="thirdCities.map((city) => ({ value: city, label: city }))"
    >
    </ASelect>
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
    const state = reactive({
      province: [],  // Khởi tạo province là mảng để có thể chọn nhiều khu vực
      secondCity: [], // Mảng cho secondCity (các thành phố)
      thirdCity: [], // Mảng cho thirdCity (các trang trại)
      provinceData,
      cityData,
      farmData,
    })

    // Tính toán danh sách thành phố dựa trên các tỉnh đã chọn
    const cities = computed(() => {
      let selectedCities = []
      state.province.forEach((province) => {
        if (cityData[province]) {
          selectedCities = selectedCities.concat(cityData[province])
        }
      })
      return selectedCities
    })

    // Tính toán danh sách trang trại dựa trên thành phố đã chọn
    const thirdCities = computed(() => {
      let selectedFarms = []
      state.secondCity.forEach((city) => {
        if (farmData[city]) {
          selectedFarms = selectedFarms.concat(farmData[city])
        }
      })
      return selectedFarms
    })

    // Theo dõi sự thay đổi của các khu vực (province)
    watch(
      () => state.province,
      () => {
        // Đặt lại secondCity và thirdCity khi các khu vực thay đổi
        state.secondCity = []
        state.thirdCity = []
      }
    )

    // Theo dõi sự thay đổi của secondCity
    watch(
      () => state.secondCity,
      () => {
        // Đặt lại thirdCity khi secondCity thay đổi
        state.thirdCity = []
      }
    )

    return {
      ...toRefs(state),
      cities,
      thirdCities,
    }
  },
})
</script>
