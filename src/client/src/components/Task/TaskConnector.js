import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SetCompleteAction, SetDeleteAction, EditAction } from '../../actions/ItemsActions';
import Task from './Task';

const mapStateToProps = (state, ownProps) => {
    return {...ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ SetCompleteAction, SetDeleteAction, EditAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);