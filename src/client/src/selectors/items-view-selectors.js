const getItemsView = state => state.itemsView;

export const getSuccessful = state => getItemsView(state).successful;
export const getFailed = state => getItemsView(state).failed;
export const getLoading = state => getItemsView(state).is_loading;
export const getSearch = state => getItemsView(state).search;
export const getHideDone = state => getItemsView(state).hide_done;