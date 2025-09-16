import React from 'react';
import './Cards.css';
import crm from '../assets/crm.png';
import finance from '../assets/finance.png';
import task from '../assets/task.png';
import emp from '../assets/emp.png';
import { Link } from 'react-router-dom';

const Cards = () => {
  const applications = [
    {
      name: 'Finance Tracker',
      image: finance,
      tag: 'Track your finances effortlessly',
      detail: 'Manage income, expenses, and budgets all in one place with real-time insights and reports.',
      link: 'https://nest-finance-dun.vercel.app'
    },
    {
      name: 'CRM',
      image: crm,
      tag: 'Strengthen client relationships',
      detail: 'Keep track of leads, conversations, and customer data to boost engagement and grow your business.',
      link: 'https://nest-crm-henna.vercel.app'
    },
    {
      name: 'Task Manager',
      image: task,
      tag: 'Get things done—together',
      detail: 'Create, assign, and monitor tasks in a collaborative workspace designed for productivity.',
      link:'https://nest-pma.vercel.app'
    },
    {
      name: 'Employee Management',
      image: emp,
      tag: 'Organize your workforce',
      detail: 'Add, manage, and structure employees with reporting hierarchies and role-based access.',
      link: '/home/employeemanagement'
    }
  ];

  return (
    <div className='cards'>
      {applications.map((app, index) => (
        <div className='card' key={index}>
          <div
            className='card-bg'
            style={{
              backgroundImage: `url(${app.image})`,
              backgroundSize: '60%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className='card-content'>
            <h2 className='view-on'>{app.name}</h2>

            <h2 className='hover-on go-to-link'>
              <i className="fa-solid fa-right-from-bracket"></i>
              {/* <Link to="/home/employeemanagement">Employee Management</Link> */}
              {app.link ? (
                app.link.startsWith('http') ? (
                  <a href={app.link} target="_blank" rel="noopener noreferrer">{app.name}</a>
                ) : (
                  <Link to={app.link}>{app.name}</Link>
                )
              ) : (
                <span>{app.name}</span>
              )}
            </h2>

            <p className='hover-on'>{app.detail}</p>
            <p className='view-on'>{app.tag}</p>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
