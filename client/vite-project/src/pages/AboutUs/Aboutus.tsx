import React from 'react';

const AboutUsPage = () => {
    return (
        <div className='homepage'>
            <img className="bg" src="/src/images/background.png" />
            <div className="container-fluid text-center">

                <div className="row">
                    <div className="col">
                        about
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4 col-border">
                        
                        <img className="profilepic" src="/" alt="AliMar" width="40%" />
                        <h4>Alicia Tejada</h4>
                    </div>
                    <div className="col-sm-8 col-border">
                        <h5>An Mom Artist</h5>
                        <p>
                        I'm Alicia Tejada, an artist and mother. My passion for painting, especially portraits, has been a colorful journey of self-expression. I also create vibrant textile art. Inspired by my children, I explore new techniques and push creative boundaries. Explore my artwork here and let's connect for endless inspiration.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4 col-border">
                        <img className="profilepic" src="/src/images/DCamron.jpg" alt="D'Camron" width="60%" />
                        <h4>D'Camron Dunlap</h4>
                    </div>
                    <div className="col-sm-8 col-border">
                        <h5>Aspiring Software Developer</h5>
                        <p>
                            I am a aspiring Software Developer, who has taken his first step forward, by enrolling in the We Can Code It IT bootcamp, As well as participating in the Amazon Technical Academy Java training program.

                            I enjoy all things tech, because it's one of the few things left in the world, where not only the possibilities, but the learning potential is infinite.

                            A dream is to one day have the opportunity to push something to it's limits to see what humanity is capable of in the realm of technology.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutUsPage;