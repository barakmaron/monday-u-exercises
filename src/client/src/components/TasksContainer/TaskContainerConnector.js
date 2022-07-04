import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getItems } from '../../selectors/items-entities-selectors';
import { GetTasksAction } from '../../actions/ItemsActions';
import TaskContainer from './TaskContainer';

const mapStateToProps = (state, ownProps) => {
    const itemsEntities = getItems(state);
    return { itemsEntities };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ GetTasksAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);