import { randomPatterns } from '../../helper'


const NotebookCard = ({ name, notesCount, pattern}) => {
    console.log(pattern)
    return (
        <div className="card notebook-card shadow mb-4" style={{ backgroundImage: `url(${randomPatterns[pattern]})` }}>
            <div className="notebook-cover">
                <div className="notebook-nameslip p-2">
                    <h4> {name} </h4>
                    <h6>{notesCount} Notes</h6>
                </div>
                <div className="notebook-bookmark">
                    ...
                </div>
            </div>
        </div>
    )
}

export default NotebookCard
