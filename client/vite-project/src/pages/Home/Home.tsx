
const HomePage = () => {
    return (
        <div className='homepage'>
            <img className="bg" src="/src/images/background.png" />
            <div className="container-lg text-center">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <h1>Mystery Educator</h1>
                        <button 
                            className="custom-cursor-button"
                            onMouseEnter={() => {
                                document.body.style.cursor = 'pointer'; // Change cursor on hover. (not working)
                            }}
                            onMouseLeave={() => {
                                document.body.style.cursor = 'auto'; // Reset cursor when leaving. (not working)
                            }}
                        >
                            <img className="spaceship" src="/src/images/spaceship.png" alt="spaceship" width="30%" />
                        </button>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-12 col-border"><h3>IMAGE</h3></div>
                </div>
                <div className="row">
                    <div className="col-6 col-border"><h3>DESCRIPTION</h3></div>
                    <div className="col-6 col-border"><h3>FACT</h3></div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;