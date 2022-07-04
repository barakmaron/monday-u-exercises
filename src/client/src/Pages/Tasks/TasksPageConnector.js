import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddAction, ClearAllAction, SortByNameAction } from '../../actions/ItemsActions';
import TasksPage from './TasksPage';

const mapStateToProps = (state, ownProps) => {
    return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ AddAction, ClearAllAction, SortByNameAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);