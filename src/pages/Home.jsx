import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../services/Firebase'
import * as MISC from '../constants/miscConsts'

const Home = () => (
  <React.Fragment>
    <Header></Header>
    <section>
      <div className="pt-20">
        <div className="container mx-auto text-center py-5 bg-indigo-50">
          <h1 className="text-4xl">Welcome to {MISC.APP_NAME}</h1>
          <p className="text-2xl">Meet me here!</p>
          <FirebaseContext.Consumer>
            {
              firebase => {
                firebase.auth.currentUser ?
                  <p>Currently connected as {firebase.auth.currentUser.email}</p> :
                  <div className="mt-4">
                    <Link className="btn btn-primary px-5 mr-3 hover:underline" to="/signup">Create New Account</Link>
                    <Link className="btn px-5 hover:underline" to="/login">Login to Your Account</Link>
                  </div>
              }
            }
          </FirebaseContext.Consumer>

        </div>
      </div>
    </section>
    <Footer></Footer>
  </React.Fragment>
)


export default Home;