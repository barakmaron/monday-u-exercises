import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getItems } from '../../selectors/items-entities-selectors';
import TaskContainer from './TaskContainer';

const mapStateToProps = (state, ownProps) => {
    const itemsEntities = getItems(state);
    return { itemsEntities };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);