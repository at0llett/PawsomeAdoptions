import { useState } from 'react';
import Tabs from './Tabs';
import Adopt from './Adopt';
import Favorites from './Favorites';
//import Quotes from './Quotes';

export default function AdoptionTabs() {

    const tabData = [
        { label: "Search" },
        { label: "Favorites" },
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
                    <h1>Search!</h1>
                    <Adopt />
                </>
            )}

            {activeTab === 1 && (
                <>

                    <h1>These are your Favorites!</h1>

                    <Favorites />
                </>
            )}

            {/* <Quotes /> */}

        </>

    );
}