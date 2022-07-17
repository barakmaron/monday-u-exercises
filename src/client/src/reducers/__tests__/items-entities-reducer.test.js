import itemsEntitiesReducer from "../items-entities-reducer";
import actionsTypes from '../../actions/constants/index';

test('Should return initial state', () => {
    expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({
        tasks: [],
        deleted: {}
    });
});

test('Should add item', () => {
    const previous_state = {
        tasks: [],
        deleted: {}
    };
    expect(itemsEntitiesReducer(previous_state, {
        type: actionsTypes.ADD_TASK,
        payload: { id: 1, text: 'Add todo' }
    })).toEqual({
            tasks: [{ id: 1, text: 'Add todo', status: false }],
            deleted: {}
        })
});

test('Should delete item', () => {
    const previous_state = {
        tasks: [{ id: 1, text: 'Add todo' }],
        deleted: {}
    };
    expect(itemsEntitiesReducer(previous_state, {
        type: actionsTypes.DELETE_TASK,
        payload: { id: 1 }
    })).toEqual({
            tasks: [],
            deleted: {}
        });
});

test('Should set status true item', () => {
    const previous_state = {
        tasks: [{ id: 1, text: 'Add todo', status: false }],
        deleted: {}
    };
    expect(itemsEntitiesReducer(previous_state, {
        type: actionsTypes.DONE_TASK,
        payload: { id: 1 }
    })).toEqual({
            tasks: [{ id: 1, text: 'Add todo', status: true }],
            deleted: {}
        });
});