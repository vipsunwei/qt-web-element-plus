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
];

function useElementUi(app) {
  components.map((component) => {
    app.use(component);
  });
}

export default useElementUi;
