import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
  ElPagination,
  ElLoading,
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElBadge,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} from "element-plus";

const components = [
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElTable,
  ElTableColumn,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
  ElPagination,
  ElLoading,
  ElRow,
  ElCol,
  ElCard,
  ElButton,
  ElBadge,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
];

function useElementUi(app) {
  components.map((component) => {
    app.use(component);
  });
}

export default useElementUi;
