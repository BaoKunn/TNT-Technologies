<template>
  <a-space>
    <label for="date-picker">Thời gian:</label>
    <a-range-picker
      v-model:value="date"
    ></a-range-picker>
    <AButton class="bg-blue-500 text-white" @click="search">Tìm kiếm</AButton>

    <!-- Hiển thị ngày đầu tiên và ngày cuối cùng đã định dạng -->
    <!-- <p>Ngày đầu tiên: {{ formattedStartDate }}</p>
    <p>Ngày cuối cùng: {{ formattedEndDate }}</p> -->
  </a-space>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import dayjs from 'dayjs'; // Import dayjs
import { useDatePickerStore } from '../../stores/datePicker';

export default defineComponent({
  setup() {
    const date = ref([null, null]); // Lưu trữ mảng ngày chọn (Ngày đầu và ngày cuối)
    const startDate = ref(null); // Ngày đầu tiên
    const endDate = ref(null); // Ngày cuối cùng
    
    const store = useDatePickerStore();

    // Theo dõi sự thay đổi của `date` và tách ngày đầu tiên, ngày cuối cùng
    watch(date, (newDate) => {
      if (newDate && newDate.length === 2) {
        startDate.value = newDate[0]; // Ngày đầu tiên
        endDate.value = newDate[1]; // Ngày cuối cùng

        // Cập nhật store nếu cần
        store.setStartDate(formattedStartDate);
        store.setEndDate(formattedEndDate);
      }
    });

    // Hàm tìm kiếm (hoặc các thao tác khác)
    const search = () => {
      console.log("Ngày đầu:", startDate.value);
      console.log("Ngày cuối:", endDate.value);
    };

    // Hàm định dạng ngày theo dd/mm/yyyy bằng dayjs
    const formatDate = (date) => {
      if (!date) return ''; // Nếu date là null, trả về chuỗi rỗng

      return dayjs(date).format('MM/DD/YYYY'); // Định dạng ngày theo dd/mm/yyyy
    };

    // Computed properties để hiển thị ngày đầu và ngày cuối đã được định dạng
    const formattedStartDate = computed(() => formatDate(startDate.value));
    const formattedEndDate = computed(() => formatDate(endDate.value));

    return {
      date, // Trả về date để sử dụng trong template
      formattedStartDate,
      formattedEndDate,
      search,
    };
  },
});
</script>
