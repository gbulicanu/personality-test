import { useNavigate } from "react-router-dom";

import { Trait } from "../models";

function Finish() {
    const navigate = useNavigate();
    const trait = JSON.parse(localStorage.getItem('personality-trait') ?? '{}') as Trait;

    const retakeTest  = () => {
        localStorage.removeItem('personality-trait');
        navigate('/');
    };

    return (
        <div className="Finish container">
            <p className='italic'>Your Result</p>
            <h3>
                {trait.summary}
            </h3>
            <p>{trait.description}</p>
            <div className="d-flex gap-2">
                <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    onClick={retakeTest}
                    data-testid='retake-button'>
                    Retake test
                </button>
            </div>
        </div>
    );
}

export default Finish;