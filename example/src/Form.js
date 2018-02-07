import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleClick() {
    this.props.onClick(this.state.value);
    this.setState({value: ''});
  }
  render() {
    return (
      <div>
        <input type='text' placeholder='name' onChange={this.handleChange} value={this.state.value}/>
        <button onClick={this.handleClick}>Add</button>
      </div>
    )
  }
}

export default Form;