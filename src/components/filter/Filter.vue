<template>
  <ASpace class="flex flex-col items-end gap-4 w-full">
    <!-- Province selection -->
    <div class="mb-[12px]">
      <label for="local" >Khu vực: </label>
      <ASelect
        id="local"
        class="mr-[8px]"
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
        class="mr-[8px]"
        v-model:value="secondCity"
        style="min-width: 120px"
        mode="multiple"
        :options="cities.map((city) => ({ value: city.value, label: city.label }))"
        :disabled="isButtonDisabled"
      >
      </ASelect>

      <!-- Third-level city (district/farm) selection -->
      <label for="farm">Trang trại: </label>
      <ASelect
        id="farm"
        class="mr-[8px]"
        v-model:value="thirdCity"
        style="min-width: 120px"
        mode="multiple"
        :options="thirdCities.map((city) => ({ value: city.value, label: city.label }))"
        :disabled="isButtonDisabledFarm"
      >
      </ASelect>
      <AButton
        class="bg-blue-500 text-white"
        @click="filter(province, secondCity, thirdCity)"
        :disabled="isButtonDisabled"
      >
      <SearchOutlined />
      </AButton>
    </div>
    <div>
      <a-space>
        <label for="date-picker">Thời gian:</label>
        <a-range-picker v-model:value="date"></a-range-picker>
        <!-- Disable button when no dates are selected -->
      </a-space>
    </div>
  </ASpace>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { useGlobalStore } from '../../stores/global-store'
import { useDatePickerStore } from '../../stores/datePicker'
import { SearchOutlined } from '@ant-design/icons-vue'

const store = useGlobalStore()
const storeDatePicker = useDatePickerStore()

// Dữ liệu cho khu vực, thành phố và trang trại
const provinceData = [
  { label: 'Miền Bắc', value: 'MB' },
  { label: 'Miền Trung', value: 'MT' },
  { label: 'Miền Nam', value: 'MN' },
]

const cityData = {
  MB: [
    { label: 'Hà Nội', value: 'HaNoi' },
    { label: 'Thái Nguyên', value: 'ThaiNguyen' },
    { label: 'Thái Bình', value: 'ThaiBinh' },
  ],
  MT: [
    { label: 'Thanh Hóa', value: 'ThanhHoa' },
    { label: 'Nghệ An', value: 'NgheAn' },
    { label: 'Quảng Nam', value: 'QuangNam' },
  ],
  MN: [
    { label: 'Bình Dương', value: 'BinhDuong' },
    { label: 'Cần Thơ', value: 'CanTho' },
  ],
}

const farmData = {
  HaNoi: [{ label: 'Thạch Thất', value: 2 }],
  ThaiNguyen: [{ label: 'Phổ Yên', value: 1 }],
  ThaiBinh: [{ label: 'Thái Bình', value: 3 }],
  ThanhHoa: [{ label: 'Thanh Hóa', value: 4 }],
  NgheAn: [
    { label: 'Cửa Lò', value: 5 },
    { label: 'Cửa Hội', value: 6 },
  ],
  QuangNam: [
    { label: 'Quế Sơn', value: 7 },
    { label: 'Điện Bàn', value: 8 },
  ],
  BinhDuong: [
    { label: 'Thuận An', value: 9 },
    { label: 'Dĩ An', value: 10 },
  ],
  CanTho: [
    { label: 'Vĩnh Thạnh', value: 11 },
    { label: 'Phong Điền', value: 12 },
  ],
}

// Các ref để lưu trữ giá trị của province, city và farm
const province = ref([])
const secondCity = ref([])
const thirdCity = ref([])

const date = ref([null, null]) // Lưu trữ mảng ngày chọn (Ngày đầu và ngày cuối)
const startDate = ref(null) // Ngày đầu tiên
const endDate = ref(null) // Ngày cuối cùng

watch(date, (newDate) => {
  if (newDate && newDate.length === 2) {
    startDate.value = newDate[0] // Ngày đầu tiên
    endDate.value = newDate[1] // Ngày cuối cùng

    // Cập nhật store nếu cần
    storeDatePicker.setStartDate(formattedStartDate)
    storeDatePicker.setEndDate(formattedEndDate)
  }
})

const formatDate = (date) => {
  if (!date) return '' // Nếu date là null, trả về chuỗi rỗng

  return dayjs(date).format('MM/DD/YYYY') // Định dạng ngày theo dd/mm/yyyy
}

