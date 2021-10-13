import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class DropdownInput extends Component {
  state = { searchQuery: '' }

  handleChange = (e, { searchQuery, value }) =>{
    this.setState({ searchQuery, value })
  }
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })
  render() {
    const { searchQuery, value } = this.state

    return (
      <Form.Dropdown
      label={this.props.label}
      name = {this.props.name}
        fluid
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={this.props.stateOptions}
        placeholder={this.props.placeholder}
        search
        searchQuery={searchQuery}
        value={value}
      />
    )
  }
}
export default DropdownInput;