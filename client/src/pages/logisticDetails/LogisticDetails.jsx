import React from 'react';

import './LogisticDetails.scss'
import { AiOutlineSearch } from 'react-icons/ai';

export const LogisticDetails = () => {
  return (
    <div className='hero'>
      <div className='container'>
        <div className='content'>
          <p className='subtitle'>Chart Your Organization</p>
          <h1 className='title'>
    Build & Manage <span>Team Structures</span> with{' '}
    <span>Drag-and-Drop</span> Ease
</h1>
<p className='description'>
    Create, visualize, and update your organization chart effortlessly. Empower your team with a clear and dynamic hierarchy.
</p>

          <button className='get-started-btn'>
            Get Started
          </button>
        </div>

        <div className='image'>
          <img src="/img/team.png" alt="Hero" />
        </div>
      </div>
    </div>
  );
};

