import React, { useState } from "react";



export default function ForumHome() {
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        setThread("");
    };

    return (
        <>
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>

                <div className="threadPost card border-dark mb-3" style={{maxWidth: 20 + 'rem'}}>
                    <div className="card-body">
                        <form className='homeForm' onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label htmlFor='thread' class="form-label mt-4">Title / Description</label>
                                <textarea 
                                    class="form-control" 
                                    id="exampleTextarea" 
                                    rows="2"
                                    type='text'
                                    name='thread'
                                    required
                                    value={thread}
                                    onChange={(e) => setThread(e.target.value)}
                                ></textarea>
                            </div>
                                
                            <button type="submit" className="btn btn-primary">CREATE THREAD</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )


}