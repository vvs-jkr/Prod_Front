import React from 'react';
import { Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

export const RouterDecorator = (Story: Story) => (
    <MemoryRouter>
        <Story />
    </MemoryRouter>
);
