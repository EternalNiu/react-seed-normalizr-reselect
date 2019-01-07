import React from 'react';
import {
  object,
  number,
  func,
} from 'prop-types';
import {withStyles} from 'material-ui';
import {Link} from 'react-router-dom';
import {hot} from 'react-hot-loader';

const styles = (theme) => ({
  root: {
    color: 'orange',
  },
});

@hot(module)
@withStyles(styles)
/**
 * List page
 */
export default class List extends React.Component {
  static propTypes = {
    classes: object,
    count: number,
    list: object,
    fetchSomeAsyncRequest: func,
    fetchDataRequest: func,
    onChange: func,
  };

/**
 * [componentDidMount description]
 */
  componentDidMount() {
    this.props.fetchDataRequest();
  }
  /**
   * Call saga function to increment count by 1
   */
  onClick() {
    this.props.fetchSomeAsyncRequest();
  }

  numHandleChange = (listId) => (event) => {
    const {onChange} = this.props;
    onChange({
      id: listId,
      value: event.target.value,
    });
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {
      classes,
      count,
      list,
    } = this.props;

    return (
      <div>
        <div className={classes.root}>JSS demo</div>
        <ul>
          <li><Link to="/detail">Redirect and lazy load detail page</Link></li>
        </ul>
        <div onClick={this.onClick.bind(this)}>
          Click me, to mock async callback:
          {count}
        </div>
        <div>
          {
            list.list && list.list.map((user, index) => (
              <p key={index}>{user.name}:<input value={user.age} type='number'onChange={this.numHandleChange(user.id)}/></p>
          ))
          }
        </div>
      </div>
    );
  }
}
