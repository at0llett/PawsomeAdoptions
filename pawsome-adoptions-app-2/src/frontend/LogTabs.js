import { useState } from 'react';
import Tabs from './Tabs';
import Adopt from './Adopt';
import Favorites from './Favorites';
import RegistrationForm from './RegistrationForm';
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
                    <h1>Log In!</h1>

                </>
            )}

            {activeTab === 1 && (
                <>

                    <RegistrationForm/>


                </>
            )}

            {activeTab === 2 && (
                <>

                    <h1>To Do!</h1>


                </>
            )}

        </>

    );
}