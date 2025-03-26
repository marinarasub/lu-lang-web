import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

const DocsPage: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={false}
                    items={items}
                    style={{ height: '100vh' }}
                />
            </div>
            <div style={{ padding: "20px", textAlign: "center", flex: 1 }}>
                <h1>Documentation</h1>
                <p>Welcome to the documentation page. Here you will find all the information you need to get started.</p>
                {/* Add more documentation content here */}
            </div>
        </div>
    );
};

export default DocsPage;