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
} from "element-plus";

const components = [
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
];

function useElementUi(app) {
  components.map((component) => {
    app.use(component);
  });
}

export default useElementUi;
