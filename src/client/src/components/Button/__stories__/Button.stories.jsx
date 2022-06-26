import React from 'react';

import  Button  from '../Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    },
    background_color: {
      control: 'radio',
      options: ['primary', 'green', 'blue', 'red']
    },
    icon: {
      control: 'radio',
      options: ['check', 'pencil', 'trash', 'plus']
    }
  },
};

const Template = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  size: 'large',
  background_color: 'primary',
  label: 'Button',
};

export const Green = Template.bind({});
Green.args = {
  size: 'large',
  background_color: 'green',
  label: 'Button',
};

export const Blue = Template.bind({});
Blue.args = {
  size: 'large',
  background_color: 'blue',
  label: 'Button',
};

export const Red = Template.bind({});
Red.args = {
  size: 'large',  
  label: 'Button',
  background_color: 'red',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

export const Check = Template.bind({});
Check.args = {
  size: 'small',
  icon: 'check',
  background_color: 'green'
};

export const Trash = Template.bind({});
Trash.args = {
  size: 'small',
  icon: 'trash',
  background_color: 'red'
};

export const Pencil = Template.bind({});
Pencil.args = {
  size: 'small',
  icon: 'pencil',
  background_color: 'blue'
};

export const Pluse = Template.bind({});
Pluse.args = {
  size: 'small',
  icon: 'plus',
  background_color: 'green'
};


export const Disabled = Template.bind({});
Disabled.args = {
  size: 'large',
  label: 'button',
  background_color: 'primary',
  disabled: true
};