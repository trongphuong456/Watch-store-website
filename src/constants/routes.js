export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  USER: {
    HOME: "/",
    BRAND: "/thuong-hieu",
    MEN_DETAIL: "/nam",
    WOMEN_DETAIL: "/nu",
    CONTACT: "/lien-he",
    PRODUCT_DETAIL: "/san-pham/:id",
    CHECKOUT: "/gio-hang",
  },

  ADMIN: {
    DASH_BOARD: "/admin/dashboard",
    USER_LIST_PAGE: "/admin/users",
    PRODUCT_LIST_PAGE: "/admin/products",
    CREATE_PRODUCT_PAGE: "/admin/products/create",
    UPDATE_PRODUCT_PAGE: "/admin/products/update/:id",
  },
};
