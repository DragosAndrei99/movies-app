import React from "react";


export class Counter extends React.Component<{value: number}> {
  state: {value : number}

  constructor(props: any) {
    super(props);
    this.state = { value : props.value || 0}
  }
  increment = () => {
    this.setState(() => ({
      value: this.state.value + 1,
    }));
  }

  decrement = () => {
    this.setState(() => ({
      value: this.state.value - 1,
    }));
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement('h1', null, this.state.value),
      
      React.createElement(
        'button',
        { onClick: this.decrement },
        'Decrement'
      ),
      
      React.createElement(
        'button',
        { onClick: this.increment },
        'Increment'
      )
    );
  }
}