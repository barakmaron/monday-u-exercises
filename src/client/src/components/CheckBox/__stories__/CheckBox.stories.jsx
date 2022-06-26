import React from 'react';

import  CheckBox  from '../CheckBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CheckBox',
  component: CheckBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
   
  },
};

const Template = (args) => <CheckBox {...args} />;
export const TrueState = Template.bind({});
TrueState.args = {
  id: 0,
  state: true
};

export const FalseState = Template.bind({});
FalseState.args = {
  id: 0,
  state: false
};
