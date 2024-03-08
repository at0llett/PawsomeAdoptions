import React from 'react';

function Tabs({ tabs, activeTab, onTabChange }) {
    return (

        <ul className="nav nav-tabs justify-content-center">
            {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>
                    <button
                        className={`nav-link ${activeTab === index ? 'active' : ''}`}
                        onClick={() => onTabChange(index)}
                        style={{ fontSize: '30px' }}
                    >
                        {tab.label}
                    </button>
                </li>
            ))}
        </ul>

        // <div className="tabs">
        //     {tabs.map((tab, index) => (
        //         <button
        //             // className="btn btn-secondary"
        //             key={index}
        //             className={index === activeTab ? 'active' : ''}
        //             onClick={() => onTabChange(index)}
        //         >
        //             {tab.label}
        //         </button>
        //     ))}
        // </div>
    );
}

export default Tabs;