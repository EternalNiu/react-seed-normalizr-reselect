import {connect} from 'react-redux';

import Component from './component';
import {listSelector} from './reselect';
import {
  async,
  sync,
} from './actions';
const {
  fetchData,
  fetchSomeAsync,
} = async;

const {
  onChange,
} = sync;

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.list.count,
    list: listSelector(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSomeAsyncRequest: () => {
      dispatch(fetchSomeAsync());
    },
    fetchDataRequest: () => {
      dispatch(fetchData());
    },
    onChange: (param) => {
      dispatch(onChange(param));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
/**
 * Connected react component
 */
export default class Container extends Component {

}
