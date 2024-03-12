import Trivia from "./Trivia";
import { useState } from 'react';
import Tabs from './Tabs';
import TriviaAdd from "./TriviaAdd";

export default function TriviaTabs() {
    const tabData = [
        { label: "Play the Game" },
        { label: "Add a Question" },
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
                    <h1>Trivia!</h1>
                    <Trivia />

                </>
            )}

            {activeTab === 1 && (
                <>

                    <h1>Add!</h1>

                    <TriviaAdd />
                </>
            )}

            

        </>

    );
}