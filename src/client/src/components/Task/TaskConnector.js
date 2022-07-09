import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetCompleteAction, SetDeleteAction, EditAction } from '../../actions/ItemsActions';
import { getSearch, getHideDone } from '../../selectors/items-view-selectors';
import Task from './Task';

const mapStateToProps = (state, ownProps) => {
    const search = getSearch(state);
    const hide_done = getHideDone(state);
    return {...ownProps, search, hide_done};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ SetCompleteAction, SetDeleteAction, EditAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);