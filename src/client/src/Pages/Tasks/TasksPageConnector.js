import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions from '../../actions/ItemsActions';
import { FailedAction, SearchAction, HideDoneAction } from '../../actions/ViewActions';
import { getItems, getLastDeleted } from '../../selectors/items-entities-selectors';
import { getSuccessful, getFailed, getLoading } from '../../selectors/items-view-selectors';
import TasksPage from './TasksPage';

const mapStateToProps = (state, ownProps) => {
    const tasks = getItems(state);
    const successful = getSuccessful(state);
    const failed = getFailed(state);
    const is_loading = getLoading(state);
    const deleted = getLastDeleted(state);
    return { ...ownProps, tasks, successful, failed, is_loading, deleted };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const AddAction = ItemsActions.AddAction;
    const ClearAllAction = ItemsActions.ClearAllAction;
    const SortByNameAction = ItemsActions.SortByNameAction;    
    return bindActionCreators({ AddAction, ClearAllAction, SortByNameAction, FailedAction, SearchAction, HideDoneAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);