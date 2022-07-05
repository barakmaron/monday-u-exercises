import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddAction, ClearAllAction, SortByNameAction } from '../../actions/ItemsActions';
import { getSuccessful, getFailed, getLoading } from '../../selectors/items-view-selectors';
import TasksPage from './TasksPage';

const mapStateToProps = (state, ownProps) => {
    const successful = getSuccessful(state);
    const failed = getFailed(state);
    const is_loading = getLoading(state);
    return {...ownProps, successful, failed, is_loading};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ AddAction, ClearAllAction, SortByNameAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);