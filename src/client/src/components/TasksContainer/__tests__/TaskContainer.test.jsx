import renderer from 'react-test-renderer';
import TaskContainer from '../TaskContainer';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import ItemsActions from '../../../actions/ItemsActions';
import TaskContainerConnector from '../TaskContainerConnector';

it('Render snapshot of TaskContainer', () => {
    const tree = renderer.create(<TaskContainer></TaskContainer>).toJSON();
    expect(tree).toMatchSnapshot();
});

const items = [
    {
        id: 56,
        ItemName: "Take dog out for a walk",
        status: false,
    },
    {
        id: 32,
        ItemName: "Do the dishes",
        status: true,
    },
];

describe("ListContainer", () => {
    test("should render both items (one done and one not)", () => {
        const { asFragment } = render(
            <Provider store={store}>
                <TaskContainer itemsEntities={items} />
            </Provider>
        );
        itemsCheckedTestCase(asFragment);
    });
});

describe("ListContainer with mock GetTodos", () => {
    const mock_get_todos = jest.fn(() => items);
    const mock_get_todos_action = jest.spyOn(ItemsActions, 'GetTodos').mockImplementation(mock_get_todos);
    test("should render both items (one done and one not) with mock get tasks", () => {
        ItemsActions.GetTodos();
        expect(mock_get_todos_action).toBeCalled();
    });
});

function itemsCheckedTestCase(asFragment) {
    expect(screen.getByText("Take dog out for a walk")).toBeInTheDocument();
    expect(screen.getByText("Do the dishes")).toBeInTheDocument();
    const checkbox_checked = asFragment().querySelector('input[type="checkbox"][id="32"]');
    expect(checkbox_checked.checked).toEqual(true);
    const checkbox_unchecked = asFragment().querySelector('input[type="checkbox"][id="56"]');
    expect(checkbox_unchecked.checked).toEqual(false);
}