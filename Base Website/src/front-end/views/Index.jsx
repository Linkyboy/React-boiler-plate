import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Reboot from 'material-ui/Reboot';

class Index extends Component {
    constructor(props) {
		super(props);
	}
  render() {


    return (
        <Button raised color="primary">
         Hello World
       </Button>
    )
  }
}
module.exports = Index;