// Computed properties để hiển thị ngày đầu và ngày cuối đã được định dạng
const formattedStartDate = computed(() => formatDate(startDate.value))
const formattedEndDate = computed(() => formatDate(endDate.value))

// Tính toán danh sách thành phố dựa trên các tỉnh đã chọn
const cities = computed(() => {
  let selectedCities = []
  province.value.forEach((province) => {
    if (cityData[province]) {
      selectedCities = selectedCities.concat(cityData[province])
    }
  })
  return selectedCities
})

// Tính toán danh sách trang trại dựa trên thành phố đã chọn
const thirdCities = computed(() => {
  let selectedFarms = []
  secondCity.value.forEach((city) => {
    if (farmData[city]) {
      selectedFarms = selectedFarms.concat(farmData[city])
    }
  })
  return selectedFarms
})

// Theo dõi sự thay đổi của province và đặt lại secondCity và thirdCity khi thay đổi
watch(province, () => {
  secondCity.value = []
  thirdCity.value = []
})

// Theo dõi sự thay đổi của secondCity và đặt lại thirdCity khi thay đổi
watch(secondCity, () => {
  thirdCity.value = []
})

const filter = (province, secondCity, thirdCity) => {
  // Kiểm tra nếu province có chứa 'MB', 'MT' hoặc 'MN'
  if (province.includes('MB') || province.includes('MT') || province.includes('MN')) {
    // Kiểm tra xem secondCity và thirdCity có rỗng không
    if (secondCity.length === 0 && thirdCity.length === 0) {
      let farmsInRegion = []

      // Tạo danh sách trang trại theo khu vực
      if (province.includes('MB')) {
        farmsInRegion = [...farmData.HaNoi, ...farmData.ThaiNguyen, ...farmData.ThaiBinh]
      }
      if (province.includes('MT')) {
        farmsInRegion = [...farmData.ThanhHoa, ...farmData.NgheAn, ...farmData.QuangNam]
      }
      if (province.includes('MN')) {
        farmsInRegion = [...farmData.BinhDuong, ...farmData.CanTho]
      }

      // Lấy các giá trị của thirdCity (value) từ các trang trại thuộc khu vực đã chọn
      store.setRoleFarmId(farmsInRegion.map((farm) => farm.value))
      //console.log(`Giá trị của a (${province}):`, a);  // In ra giá trị của a
      storeDatePicker.setStartDate(formattedStartDate)
      storeDatePicker.setEndDate(formattedEndDate)

      localStorage.setItem(
        'roleFarmId',
        farmsInRegion.map((farm) => farm.value),
      )
      localStorage.setItem('startDate', formattedStartDate)
      localStorage.setItem('endDate', formattedEndDate)
    } else if (secondCity.length > 0 && thirdCity.length === 0) {
      // Khi đã chọn thành phố nhưng chưa chọn trang trại
      let selectedFarms = []

      // Duyệt qua các thành phố đã chọn và lấy trang trại tương ứng
      secondCity.forEach((city) => {
        if (farmData[city]) {
          selectedFarms = selectedFarms.concat(farmData[city])
        }
      })

      // Gán các giá trị của trang trại vào biến b
      store.setRoleFarmId(selectedFarms.map((farm) => farm.value))
      //console.log(`Giá trị của b (${province}):`, b);  // In ra giá trị của b
      storeDatePicker.setStartDate(formattedStartDate)
      storeDatePicker.setEndDate(formattedEndDate)

      localStorage.setItem(
        'roleFarmId',
        selectedFarms.map((farm) => farm.value),
      )
      localStorage.setItem('startDate', formattedStartDate)
      localStorage.setItem('endDate', formattedEndDate)
    }
  }
}

// Computed property to disable the button if no date is selected
const isButtonDisabled = computed(() => {
  if (province.value.length === 0) return true
  return false // Disable button if either start or end date is missing
})

const isButtonDisabledFarm = computed(() => {
  if (thirdCity.value.length === 0) return true
  return false // Disable button if either start or end date is missing
})

onMounted(() => {
  axios
    .get(`https://farmapidev.tnt-tech.vn/api/Farmhouse/GetFarmhouseList?UsersID=${localStorage.getItem('userID')}`)
    .then((response) => {
      store.setRoleFarmId(response.data)
      localStorage.setItem('roleFarmId', JSON.stringify(response.data))
    })
})
</script>