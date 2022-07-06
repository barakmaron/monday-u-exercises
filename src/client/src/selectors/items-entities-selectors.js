const getItemsEntities = state => state.itemsEntities;

export const getItems = state => getItemsEntities(state).tasks; 
export const getLastDeleted = state => getItemsEntities(state).deleted;