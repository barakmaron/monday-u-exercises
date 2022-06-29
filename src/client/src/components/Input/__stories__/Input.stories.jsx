import React from 'react';

import  Input  from '../Input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'fit_available']
    }
  },
};

const Template = (args) => <Input {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Input',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: 'Input',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Input',
};

export const Fit = Template.bind({});
Fit.args = {
  size: 'fit_available',
  label: 'Input',
};
