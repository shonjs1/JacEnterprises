const ContactPage = () => {
    return (
            <div className='homepage'>
                <img className="bg" src="/src/images/background.png" />
                <div className="container-fluid text-center">

                    <div className="row">
                        <div className="col">
                            <h2 className="font-style margin-bottom-2 margin-top-1">Welcome to Jac Enterprises</h2>
                            <h3 className="font-style margin-bottom-2 margin-top-1">We are an organization that specializes in offering niche adventures dedicated to learning about Earth's various ecosystems and unique terrains. Our motto is, "Vincit Qui Se Vincit" which means, "He/she conquers who conquers him/herself.".</h3>
                        </div>
                    </div>

                    <form>

                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label font-style font-big">Send Us a Message</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your email <name@example.com>" />
                                <div id="emailHelp" className="form-text font-style font-small">Our Address: 2645 N High Street Columbus, OH 43202 <br/>
                                Our Phone Number: (1) 844 932 2626</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-md-center">
                        <div className="col-lg-auto">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label font-style font-big">Say Hi Here !</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={4}></textarea>
                            </div>
                        </div>
                    </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        
    )
};

export default ContactPage;
