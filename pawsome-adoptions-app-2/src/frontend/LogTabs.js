import { useState } from 'react';
import Tabs from './Tabs';
import Adopt from './Adopt';
import Favorites from './Favorites';
import Login from './Login';
import ToDo from './ToDo/ToDo';

//import Quotes from './Quotes';

export default function LogTabs() {

    const tabData = [
        { label: "Log In" },
        { label: "Register" },
        { label: "To Do" },
    ];


    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (

        <>
            <Tabs tabs={tabData} activeTab={activeTab} onTabChange={handleTabChange} />

            {activeTab === 0 && (
                <>
                
                    <Login />
                    
                </>
            )}

            {activeTab === 1 && (
                <>

                    <h1>Register!</h1>


                </>
            )}

            {activeTab === 2 && (
                <>

                    <ToDo />

                </>
            )}

        </>

    );
}