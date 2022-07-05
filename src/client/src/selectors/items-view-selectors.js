const getItemsView = state => state.itemsView;

export const getSuccessful = state => getItemsView(state).successful;
export const getFailed = state => getItemsView(state).failed;
export const getLoading = state => getItemsView(state).is_loading;